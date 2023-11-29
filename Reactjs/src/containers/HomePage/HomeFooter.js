import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {

    render() {
        return (
          <div className='home-footer'>
              <h5><b>Địa chỉ:</b> Số 36, Ngách 3, Ngõ 379 Lương Thế Vinh, Mễ Trì, Từ Liêm, Hà Nội</h5>
              <p>&copy; Website 2023 Shop Giang Tùng hân hạnh được phục vụ Quý Khách - More information, please visit my faceboook. <a target='_blank' href="https://www.facebook.com/giang.tung.37853"> Click here</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
