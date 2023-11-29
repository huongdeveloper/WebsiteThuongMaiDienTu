import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Slide from './Section/Slide';
import ProductApp from './Section/ProductApp';
import MenuApp from './Section/MenuApp';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state ={
        }
    }

    render() {;
        return (
           <div className='background_app-web'>
            <HomeHeader/>
            <Slide/>
            <MenuApp/>
            <ProductApp/>
            <About/>
            <HomeFooter/>
           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
