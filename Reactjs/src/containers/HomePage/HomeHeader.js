import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import * as actions from "../../store/actions";
import { adminMenu,  } from '../Header/menuApp';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, USER_ROLE } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from 'react-router';
import RegisterModal from './Modal/RegisterModal';
import LoginModal from './Modal/LoginModal';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { getAllSearchList } from '../../services/userService';

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state ={
            tempValue: '',
            isOpenModalRegister: false,
            isOpenLogin: false,
            menuApp: []
        }
    }

// ========= Đổi ngôn ngữ =============
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    // ==== ấn vào logo trở về trang chủ ======
    returnToHome = () => {
        if(this.props.history) {
            this.props.history.push(`/home`)
            toast.success("Chuyển về trang Home thành công.")
        }  
    }

    isChange = (event) => {
        this.setState({
            tempValue: event.target.value
        })
    }

    // ========= Sự kiện OnClick hiện ra from Đăng ký ==========
   handleClickRegister = () => {
    this.setState({
        isOpenModalRegister: true,
    })
   }

   // ========= Close tắt from Đăng ký ====
   closeRegisterClose = () => {
    this.setState({
        isOpenModalRegister: false
    })
   }

   // ========= Sự kiện OnClick hiện ra from Đăng Nhập ==========
   handleClickLogin = () => {
    this.setState({
        isOpenLogin: true,
    })
   }

    // ========= Close tắt fromĐăng Nhập ====
    closeLoginClose = () => {
        this.setState({
            isOpenLogin: false
        })
    }

     // ======= Phân quyền người dùng =========
     componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            // if(role === USER_ROLE.DOCTOR) {
            //     menu = doctorMenu;
            // }
        }
        this.setState({
            menuApp: menu
        })
    }
//======= Tạo Chức năng tìm kiếm tên sản phẩm  ==========
    handleSearch = (event) => {
        event.preventDefault(); // Ngăn chặn gửi form mặc định
        let { tempValue } = this.state;
        this.props.history.push(`/search?query=${tempValue}`);
        toast.success("Kết quả bạn tìm kiếm thông tin là.");
        this.setState({ tempValue: '' });
    };
  

    render() {
        let { processLogout, language, userInfo} = this.props;
        let { isOpenModalRegister, isOpenLogin } = this.state;
        return (
            <React.Fragment>
            <div className="app">
             <header className="header">
              <div className="grid">
                <nav className="header__navbar">
                    <ul className="header__navbar-list">
                        <li className="header__navbar-item header__navbar-item--separate">
                            Cửa hàng Shop xin kính chào Quý khách
                        </li>
                        <li className="header__navbar-item">
                            <span className="header__navbar-title--no-pointer">Kết nối </span>
                            <a target='_blank' href="https://www.facebook.com/giang.tung.37853" className="header__navbar-icon-link"><i className="header__navbar-icon fa-brands fa-facebook"></i></a>
                            <a href="" className="header__navbar-icon-link"><i className="header__navbar-icon fa-solid fa-shop"></i></a>

                        </li>
                    </ul>
                    <ul className="header__navbar-list header_navbar-regular ">
                        <li className="header__navbar-item header__navbar-item--separate">
                            <a href="" className="header__navbar-item-link">
                            <i className="header__navbar-icon fa-regular fa-bell"></i>Thông báo</a>
                        </li>
                        <li className="header__navbar-item header__navbar-item--separate">
                            <a href="" className="header__navbar-item-link">
                            <i className="header__navbar-icon fa-regular fa-circle-question"></i>Trợ giúp</a>
                        </li>

                        {userInfo && userInfo.name ? 
                            <li className="header__navbar-item header__navbar-user">
                            <img style={{backgroundImage: `url(${userInfo.image})`}} alt="" className="header__navbar-user-img header__navbar-item--strong"/>
                            <spam className="header__navbar-user-name header__navbar-item--strong">{userInfo.name}</spam>

                            <ul className="header__navbar-user-menu">
                                <h3 className='user-item_h3'>Tài khoản của tôi</h3>
                            {userInfo && userInfo.roleId === 'R1' && 
                                <li className="header__navbar-user-item">
                                    <Link to={`/admin`}>Quản lý hệ thống</Link>
                                </li>
                            }
                            {userInfo && userInfo.roleId === 'R2' && 
                                <li className="header__navbar-user-item">
                                    <a href="">Quản lý hệ thống</a>
                                </li>
                            }
                                <li className="header__navbar-user-item">
                                    <a href="">Thông tin tài khoản</a>
                                </li>
                                <li className="header__navbar-user-item">
                                    <a href="">Quản lý đơn hàng</a>
                                </li>
                                <li className="header__navbar-user-item header__navbar-user-item--separate">
                                    <a onClick={processLogout} >Đăng xuất</a>
                                </li>
                            </ul>
                        </li> 
                        
                        :
                        <>
                        <li className="header__navbar-item header__navbar-item--strong header__navbar-item--separate" 
                        onClick={() => this.handleClickRegister()}>Đăng Ký</li>
                        <li className="header__navbar-item header__navbar-item--strong"
                        onClick={() => this.handleClickLogin()}>Đăng Nhập</li>
                        </>
                    }
                        

                        
                    </ul>
                </nav>

                <div className="header-with-search">
                    <div className="header__logo">
                        <a href="/" className="header__logo-link">
                            <img src={require('../../assets/logo1.png').default} alt="" className="header__logo-img" onClick={() => this.returnToHome()}/>
                        </a>
                    </div>
{/* ===========  Tạo Chức năng tìm kiếm tên sản phẩm ============ */}
                    <form onSubmit={this.handleSearch}>
                    <div className="header__search">
                        <div className="header__search-input-wrap">
                            <input type="text" className="header__search-input" value={this.state.tempValue} onChange={this.isChange} placeholder="Nhập để tìm kiếm sản phẩm "/>
                        </div>
                        <button className="header__search-btn" type="submit">
                            <i className="header__search-btn-icon fa-solid fa-magnifying-glass"></i>
                        </button>
                        </div>
                    </form>
                    
{/* =========== End ============== */}
                    {/* <!-- ================ giỏ hàng ============== --> */}
                    <div className="header__cart">
                        <div className="header__cart-wrap">
                            <i className="header__cart-ion fa-solid fa-cart-shopping"></i>
                            <span className="header__cart-notice">n</span>
                        </div>

                    </div>
                </div>
              </div>
             </header>
            </div>

            <RegisterModal isOpenModal = {isOpenModalRegister}
                closeRegisterClose = {this.closeRegisterClose}/>
            <LoginModal isOpenLogin = {isOpenLogin}
             closeLoginClose={this.closeLoginClose}/>
           </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        // ========= khai báo ngôn ngữ =============
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        // ========= Đổi ngôn ngữ =============
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
