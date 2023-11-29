import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class Header extends Component {
     // ===== Khai báo biến =======
     constructor(props) {
        super(props);
        this.state ={
            menuApp: []
        }
    }

    // ========= Đổi ngôn ngữ =============
    changeChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
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

    render() {
        const { processLogout, language, userInfo} = this.props;
        // console.log ('check userInfo', userInfo)

        return (
            <div className='header_Admin-user'>
            <div className="header-container grid">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='languages'> 
                    <span className='welcome'>Xin chào: {userInfo && userInfo.name ? userInfo.name : ''} </span>

                    {/* nút về Home */}
                    <Link className="btn btn-logout" to={`/home`} title='Home'>
                    <i className="fas fa-sign-out-alt"></i>
                    </Link>
                </div>
                </div>
            </div>
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
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
