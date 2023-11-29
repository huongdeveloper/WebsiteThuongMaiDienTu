import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import { toast } from "react-toastify";

class ProductApp extends Component {
    // ===== Khai báo biến =======
    constructor(props) {
        super(props);
        this.state ={
            productHome: [],
            productHomeP1: [],
            showAllProducts: false,
            sliderRedux: []
            
        };
    }

    componentDidMount() {
        this.props.fetchTopHomeProRedux();
        this.props.fetchgetHostP1ProRedux();
        this.props.fetchAllSliderRedux();
     }

    // =========== Viết Redex cho Hiện lên dữ liệu ==========
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topHomePros !== this.props.topHomePros) {
            this.setState({
                productHome: this.props.topHomePros
            })
        }

        if(prevProps.topHomeHostP1 !== this.props.topHomeHostP1) {
            this.setState({
                productHomeP1: this.props.topHomeHostP1
            })
        }

        if(prevProps.sliderAll !== this.props.sliderAll) {
            this.setState({
                sliderRedux: this.props.sliderAll
            })
        }
    }

     // ====== Chuyển sang trang chi tiết sản phẩm ==========
     handleViewDetailProduct = (ProductApp) => {
        if(this.props.history) {
            toast.success("Chuyển trang chi tiết thành công.")
            this.props.history.push(`/detail-Product/${ProductApp.id}`)
        }
    }

    render() {
        let arrSlider = this.state.sliderRedux;
        let arrProduct = this.state.productHome;
        let arrProP1 = this.state.productHomeP1;

        let SliderS4 = arrSlider.filter(slider => slider.sliderId === "S4");
        console.log('SliderS4', SliderS4)
        return (
            <div className='grid'>
             {/* <!-- =======  Sản phẩm 1 ========== --> */}
            <section className="product-gallery-one">
                <div className="rowB">
                <div className="product-gallery-one-content">
                    <div className="product-gallery-one-content-title">
                        <h1> HẢI SẢN GIANG TÙNG</h1>
                    </div>
                    {/* <!-- ===== nội dung sản phẩm ===== --> */}
                    <div className="home-product">
                        <div className="grid__row">
                            {/* <!-- Sản phẩm  --> */ }
                            {arrProduct && arrProduct.length > 0 && arrProduct.map((item, index) => {
                                if(item.hostId === "P0") {
                                 let imgebase64 = '';
                                 if(item.image) {
                                    imgebase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                return (
                            <div className="grid__colum-2-4">
                                <div className="home-product-item" key={index} onClick={() => this.handleViewDetailProduct(item)}>
                                    <div><div className="home-product-item_img" style={{backgroundImage: `url(${imgebase64})`}}/></div>
                                    <h4 className="home-product-item_name">{item.name}</h4>
                                    <div className="home-product-item_price">
                                        {/* <span className="home-product-item_price-old"> Giá: Shop sẽ tư vấn cho bạn</span> */}
                                        <span className="home-product-item_price-current">Giá: Shop sẽ tư vấn cho bạn</span>
                                    </div>
                                    <div className="home-product-item_origin">
                                        <span className="home-product-item_brand">Shop Giang Tùng</span>
                                        <span className="home-product-item_origin-name">Hà Nội</span>
                                    </div>
                                    <div className="home-product-item_favourite">
                                        <i className="fa-solid fa-check"></i><span> Yêu thích</span>
                                    </div>
                                </div>
                            </div>
                                )
                            }})}
                            
                             
                            
                        </div>
                    </div>
                </div>
                </div>
            </section>

            <section className="product-gallery-one">
            <div className="rowB">
            <div className="product-gallery-one-content">
            <div className='banner-slide_img'>
                    {SliderS4.map((slider, index) => (  
                       <img src={slider.image}/>
                    ))}
            </div>
            </div>
            </div>
            </section>

             {/* <!-- =======  Sản phẩm 2 ========== --> */}
             <section className="product-gallery-one">
                <div className="rowB">
                <div className="product-gallery-one-content">
                    <div className="product-gallery-one-content-title">
                        <h1> SỨC KHỎE VÀ LÀM ĐẸP</h1>
                    </div>
                    {/* <!-- ===== nội dung sản phẩm ===== --> */}
                    <div className="home-product">
                        <div className="grid__row">
                            {/* <!-- Sản phẩm  --> */ }
                            {arrProP1 && arrProP1.length > 0 && arrProP1.map((item, index) => {  
                                 let imgebase64 = '';
                                 if(item.image) {
                                    imgebase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                return (
                            <div className="grid__colum-2-4">
                                <div className="home-product-item" key={index} onClick={() => this.handleViewDetailProduct(item)}>
                                    <div><div className="home-product-item_img" style={{backgroundImage: `url(${imgebase64})`}}/></div>
                                    <h4 className="home-product-item_name">{item.name}</h4>
                                    <div className="home-product-item_price">
                                        {/* <span className="home-product-item_price-old"> Giá: Shop sẽ tư vấn cho bạn</span> */}
                                        <span className="home-product-item_price-current">Giá: Shop sẽ tư vấn cho bạn</span>
                                    </div>
                                    <div className="home-product-item_origin">
                                        <span className="home-product-item_brand">Shop Giang Tùng</span>
                                        <span className="home-product-item_origin-name">Hà Nội</span>
                                    </div>
                                    <div className="home-product-item_favourite">
                                        <i className="fa-solid fa-check"></i><span> Yêu thích</span>
                                    </div>
                                </div>
                            </div>
                                )
                            })}
                            
                             
                            
                        </div>
                    </div>
                </div>
                </div>
            </section>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // ========= khai báo ngôn ngữ =============
        sliderAll: state.admin.sliderAll,
        topHomePros: state.admin.topHomePros,
        topHomeHostP1: state.admin.topHomeHostP1,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopHomeProRedux: () => dispatch(actions.fetchTopHomePro()),
        fetchgetHostP1ProRedux: () => dispatch(actions.fetchgetHostP1Pro()),
        fetchAllSliderRedux: () => dispatch(actions.fetchAllSlider()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductApp));
