import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Tabledescription.scss'
import * as actions from "../../../store/actions";

class Tabledescription extends Component {
    constructor(props) {
        super(props);
        this.state ={
            weightRedux: [],
        }
    }

    async componentDidMount() {
        this.props.fetchAllWeightRedux();
    }

    // =========== Viết Redex cho Hiện lên dữ liệu ==========
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listWeight !== this.props.listWeight) {
            this.setState({
                weightRedux: this.props.listWeight
            })
        }
    }

    // ================= Delete Xóa data Redex =======
    handleDeleteDescriptions = (data) => {
        this.props.deleteDescriptionsRedux(data.id)
    }

    // ================= Edit Sửa data Redex =========
    handleEditDescriptions = (data, product) => {
        this.props.handleEditDescriptionsFrom(data, product)
    }

    render() {
        let { listWeight } = this.props;
        return (
            <React.Fragment>
            <table id="Tabledescription">
            <tbody>
                    <tr>
                         <th>Id sản phẩm</th>
                         <th>Ảnh mô tả</th>
                         <th>Actions</th>
                    </tr>

                    {listWeight && listWeight.length > 0 && listWeight.map((product) => (
                        product.imageList.map((item, ixdex) => (
                            <tr key={ixdex}>
                                <td>{product.name}</td>
                                <td className='img-menu_cartegory'><div className='Menu_img-cartegory' style={{backgroundImage: `url(${item.imageUrl})`}} ></div></td>
                                <td>
                                    <button className='btn-edit' onClick={() => this.handleEditDescriptions(item, product)}><i className="fa-solid fa-pen"></i></button>
                                    <button className='btn-delete' onClick={() => this.handleDeleteDescriptions(item)}><i className="fa-solid fa-trash"></i></button> 
                                </td>
                           </tr>
                        ))
                    ))}
                    
                </tbody>
                </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listWeight: state.admin.arrweight,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllWeightRedux: () => dispatch(actions.fetchAllWeightStart()),
        deleteDescriptionsRedux: (id) => dispatch(actions.deleteDescriptions(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabledescription);
