import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Aoth/Login';
import System from '../routes/System';
import Admin from '../routes/Admin';
import HomePage from './HomePage/HomePage.js';

import ConfirmModal from '../components/ConfirmModal';
import DetailProduct from './Patient/Product/DetailProduct';
import DetailCartegory from './Patient/Cartegory/DetailCartegory';
import SearchProduct from './Patient/Search/SearchProduct';
import CustomScrollbars from '../components/CustomScrollbars';
import Doctor from '../routes/Doctor';


class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />

                        <div className="content-container">
                            <CustomScrollbars style= {{height: '100vh', width: '100%'}}>
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={path.ADMIN_USER} component={Admin} />
                                <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />
                                <Route path={path.HOMEPAGE} component={HomePage} />
                                <Route path={path.DETAIL_PRODUCT} component={DetailProduct}/> 
                                <Route path={path.DETAIL_CARTEGORY} component={DetailCartegory}/>
                                <Route path={path.DETAIL_SEARCH} component={SearchProduct}/>
                            </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* Hiện lên thông báo khi Lưu, Sửa, Xóa */}
                        <ToastContainer
                        position='bottom-right' autoClose={5000} hideProgressBar={false}
                        newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);