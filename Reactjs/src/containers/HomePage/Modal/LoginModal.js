import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CommonUtils} from '../../../utils';
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import './RegisterModal.scss';
import { Modal } from 'reactstrap';
import _ from 'lodash';
import { handleLoginApi } from '../../../services/userService';
import LoadingOverlay from 'react-loading-overlay';
import { emitter } from "../../../utils/emitter";


class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state ={
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
        this.listenToEmitter();
    }

    // ===== Reset lại from đăng ký ======
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                username: '',
                password: '',
            })
        })
    }

    componentDidMount() {
       
    }

    // lấy thông tin nhập login
    handleOnChangeUsername = (event) => {
        this.setState({
            username:event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password:event.target.value
        })
    }

    // hiện ẩn password
    handleShowHidePassword = () => {

        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if(event.key === 'Enter' || event.keyCode === 13){
            this.handleLogin();
        }
    }

    // check email, pass login
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {

            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('login success');
                toast.success("Đăng nhập thành công");
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
                this.props.closeLoginClose() 
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                    toast.error(" Đăng nhập thất bại! ");
                }
            }
            console.log('error message', error.response);
        }
    }

    render() {
        let language = this.props.language;
        let {isOpenLogin, closeLoginClose} = this.props;
        
        return (
            <LoadingOverlay
            active={this.state.isShowloading}
            spinner
            text='Loading...'
            >
            <Modal 
                isOpen={isOpenLogin}  
                className={'login-modal-container'}
                size='lg'
                centered
                >
                <div className='login-modal-content'>
                    <div className='login-modal-header'>
                        <span className='left'>Đăng nhập</span>
                    </div>
                    <div className='login-modal-body'>
                        
                        <div>
                            <div className='col-12 form-group'>
                                <label>Email:</label>
                                <input type='text' className='form-control' placeholder='Enter your email'
                                 value={this.state.username}
                                 onChange={(event) => this.handleOnChangeUsername(event)} 
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Password:</label>
                                <div className='custom-input-password'>
                                <input type= {this.state.isShowPassword ? 'text': 'password'} 
                                    className='form-control' placeholder=' Enter your password'
                                    onChange={(event) => { this.handleOnChangePassword(event)}}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                <i className={this.state.isShowPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}></i>
                                </span>
                                </div>
                            </div>
                            <div className='col-12' style={{color: 'red'}}> {this.state.errMessage} </div>
                            <div className='col-12'>
                                <span className='forgot-password'>Quên mật khẩu ?</span>
                            </div>
                        </div>
                    </div>
                    <div className='login-modal-footer'>
                        <button className='btn btn-primary btn-login-conform' onClick={() => this.handleLogin()}> Đăng Nhập</button>
                        <button className='btn btn-danger btn-login-cancel' onClick={closeLoginClose}> Hủy</button>
                    </div>

                    
                </div>
            </Modal>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
