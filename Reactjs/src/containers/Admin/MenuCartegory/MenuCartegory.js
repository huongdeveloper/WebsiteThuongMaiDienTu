import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import './MenuCartegory.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableMenuCartegory from './TableMenuCartegory';


class MenuCartegory extends Component {

    // ===== Khai báo biến =======
    constructor(props) {
        super(props);
        this.state ={
            previewImgURL: '',
            isOpen: false,
             name: '', avatar: '', action: '', MenuEditId: '',
        }
    }

    async componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // =========== Lấy thông tin Từ data lên from nhập để Sửa ==============
        if(prevProps.listMenu !== this.props.listMenu) {
            this.setState({
                name: '', avatar: '',
                action: CRUD_ACTIONS.CREATE, previewImgURL: ''
               
            })
        }
    }

    // ===== Lấy file đường link ảnh ==============
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('base64 image: ', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    // ============ Nhấn vào ảnh Hiện ảnh toàn màn hình  ================
    openPreviewImge = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
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
        let arrChek = ['name'];
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
        this.props.createNewMenu({
                name: this.state.name,
                avatar: this.state.avatar
        })
    
    }
        // ======= Sửa người dùng =======
        if(action === CRUD_ACTIONS.EDIT) {
            this.props.editMenuRedux({ 
                id: this.state.MenuEditId,
                name: this.state.name,
                avatar: this.state.avatar
            })
        }
    }

    // ============= Edit Sửa người dùng ==========
    handleEditMenuFromParentKey = (menu) => {
        let imgebase64 = '';
        if(menu.image) {
            imgebase64 = new Buffer(menu.image, 'base64').toString('binary');
        }
        this.setState({
            MenuEditId: menu.id,
            name: menu.name,
            avatar: '',
            previewImgURL: imgebase64,
            action: CRUD_ACTIONS.EDIT
         })
    }

    render() {
        let isGetGender = this.props.isLoadingGender;

        let {name, avatar} = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'> Quản lý danh mục redux
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                        <div className='col-12 my-3'>
                            Thêm danh mục mới
                              </div>
                              <div className='col-12'>{isGetGender === true ? 'Loading genders' : ''}</div>
                              <div className="col-4">
                                  <label>Tên danh mục</label>
                                <input type="text" value={name} onChange={(event) => {this.onChaneInput(event, 'name')}} className="form-control" placeholder="name"/>
                              </div>

                              <div className="col-4">
                                  <label><FormattedMessage id ="manage-user.image"/></label>
                                  <div className='preview-img-container'>
                                    <input type='file' id='previewImg' hidden 
                                    onChange={(event) => this.handleOnchangeImage(event)}/>
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fa-solid fa-cloud-arrow-up"></i></label>
                                    <div className='preview-image form-control'
                                    style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                    onClick={() => this.openPreviewImge()}></div>
                                  </div>
                              </div>

                              <div className='col-12 my-3'>
                              <button type="submit" className= {this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} style={{width: 100}} 
                              onClick={() => this.handleSaveUser()}>
                                {this.state.action === CRUD_ACTIONS.EDIT ? 'Sửa Cart' : 'Lưu Cart'} </button>
                              </div>

                              <div className='col-12 mb-5'>
                                 <TableMenuCartegory handleEditMenuFromParent = {this.handleEditMenuFromParentKey}
                                 action={ this.state.action }/> </div>
                        </div>
                    </div>
                </div>
                
                {this.state.isOpen === true && 
                <Lightbox 
                mainSrc={this.state.previewImgURL}
                onCloseRequest={() => this.setState({ isOpen: false})}/>}
            </div>
           
        )
    }

}

const mapStateToProps = state => {
    return {
         // ========= khai báo ngôn ngữ =============
         language: state.app.language,
         isLoadingGender: state.admin.isLoadingGender,
         listMenu: state.admin.menu,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewMenu: (data) => dispatch(actions.createNewMenu(data)),
        fetchMenuRedux: () => dispatch(actions.fetchAllMenuStart()),
        editMenuRedux: (data) => dispatch(actions.editMenu(data)),

        // ========= Đổi ngôn ngữ =============
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuCartegory);
