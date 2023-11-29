import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import './RegisterModal.scss';
import { Modal } from 'reactstrap';
import _ from 'lodash';
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import LoadingOverlay from 'react-loading-overlay';
import { emitter } from "../../../utils/emitter";

class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isOpen: false,
            name: '',
            phonenumber: '',
            email: '',
            address: '',
            password: '',
            roleId: '',
            avatar: '',
        }
        this.listenToEmitter();
    }

    // ===== Reset lại from đăng ký ======
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                name: '',
            phonenumber: '',
            email: '',
            address: '',
            password: '',
            roleId: '',
            avatar: '',
            action: CRUD_ACTIONS.CREATE, previewImgURL: ''
            })
        })
    }

    async componentDidMount() {       
    }

    //============ lưu thông tin nhập  ============
    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state};
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
        
    }

    // ======== kiểm tra from nhập ==========
    checkValidateInput = () => {
        let isValid = true;
        let arrChek = ['name', 'email', 'password', 'phonenumber', 'address'];
        for (let i = 0; i < arrChek.length; i++) {
            if (!this.state[arrChek[i]]) {
                isValid = false;
                alert('Missing Parameter: ' + arrChek[i]);
                break;
            }
        }
        return isValid;
    }

    //========== Lưu thông tin Đăng ký ========
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        // ======= Thêm người dùng =====
        this.props.createNewUser({
                name:this.state.name,
                email:this.state.email,
                password: this.state.password,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                roleId: this.state.role,
                avatar: this.state.avatar
        })
        emitter.emit('EVENT_CLEAR_MODAL_DATA')
        this.props.closeRegisterClose() 
        
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

    // hiện ẩn password
    handleShowHidePassword = () => {

        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        let language = this.props.language;
        let {isOpenModal, closeRegisterClose} = this.props;
        let {email, password, name, phonenumber, 
            address, avatar} = this.state;
        return (
            <LoadingOverlay
            active={this.state.isShowloading}
            spinner
            text='Loading...'
            >
            <Modal 
                isOpen={isOpenModal}  
                className={'register-modal-container'}
                size='lg'
                centered
                >
                <div className='register-modal-content'>
                    <div className='register-modal-header'>
                        <span className='left'>Thông Tin Đăng ký</span>
                        <span className='right' onClick={closeRegisterClose}><i className="fa-solid fa-xmark"></i></span>
                    </div>
                    <div className='register-modal-body'>
                        
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ Tên:</label>
                                <input className='form-control' type='text'
                                value={name} onChange={(event) => this.handleOnchangeInput(event, 'name')}/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Điện Thoại:</label>
                                <input className='form-control' type='text'
                                value={phonenumber} onChange={(event) => this.handleOnchangeInput(event, 'phonenumber')}/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email:</label>
                                <input className='form-control' type='email'
                                value={email} onChange={(event) => this.handleOnchangeInput(event, 'email')}/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ:</label>
                                <input className='form-control' type='text'
                                value={address} onChange={(event) => this.handleOnchangeInput(event, 'address')}/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Password:</label>
                                {/* ============ */}
                                <div className='custom-input-password'>
                                <input type= {this.state.isShowPassword ? 'text': 'password'} 
                                    className='form-control' placeholder=' Enter your password'
                                    value={password} onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                />
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                <i className={this.state.isShowPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}></i>
                                </span>
                                </div>
                                {/* ============== */}
                            </div>

                            <div className='col-6 form-group'>
                                <label>Ảnh avatar</label>
                                <input type='file' id='previewImg' hidden onChange={(event) => this.handleOnchangeImage(event)}/>
                               <div className='preview-img-container'>
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fa-solid fa-cloud-arrow-up"></i></label>
                                    <div className='preview-image form-control' style={{backgroundImage: `url(${this.state.previewImgURL})`}} onClick={() => this.openPreviewImge()}></div>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='register-modal-footer'>
                        <button className='btn btn-primary btn-register-conform' onClick={() => this.handleSaveUser()}> Đăng ký</button>
                        <button className='btn btn-danger btn-register-cancel' onClick={closeRegisterClose}> Hủy</button>
                    </div>
                    {this.state.isOpen === true && 
                <Lightbox 
                mainSrc={this.state.previewImgURL}
                onCloseRequest={() => this.setState({ isOpen: false})}/>}

                </div>
            </Modal>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listUser: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
