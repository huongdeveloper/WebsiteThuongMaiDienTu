import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserAdmin.scss';

class UserAdmin extends Component {
    constructor(props) {
        super(props);
        this.state ={
        }
    }
    componentDidMount() {
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <div className='grid'>
                <div className="title text-center">Quản lý hệ thống Admin</div>
                <div className='Admin-user_img-quanLy'>
                   <img className="Ing-Admin-user" src={require('../../assets/QuanLy1.jpg').default} alt=""/>
                </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin);
