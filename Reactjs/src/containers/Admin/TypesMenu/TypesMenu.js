import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import './TypesMenu.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableTypesMenu from './TableTypesMenu';


class TypesMenu extends Component {

    // ===== Khai báo biến =======
    constructor(props) {
        super(props);
        this.state ={
            nameWeight: '', price: '', productId: '', action: '', weightEditId: '',arrweight: []
        }
    }

    async componentDidMount() {
        this.props.fetchAllWeightRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listWeight !== this.props.listWeight) {
            let arrPro = this.props.listWeight;
            this.setState({
                arrweight: arrPro,
                productId: arrPro && arrPro.length > 0 ? arrPro[0].id : ''
            })
        }
        // =========== Lấy thông tin Từ data lên from nhập để Sửa ==============
        if(prevProps.listWeight !== this.props.listWeight) {
            let arrPro = this.props.listWeight;
            this.setState({
                nameWeight: '', price: '', 
                productId: arrPro && arrPro.length > 0 ? arrPro[0].id : '',
                action: CRUD_ACTIONS.CREATE,
               
            })
        }
    }
    // ============== lưu thông tin nhập  ==================
    onChaneInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    // ======== kiểm tra from nhập ==========
    checkNameInput = () => {
        let isValid = true;
        let arrChek = ['nameWeight'];
        for (let i = 0; i < arrChek.length; i++) {
            if (!this.state[arrChek[i]]) {
                isValid = false;
                alert('Missing Parameter: ' + arrChek[i]);
                break;
            }
        }
        return isValid;
    }

     // ============ lưu vào data Redex =============
    handleSaveUser = () => {
        let isValid = this.checkNameInput();
        if (isValid === false) return;
        let { action } = this.state;
        // ======= Thêm người dùng =====
        if(action === CRUD_ACTIONS.CREATE) {
        this.props.saveDetailSelections({
                nameWeight: this.state.nameWeight,
                productId: this.state.productId,
                price: this.state.price
        })
    
    }
        // ======= Sửa người dùng =======
        if(action === CRUD_ACTIONS.EDIT) {
            this.props.editWeightRedux({ 
                id: this.state.weightEditId,
                nameWeight: this.state.nameWeight,
                productId: this.state.productId,
                price: this.state.price
            })
        }
    }

    // ============= Edit Sửa người dùng ==========
    handleEditWeightFrom = (data, product) => {
        // console.log('123', data)
        // console.log('123', product)
        this.setState({
            weightEditId: data.id,
            nameWeight: data.nameWeight,
            productId: product.id,
            price: data.price,
            action: CRUD_ACTIONS.EDIT
         })
        //  console.log('123bb', this.state)
    }

    render() {
        let listWeight = this.state.arrweight;
        let {nameWeight, price, productId} = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'> Quản lý lựa chọn Loại sản phẩm/kg
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                        <div className='col-12 my-3'>
                            Thêm danh mục mới
                              </div>
                              <div className="col-4">
                                  <label>Id sản phẩm</label>
                                  <select className="form-control" value={productId} onChange={(event) => {this.onChaneInput(event, 'productId')}}> 
                                    <option defaultValue >-- Chọn --</option>
                                        {listWeight && listWeight.length > 0 && listWeight.map ((item , index) => {
                                          return (
                                                <option key= {index} value={item.id}>{ item.name}</option>
                                            )
                                        })}
                            
                            </select>                              </div>

                              {/* value=" 12 con/1kg: 100.000 đ.kg" */}
                              <div className="col-4">
                                  <label>Tên Loại phẩm</label>
                                <input type="text" value={nameWeight} onChange={(event) => {this.onChaneInput(event, 'nameWeight')}} className="form-control" placeholder="Tên Loại phẩm"/>
                              </div>

                              <div className="col-4">
                                  <label>Giá sản phẩm</label>
                                <input type="text" value={price} onChange={(event) => {this.onChaneInput(event, 'price')}} className="form-control" placeholder="Giá sản phẩm"/>
                              </div>

                              <div className='col-12 my-3'>
                              <button type="submit" className= {this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} style={{width: 100}} 
                              onClick={() => this.handleSaveUser()}>
                                {this.state.action === CRUD_ACTIONS.EDIT ? 'Sửa Menu' : 'Lưu Menu'} </button>
                              </div>

                              <div className='col-12 mb-5'>
                                 <TableTypesMenu handleEditWeightFrom = {this.handleEditWeightFrom}
                                 action={ this.state.action }/> </div>
                        </div>
                    </div>
                </div>
                
            </div>
           
        )
    }

}

const mapStateToProps = state => {
    return {
         // ========= khai báo ngôn ngữ =============
         language: state.app.language,
         listWeight: state.admin.arrweight,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveDetailSelections: (data) => dispatch(actions.saveDetailSelections(data)),
        fetchAllWeightRedux: () => dispatch(actions.fetchAllWeightStart()),
        editWeightRedux: (data) => dispatch(actions.editWeight(data)),
        // ========= Đổi ngôn ngữ =============
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypesMenu);
