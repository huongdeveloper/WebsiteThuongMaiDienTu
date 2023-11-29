import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableTypesMenu.scss'
import * as actions from "../../../store/actions";

class TableTypesMenu extends Component {
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
    handleDeleteWeight = (data) => {
        this.props.deleteWeightsRedux(data.id)
    }

    // ================= Edit Sửa data Redex =========
    handleEditWeight = (data, product) => {
        this.props.handleEditWeightFrom(data, product)
    }

    render() {
        let detailWeights = this.state.weightRedux;
        return (
            <React.Fragment>
            <table id="TableTypesMenu">
            <tbody>
                    <tr>
                         <th>Id sản phẩm</th>
                         <th>Tên loại sản phẩm</th>
                         <th>Giá sản phẩm</th>
                         <th>Actions</th>
                    </tr>

                    {detailWeights && detailWeights.length > 0 && detailWeights.map((product) => (
                        product.Weights.map((item, ixdex) => (
                            <tr key={ixdex}>
                                <td>{product.name}</td>
                                <td>{item.nameWeight}</td>
                                <td>{item.price} <span>đ</span> </td>
                                <td>
                                    <button className='btn-edit' onClick={() => this.handleEditWeight(item, product)}><i className="fa-solid fa-pen"></i></button>
                                    <button className='btn-delete' onClick={() => this.handleDeleteWeight(item)}><i className="fa-solid fa-trash"></i></button> 
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
        fetchAllWeightRedux: (page, pageSize) => dispatch(actions.fetchAllWeightStart(page, pageSize)),
        deleteWeightsRedux: (id) => dispatch(actions.deleteWeights(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableTypesMenu);
