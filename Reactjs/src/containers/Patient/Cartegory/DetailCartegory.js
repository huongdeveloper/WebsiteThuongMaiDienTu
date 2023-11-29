import React, { Component } from 'react';
import { connect } from "react-redux";
import { getCartegoryhomeById } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import MenuApp from '../../HomePage/Section/MenuApp';
import './DetailCartegory.scss';
import ReactPaginate from 'react-paginate';
import LoadingOverlay from 'react-loading-overlay';
import { toast } from "react-toastify";

class DetailCartegory extends Component {
    constructor(props) {
        super(props);
        this.state ={
            DetailCartegory: {},
            menuCartegoryId: -1,
            currentPage: 1, // Trang hiện tại
            pageSize: 15, // Kích thước trang
            totalItems: 0, // Tổng số sản phẩm
            isShowloading: true
        }
    }

    // ====== Hiện dữ liệu phân trang =========
    async loadCartegoryData() {
        this.setState({ isShowloading: true });
        const id = this.props.match.params.id;
        this.setState({
            menuCartegoryId: id,
        });

        const res = await getCartegoryhomeById(id, this.state.currentPage, this.state.pageSize);
        if (res && res.errCode === 0) {
            this.setState({
                DetailCartegory: res.data,
                totalItems: res.totalItems,
            });
        }
        this.setState({ isShowloading: false });
        // console.log('Danh sách ảnh: ', this.state);
    }

    async componentDidMount() {
        this.loadCartegoryData();
    }

    // ========== Update lại sản phẩm khi chuyển danh mục ==========
    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadCartegoryData();
        }
    }

     // ====== Chuyển sang trang chi tiết sản phẩm ==========
     handleViewDetailProduct = (ProductApp) => {
        if(this.props.history) {
         toast.success("Chuyển trang chi tiết thành công.");
         this.props.history.push(`/detail-Product/${ProductApp.id}`)
        }
    }
// ======== nút chuyển trang ========
    handlePageChange = ({ selected }) => {
        let newPage = selected + 1;
        this.setState({
            isShowloading: true,
            currentPage: newPage, // Cập nhật trang hiện tại
        }, () => {
        toast.success("Chuyển trang thành công.");
        this.loadCartegoryData(); // Gọi hàm tải dữ liệu cho trang mới
    });
    };


    render() {
        let { DetailCartegory, currentPage, pageSize, totalItems } = this.state;
        let totalPages = Math.ceil(totalItems / pageSize); // Tính toán totalPages
        console.log('Danh sách ảnh: ', totalPages);
        return (
            <div className='background_app-web '>
                 <LoadingOverlay
            active={this.state.isShowloading}
            spinner
            text='Loading...'
            >
            <HomeHeader/>
            <div className='Menu-top-car'></div>
            <MenuApp/>
            <div className='grid'>
             {/* <!-- =======  Sản phẩm 1 ========== --> */}
            <section className="cartegory-gallery-one">
                <div className="rowB">
                <div className="cartegory-gallery-one-content">
                    <div className="cartegory-gallery-one-content-title">
                    
                        <h1> DANH SÁCH SẢN PHẨM:</h1> 
                    </div>
                    {/* <!-- ===== nội dung sản phẩm ===== --> */}
                    <div className="home-cartegory">
                        <div className="grid__row">
                            {/* <!-- Sản phẩm  --> */ }
                            {DetailCartegory && DetailCartegory.length > 0 && DetailCartegory.map((item, index) => {
                                 let imgebase64 = '';
                                 if(item.image) {
                                    imgebase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                return (
                            <div className="grid__colum-2-4">
                                <div className="home-cartegory-item" key={index} onClick={() => this.handleViewDetailProduct(item)}>
                                    <div><div className="home-cartegory-item_img" style={{backgroundImage: `url(${imgebase64})`}}/></div>
                                    <h4 className="home-cartegory-item_name">{item.name}</h4>
                                    <div className="home-cartegory-item_price">
                                        {/* <span className="home-cartegory-item_price-old"> Giá: Shop sẽ tư vấn cho bạn</span> */}
                                        <span className="home-cartegory-item_price-current">Giá: Shop sẽ tư vấn cho bạn</span>
                                    </div>
                                    <div className="home-cartegory-item_origin">
                                        <span className="home-cartegory-item_brand">Shop Giang Tùng</span>
                                        <span className="home-cartegory-item_origin-name">Hà Nội</span>
                                    </div>
                                    <div className="home-cartegory-item_favourite">
                                        <i className="fa-solid fa-check"></i><span> Yêu thích</span>
                                    </div>
                                </div>
                            </div>
                                )
                            })}
                            
                             
                            
                        </div>
                    </div>
                </div>
                </div>
            </section>
            </div>
            <div className='grid'>
            <ReactPaginate
                    previousLabel={<i class="fa-solid fa-chevron-left"></i>}
                    nextLabel={<i class="fa-solid fa-chevron-right"></i>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageChange}
                    containerClassName={'paginationCart git'}
                    subContainerClassName={'pages paginationCart'}
                    activeClassName={'active'}
                    pageClassName={'page'}
                />
            </div>
            <HomeFooter/>
            </LoadingOverlay>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCartegory);
