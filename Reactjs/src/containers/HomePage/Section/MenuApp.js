import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router';
import { toast } from "react-toastify";

class MenuApp extends Component {
  constructor(props) {
    super(props);
    this.state ={
        menuHome: []
    }
}

componentDidMount() {
   this.props.fetchMenuRedux();
}

// =========== Viết Redex cho Hiện lên dữ liệu ==========
componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.listMenu !== this.props.listMenu) {
        this.setState({
            menuHome: this.props.listMenu
        })
    }
}

 // ====== Chuyển sang trang danh sách sản phẩm ==========
 handleViewDetailMenu = (MenuApp) => {
  if(this.props.history) {
    toast.success("Chuyển trang danh sách sản phẩm thành công.");
   this.props.history.push(`/detail-Cartegory/${MenuApp.id}`)
  }
}
    render() {
      let arrMenu = this.state.menuHome;
        return (
            <div className='Menu-cartrgory'>
                   <div className='section-menu-app grid'> 
                   {arrMenu && arrMenu.length > 0 && arrMenu.slice().reverse().map((item, index) => {
                        let imgebase64 = '';
                        if(item.image) {
                           imgebase64 = new Buffer(item.image, 'base64').toString('binary');
                       }
                    return (
                      <div className='sub-menu'key={index} onClick={() => this.handleViewDetailMenu(item)}>
                        <div className='menu_img-app'>
                          <div className='menu-imgebase64' style={{backgroundImage: `url(${imgebase64})`}}/>
                        </div>
                        <div className='menu_sub-name'>{item.name}</div>
                      </div>
                    )
                  })}
                  </div>
                </div>
              
          
        );
    }

}

const mapStateToProps = state => {
    return {
        // ========= khai báo ngôn ngữ =============
        language: state.app.language,
        listMenu: state.admin.menu,
    };
};

const mapDispatchToProps = dispatch => {
    return {
      fetchMenuRedux: () => dispatch(actions.fetchAllMenuStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuApp));
