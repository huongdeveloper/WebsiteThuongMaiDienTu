import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableProductRedux.scss'
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions";
import 'react-markdown-editor-lite/lib/index.css';
import LoadingOverlay from 'react-loading-overlay';

class TableProductRedux extends Component {
    constructor(props) {
        super(props);
        this.state ={
            productRedux: [],
            currentPage: 1,     // Trang hiện tại
            pageSize: 10,      // Kích thước trang
            totalItems: 0,     // Tổng số sản phẩm
            isShowloading: true
        }
    }

    componentDidMount() {
        this.props.fetchAllProductRedux(this.state.currentPage, this.state.pageSize)
            .then(() => {
                this.setState({
                    isShowloading: false // Ẩn LoadingOverlay sau khi sản phẩm đã được tải
                });
            });
    }

    // =========== Viết Redex cho Hiện lên dữ liệu ==========
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listProduct !== this.props.listProduct) {
            this.setState({
                productRedux: this.props.listProduct
            })
        }
    }

    // ================= Delete Xóa data Redex =======
    handleDeleteProduct = (product) => {
        this.props.deleteProductRedux(product.id)

    }

    // ================= Edit Sửa data Redex =========
    handleEditProduct = (product) => {
        if(this.props.history) {
        this.props.history.push(`/system/Edit-product/${product.id}`)
        }
    }

    // ==== ấn vào logo trở về trang chủ ======
    returnToProduct = () => {
        if(this.props.history) {
            this.props.history.push(`/system/manage-product`)
        }
    }

    // ========= phân trang =============
    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage, isShowloading: true }, () => {
            this.fetchProductData();
        });
    }

    fetchProductData = () => {
        this.props.fetchAllProductRedux(this.state.currentPage, this.state.pageSize)
            .then(() => {
                this.setState({
                    isShowloading: false // Ẩn LoadingOverlay sau khi sản phẩm đã được tải
                });
            });
    }

    render() {
        let { currentPage, pageSize, totalItems } = this.state;
        let totalPages = Math.ceil(totalItems / pageSize);
        let arrProduct = this.state.productRedux;
        // console.log('123', totalPages)
        return (
            <React.Fragment>
                <LoadingOverlay
            active={this.state.isShowloading}
            spinner
            text='Loading...'
            >
                <div className='user-redux-container'>
                <div className='title'> Quản lý danh sách product sản phẩm
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <button className='btn btn-primary' onClick={() => this.returnToProduct()} >Tạo sản phẩm</button>
                        <table id="TableProductRedux">
                   <tbody>
                    <tr>
                         <th>STT</th>
                         <th>Danh mục</th>
                         <th>Tên sản phẩm</th>
                         <th>Giảm Giá</th>
                         <th>Đã bán</th>
                         <th>Số lượng</th>
                         <th>Host</th>
                         <th>Ảnh </th>
                         <th>Actions</th>
                    </tr>
                    {arrProduct && arrProduct.length > 0 && arrProduct.map((item, ixdex) => {
                        
                        return (
                            <tr key={ixdex}>
                                <td>{ixdex + 1}</td>
                                <td>{item.portfolio.name}</td>
                                <td>{item.name}</td>
                                <td>{item.discount}</td>
                                <td>{item.selled}</td>
                                <td>{item.inventory}</td>
                                <td>{item.hostData.valueVi}</td>
                                <td className='img-menu_cartegory'><div className='Menu_img-cartegory' style={{backgroundImage: `url(${item.image})`}} ></div></td>
                                <td>
                                    <button className='btn-edit' onClick={() => this.handleEditProduct(item)}><i className="fa-solid fa-pen"></i></button>
                                    <button className='btn-delete' onClick={() => this.handleDeleteProduct(item)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                        </tr>
                        )
                    })}
                        
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pagination">
                <button
                    className="page-button"
                    disabled={currentPage === 1}
                    onClick={() => this.handlePageChange(currentPage - 1)}
                >
                    Lùi
                </button>
                <span className="page-info">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    className="page-button"
                    disabled={arrProduct.length < pageSize}
                     onClick={() => {
                        if (arrProduct.length >= pageSize) {
                               this.handlePageChange(currentPage + 1);
                            }
                        }}
                >
                    Tiếp
                </button>
                   </div>
                </div>
                </div>
            </LoadingOverlay>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        listProduct: state.admin.allProduct,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProductRedux: (page, pageSize) => dispatch(actions.fetchAllProduct(page, pageSize)),
        deleteProductRedux: (id) => dispatch(actions.deleteProduct(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableProductRedux));
