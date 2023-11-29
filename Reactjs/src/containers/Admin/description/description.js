import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import './description.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Tabledescription from './Tabledescription';

class description extends Component {

    // ===== Khai báo biến =======
    constructor(props) {
        super(props);
        this.state ={
            productId: '', action: '', descriptionsEditId: '',arrweight: [],
            imageList: []
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
                imageList: [],
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

    //======= Lấy file nhiều ảnh mô tả =========
    handleImageChange = async (event) => {
        let data = event.target.files;
        let imageList = [];
        for (let i = 0; i < data.length; i++) {
            let file = data[i];
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            imageList.push({ previewURL: objectUrl, avatar: base64 });
        }

        this.setState({
            imageList: imageList,
        });
        console.log('Danh sách ảnh: ', this.state.imageList);
    };

     // ============ lưu vào data Redex =============
    handleSaveDescriptions = () => {
        let { action } = this.state;
        // ======= Thêm người dùng =====
        if(action === CRUD_ACTIONS.CREATE) {
        this.props.saveDetailDescriptions({
                imageList: this.state.imageList,
                productId: this.state.productId,
        })
        }
        // ======= Update Sửa người dùng =======
        if(action === CRUD_ACTIONS.EDIT) {
            this.props.editDescriptionsRedux({ 
                id: this.state.descriptionsEditId,
                imageList: this.state.imageList,
                productId: this.state.productId,
            })
        }
    }

    // ============= Edit Update Sửa người dùng ==========
    handleEditDescriptionsFrom = (item, product) => {
       let imageList = [
        {
            previewURL: item.imageUrl,  // Sử dụng imageUrl từ item
            avatar: item.imageUrl,  // Sử dụng imageUrl từ item
        },
       ];
        this.setState({
            descriptionsEditId: item.id,
            productId: product.id,
            imageList: imageList,
            
            action: CRUD_ACTIONS.EDIT
         })
    }

    render() {
        let listWeight = this.state.arrweight;
        let { productId} = this.state;
        console.log('dữ liệu: ', productId);
        return (
            <div className='user-redux-container'>
                <div className='title'> Quản lý ảnh mô tả
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                        <div className='col-12 my-3'>
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
                                  </select>                              
                                </div>

                              <div className="col-5">
                            <label>Ảnh Mô tả sản phẩm</label>
                            <div className='desc-SP_file'>
                                <input className='dropzoneStyle' type='file' id='previewdescrion' multiple hidden onChange={this.handleImageChange}/>
                                <label className='dropzoneStyle' htmlFor='previewdescrion'>Tải ảnh <i className="fa-solid fa-cloud-arrow-up"></i></label>
                                <div className='desc-Images form-control'>
                                    {this.state.imageList.map((image, index) => (
                                        <div key={index}>
                                            <img className='item-img_decs' src={image.previewURL} alt={`Ảnh ${index}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            </div>

                              <div className='col-12 my-3'>
                              <button type="submit" className= {this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} style={{width: 100}} 
                              onClick={() => this.handleSaveDescriptions()}>
                                {this.state.action === CRUD_ACTIONS.EDIT ? 'Sửa images' : 'Lưu images'} </button>
                              </div>

                              <div className='col-12 mb-5'>
                                 <Tabledescription handleEditDescriptionsFrom = {this.handleEditDescriptionsFrom}
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
        saveDetailDescriptions: (data) => dispatch(actions.saveDetailDescriptions(data)),
        fetchAllWeightRedux: () => dispatch(actions.fetchAllWeightStart()),
        editDescriptionsRedux: (data) => dispatch(actions.editDescriptions(data)),
        // ========= Đổi ngôn ngữ =============
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(description);
