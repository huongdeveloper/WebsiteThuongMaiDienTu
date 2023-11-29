import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserAdmin from '../containers/Admin/UserAdmin';
import UserRedux from '../containers/Admin/AdminUser/UserRedux';
import Header from '../containers/Header/Header';
import MenuCartegory from '../containers/Admin/MenuCartegory/MenuCartegory';
import TypesMenu from '../containers/Admin/TypesMenu/TypesMenu';
import ProductRedux from '../containers/Admin/ProductSP/ProductRedux';
import TableProductRedux from '../containers/Admin/ProductSP/TableProductRedux';
import description from '../containers/Admin/description/description';
class Admin extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
            {isLoggedIn && <Header />}
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-admin" component={UserAdmin} />
                        <Route path="/system/manage-user" component={UserRedux} />
                        <Route path="/system/manage-menu" component={MenuCartegory} />
                        <Route path="/system/manage-types" component={TypesMenu} />
                        <Route path="/system/manage-product" component={ProductRedux} />
                        <Route path="/system/shows-the-product-list" component={TableProductRedux} />
                        <Route path="/system/product-description" component={description} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
