import React, { Component } from 'react';
import { connect } from 'react-redux';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
        }
    }
    render() {
        return (
            <div className='login-background'>
        </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
