import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import { getAllClinic } from '../../../services/userService';

class medicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state ={
            dataClinics: []
        }
    }

    // ====== Hiện dữ liệu Chuyên khoa phổ biến =======
    async componentDidMount() {
        let res = await getAllClinic();
        if(res && res.errCode === 0 ) {
         this.setState({
            dataClinics: res.data ? res.data : []
         })
        }
     }

     // ====== Chuyển sang trang chi tiết Cơ sở y tế ==========
     handleViewDetailClinic = (clinic) => {
        if(this.props.history) {
         this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
     }
 
    render() {
        let { dataClinics, language } = this.state;
        // console.log('>>>>>>>>>', this.state)
        return (
            <div className='section-share section-medical-facilty'> 
              <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Cơ sở y tế nổi bật</span>
                    <button className='btn-section'>Tìm kiếm</button>
                </div>
                <div className='section-body'>
                <Slider {...this.props.settings}>
                {dataClinics && dataClinics.length > 0 && dataClinics.map((item, index) => {
                        return (
                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailClinic(item)}>
                        <div className='bg-imgae section-medical-facilty'  style={{backgroundImage: `url(${item.image})`}}/>
                        <div className='section-name-CLinics'>{item.name}</div>
                        </div>
                        )
                    })}
                    </Slider>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(medicalFacility));
