import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { getDetailProductById } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import SlideDescription from '../DescriptionPros/SlideDescription';
import './DetailProduct.scss';
import LoadingOverlay from 'react-loading-overlay';
import { toast } from "react-toastify";

class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state ={
            DetailProduct: {},
           currentProductId: -1,
           showAttention: false,
           isShowloading: true
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentProductId: id
            })
            let res = await getDetailProductById(id);
            if(res && res.errCode === 0){
                this.setState({
                    DetailProduct: res.data,
                    isShowloading: false 
                })
                
            }
        }
    }

    toggleAttention = () => {
        this.setState(prevState => ({
            showAttention: !prevState.showAttention
        }));
    }

    // ==== ấn vào logo trở về trang chủ ======
    returnToHome = () => {
        if(this.props.history) {
            this.props.history.push(`/home`)
            toast.success("Chuyển về trang Home thành công.")
        }  
    }

    returnToCartegoryList = () => {
        if (this.props.history) {
            this.props.history.goBack();
            toast.success("Trở về thành công.")
        }
    }  

     // ==== ấn vào logo trở về trang chủ ======
     returnToHome = () => {
        if(this.props.history) {
            this.props.history.push(`/home`)
            toast.success("Chuyển về trang Home thành công.")
        }  
    }

    render() {
        let language = this.props.language;
        let { DetailProduct } = this.state;
        let nameWeightList = [];
        console.log('Danh sách ảnh: ', DetailProduct);
        return (
            <div className='background_app-web '>
                <LoadingOverlay
            active={this.state.isShowloading}
            spinner
            text='Loading...'
            >
            <div className='mobile-header_Pro'>
            <HomeHeader/>
            </div>
            <div className='HomeHeader-mobile'>
            <div className="grid">
                <nav className="header_mobile_navbar">
                    <ul className="header_mobile_navbar-list">
                        <li className="header_return-item" onClick={this.returnToCartegoryList}>
                            <i class="fa-solid fa-circle-left"></i>
                        </li>
                        <li className="header_mobile_navbar">
                            <div className="header_mobile_logo">
                                <img src={require('../../../assets/logo1.png').default} alt="" className="header__logo-img" onClick={() => this.returnToHome()}/>
                            </div>
                        </li>
                        <li className="header_mobile_navbar-shoping">
                            <div className="header_mobile_cart-wrap">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className="header_mobile_cart-notice">n</span>
                            </div>

                        </li>
                    </ul>
                </nav>
            </div>
            </div>
            <div className='grid'>
               <div className='product-top git'>
                    <p className='return-home-p' onClick={() => this.returnToHome()}><a>Trang chủ</a></p><span>&#8594;</span>
                    
                    <p>{ DetailProduct && DetailProduct.portfolio && DetailProduct.portfolio.name &&
                        <a>{DetailProduct.portfolio.name}</a> }</p><span>&#8594;</span> 
                    
                    <p>{ DetailProduct && DetailProduct.name && DetailProduct.name &&
                        <a>{DetailProduct.name}</a> }</p>
                </div>
               <div className='product-content git'>
                <div className='product-content-left'>
                    <SlideDescription descriptionList = {this.state.currentProductId}/>
                    <h3 className='content-HTML'>Mô tả sản phẩm:</h3>
                    {DetailProduct && DetailProduct.contentDetailHTML &&
                        <div className='product-contentDetailHTML' dangerouslySetInnerHTML={{__html: DetailProduct.contentDetailHTML }}></div>
                    }
                </div>
                <div className="product-content-right">
                { DetailProduct && DetailProduct.name && DetailProduct.name &&
                    <div className="sanpham_tieude">{DetailProduct.name}</div>
                }
                    <div className="product-content-price"> Giá: Shop sẽ tư vấn cho bạn qua 
                       <div className='hotline_price'>
                         <p className='price-phone-fa'>
                          <i class="fa-solid fa-phone-volume"></i> Hotline: </p>
                          <p>0963438268</p>
                       </div>
                       <div className='facebook_price'>
                       <a target='_blank' href="https://www.facebook.com/giang.tung.37853" className='facebook-brands'>
                         <i class="fa-brands fa-facebook"></i> Facebook: </a>
                          <p>Giang Tùng</p>
                       </div>
                       <div className='facebook_price'>
                       <img src={require('../../../assets/zalo_sharelogo.png').default} alt="" className='image-brands'/>
                          <p className='zalo-sharelogo'>Zalo:</p>
                          <p>0963438268</p>
                       </div>
                    </div>
                    <div className='product-content-Weights'>
                        <div className='product_right-Weight'>Danh sách lựa chọn:</div>
                        <div className='product_right-nameWeight'>
                            {DetailProduct && DetailProduct.Weights && DetailProduct.Weights.map((item, index) => {  
                                // Thêm nameWeight vào danh sách
                                nameWeightList.push(item.nameWeight);
                                return (
                                    <button className='btn-nameWeight' key={index}>
                                        {item.nameWeight}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    {this.state.showAttention &&
                       <div className='attention-right'>Chú ý: Quý khách muốn đặt hàng, xin vui lòng gọi cho Shop Giang Tùng hoặc nhắn tin qua Messenger để được tư vấn hỗ trợ lên đơn cho Quý Khách. Xin cảm ơn Quý khách đã ủng hộ cho Shop Giang Tùng. Thank you very much.</div>
                    }
                    <div className='Payment-orders'>
                        <button className='shopping_orders' onClick={this.toggleAttention}>
                        <i class="fa-solid fa-cart-shopping"></i><p>MUA HÀNG</p></button>
                    </div>

                    <h3 className='content-DescribeHTML'>Chi tiết sản phẩm:</h3>
                    {DetailProduct && DetailProduct.contentDescribeHTML &&
                        <div className='product-DescribeHTML' dangerouslySetInnerHTML={{__html: DetailProduct.contentDescribeHTML }}></div>
                    }
                </div>

            </div>
            </div>
            <HomeFooter/>
            </LoadingOverlay>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
