import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllSearchList } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import MenuApp from '../../HomePage/Section/MenuApp';
import './SearchProduct.scss';
import LoadingOverlay from 'react-loading-overlay';
import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate';

class SearchProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            isLoading: false,
            currentPage: 0,
            totalPages: 0,
        };
    }

    async componentDidMount() {
        this.handleSearch();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.handleSearch();
        }
    }

    async handleSearch() {
        let searchQuery = new URLSearchParams(this.props.location.search).get('query');
        let page = parseInt(new URLSearchParams(this.props.location.search).get('page')) || 1;
        let pageSize = 15;
        if (searchQuery) {
            try {
                this.setState({ isLoading: true });
                let response = await getAllSearchList(searchQuery, page, pageSize);
                this.setState({
                    searchResults: response.data,
                    totalPages: Math.ceil(response.totalCount / pageSize),
                    currentPage: page - 1,
                    isLoading: false,
                });
            } catch (error) {
                console.error(error);
                this.setState({ isLoading: false });
            }
        }
    }

    handlePageChange = (selected) => {
        let newPage = selected;
        this.setState(
            {
                isLoading: true,
                currentPage: newPage,
            },
            () => {
                toast.success("Chuyển trang thành công.");
                this.handleSearch();
            }
        );
    };

    handleViewDetailProduct = (ProductApp) => {
        if (this.props.history) {
            toast.success("Chuyển trang chi tiết thành công.");
            this.props.history.push(`/detail-Product/${ProductApp.id}`);
        }
    }

    render() {
        let { searchResults, currentPage, totalPages } = this.state;
        return (
            <div className='background_app-web'>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Loading...'
                >
                    <HomeHeader />
                    <div className='Menu-top-car'>
                    </div>
                    <MenuApp />
                    <div className='grid'>
                        <section className="search-gallery-one">
                            <div className="rowB">
                                <div className="search-gallery-one-content">
                                    <div className="search-gallery-one-content-title">
                                        <h1> KẾT QUẢ TÌM KIẾM SẢN PHẨM:</h1>
                                    </div>
                                    <div className="home-search">
                                        <div className="grid__row">
                                            {searchResults && searchResults.length > 0 && searchResults.map((item, index) => {
                                                let imgebase64 = '';
                                                if (item.image) {
                                                    imgebase64 = new Buffer(item.image, 'base64').toString('binary');
                                                }
                                                return (
                                                    <div className="grid__colum-2-4" key={index}>
                                                        <div className="home-search-item" onClick={() => this.handleViewDetailProduct(item)}>
                                                            <div><div className="home-search-item_img" style={{ backgroundImage: `url(${imgebase64})` }} /></div>
                                                            <h4 className="home-search-item_name">{item.name}</h4>
                                                            <div className="home-search-item_price">
                                                                <span className="home-search-item_price-current">Giá: Shop sẽ tư vấn cho bạn</span>
                                                            </div>
                                                            <div className="home-search-item_origin">
                                                                <span className="home-search-item_brand">Shop Giang Tùng</span>
                                                                <span className="home-search-item_origin-name">Hà Nội</span>
                                                            </div>
                                                            <div className="home-search-item_favourite">
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
                    <div className='grid'>
                        <ReactPaginate
                            previousLabel={<i className="fa-solid fa-chevron-left"></i>}
                            nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                            breakLabel={"..."}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageChange}
                            containerClassName={"paginationSearch git"}
                            subContainerClassName={"pages paginationSearch"}
                            activeClassName={"active"}
                            pageClassName={'page'}
                            forcePage={currentPage}
                        />
                    </div>
                    <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);
