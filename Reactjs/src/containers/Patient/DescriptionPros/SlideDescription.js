import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils";
import { withRouter } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './SlideDescription.scss';
import { getDescriptionIdProductById } from '../../../services/userService';

class SlideDescription extends Component {
    constructor(props) {
        super(props);
        this.state ={
            slideDers: {}
        }
    }

    async componentDidMount() {
        if(this.props.descriptionList) {
            let res = await getDescriptionIdProductById(this.props.descriptionList);
            if (res && res.errCode === 0) {
            this.setState({
                slideDers: res.data
            })
        }
        }
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.descriptionList !== prevProps.descriptionList) {
         let res = await getDescriptionIdProductById(this.props.descriptionList);
         if (res && res.errCode === 0) {
             this.setState({
                 slideDers: res.data
             })
         }
        }
     }

    render() {
        let { slideDers} = this.state;
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000

        };
        return (
            <div className='app_SlideDescription'>
                <div className='left-SlideDescription'>
                <Slider {...settings}> 
                {slideDers && slideDers.length > 0 && slideDers.map((product) => (
                        product.imageList.map((item, index) => (  
                   <div key={index} className='SlideDescription-app-img'>
                       <img src={item.imageUrl}/>
                   </div>
                     ))
                    ))}
                </Slider>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SlideDescription));
