import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils";
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
class Slide extends Component {
    constructor(props) {
        super(props);
        this.state ={
            sliderRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchAllSliderRedux();
     }
 
     // =========== Viết Redex cho Hiện lên dữ liệu ==========
     componentDidUpdate(prevProps, prevState, snapshot) {
         if(prevProps.sliderAll !== this.props.sliderAll) {
             this.setState({
                 sliderRedux: this.props.sliderAll
             })
         }
     }

    render() {
        let arrSlider = this.state.sliderRedux;
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000

        };
        let SliderS1 = arrSlider.filter(slider => slider.sliderId === "S1");
        let SliderS2 = arrSlider.filter(slider => slider.sliderId === "S2");
        let SliderS3 = arrSlider.filter(slider => slider.sliderId === "S3");
        return (
            <div className='app_slider grid'>
                <div className='left-slides'>
                <Slider {...settings}> 
                {SliderS1.map((slider, index) => (  
                   <div className='Sliders-app-img' key={index}>
                       <img src={slider.image}/>
                   </div>
                   ))}
                </Slider>
                </div>
                {/* <p>{ DetailProduct && DetailProduct.name && DetailProduct.name &&
                        <a>{DetailProduct.name}</a> }</p> */}
                <div className='right-slides'>
                    <div className='top-slides_img'>
                    {SliderS2.map((slider, index) => (  
                       <img src={slider.image}/>
                       ))}
                    </div>
                    <div className='bottom-slides_img'>
                    {SliderS3.map((slider, index) => (  
                       <img src={slider.image}/>
                       ))}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        sliderAll: state.admin.sliderAll,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSliderRedux: () => dispatch(actions.fetchAllSlider()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Slide));
