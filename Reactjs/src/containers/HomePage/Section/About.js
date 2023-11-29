import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        return (
          <div className='section-share section-about rowA grid'> 
                <div className='section-about-header'>
                Truyền thông nói về Website Shop Giang Tùng
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe className='iframe-youtobe' width="100%" height="440" src="https://www.youtube.com/embed/-rQAzycUtAU" 
                    title="FLYCAM NHÀ THỜ ĐỔ HẢI LÝ GIANG TÙNG" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen></iframe>
                    </div>

                    <div className='content-right'>
                        <p className='address-right'>Địa chỉ: Xã Hải Lý - Huyện Hải Hậu - Tỉnh Nam Định</p>
                          <p><b>Là người con Hải Hậu, </b>chắc hẳn ai ai cũng đã nghe đến cái tên “Nhà thờ đổ”. Một cái tên rất lạ, 
                          gợi sự tò mò cho nhiều người. Cũng vì sự tò mò, mà Nhà thờ đổ Hải Lý đã hấp dẫn nhiều du khách, 
                          các bạn trẻ đến thăm. Nhưng đăng sau nó là cả 1 câu chuyện lịch sử đẹp, sâu sa mà không phải ai 
                          cũng biết vì sao lại mang tên Nhà thờ đổ.<br/>
                          Nhà thờ đổ (cách gọi những nhà thờ bị bỏ hoang) vốn là nhà thờ thánh Maria Madalena.<br/>
                          Được biết, nhà thờ đổ còn có 1 cái tên gọi khác là “Nhà thờ Trái Tim” được xây dựng năm 1943 và do kiến trúc sư người Pháp thiết kế.<br/>
                          Theo như lịch sử ghi nhận, vào năm 1996, biển bắt đầu xâm lấn vào đất liền dài hơn 1km. 
                          Sự xâm lấn đó đã khiến ngôi làng trải dài theo bãi biển Xương Điền bị biến mất.
                           Một số công trình kiến trúc lớn trên biển như nhà thờ đã bị những cơn sóng đánh đổ xuống. 
                           Nhưng riêng chỉ có nhà thờ thánh Maria Madalena vẫn còn đó không bị sóng đánh đổ nhưng nó cũng không còn nguyên vẹn như trước.
                           Và cũng chính là nơi cung cấp nguồn <b>Hải Sản cho Shop Giang Tùng</b>.
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
