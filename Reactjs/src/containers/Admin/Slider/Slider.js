import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import './Slider.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableSlider from './TableSlider';


class Slider extends Component {

    // ===== Khai báo biến =======
    constructor(props) {
        super(props);
        this.state ={
            previewImgURL: '',
            isOpen: false,
            avatar: '', action: '', SliderEditId: '', Slider: []
        }
    }

    async componentDidMount() {
        this.props.fetchSliderStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // =========== Lấy thông tin Từ data lên from nhập để Sửa ==============
        if(prevProps.sliderAll !== this.props.sliderAll) {
            let arrSlider = this.props.SliderRedux;
            this.setState({
                avatar: '',
                action: CRUD_ACTIONS.CREATE, previewImgURL: '',
                SliderA: arrSlider && arrSlider.length > 0 ? arrSlider[0].keyMap : ''
               
            })
        }
        if (prevProps.SliderRedux !== this.props.SliderRedux) {
            let arrSlider = this.props.SliderRedux;
            this.setState({
                Slider: arrSlider, 
                SliderA: arrSlider && arrSlider.length > 0 ? arrSlider[0].keyMap : ''
            })
        }
    }

    // ===== Lấy file đường link ảnh ==============
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('base64 image: ', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    // ============ Nhấn vào ảnh Hiện ảnh toàn màn hình  ================
    openPreviewImge = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    // ============== lưu thông tin nhập  ==================
    onChaneInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    // ======== kiểm tra from nhập ==========
    checkNameInput = () => {
        let isValid = true;
        let arrChek = ['SliderA'];
        for (let i = 0; i < arrChek.length; i++) {
            if (!this.state[arrChek[i]]) {
                isValid = false;
                alert('Missing Parameter: ' + arrChek[i]);
                break;
            }
        }
        return isValid;
    }

     // ============ lưu vào data Redex =============
    handleSaveSlider = () => {
        let isValid = this.checkNameInput();
        if (isValid === false) return;
        let { action } = this.state;
        // // ======= Thêm người dùng =====
        if(action === CRUD_ACTIONS.CREATE) {
        this.props.createNewSlider({
            SliderA: this.state.SliderA,
            avatar: this.state.avatar
        })
    
    }
        // ======= Sửa người dùng =======
        if(action === CRUD_ACTIONS.EDIT) {
            this.props.editSliderRedux({ 
                id: this.state.SliderEditId,
                SliderA: this.state.SliderA,
                avatar: this.state.avatar
            })
        }
    }

    // ============= Edit Sửa người dùng ==========
    handleEditSliderKey = (slider) => {
        this.setState({
            SliderEditId: slider.id,
            SliderA: slider.sliderId,
            avatar: '',
            previewImgURL: slider.image,
            action: CRUD_ACTIONS.EDIT
         })
    }

    render() {
        let isGetGender = this.props.isLoadingGender;
        let Slider = this.state.Slider;
        // console.log('Slider', Slider);
        let { avatar} = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'> Quản lý Slider redux
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                        <div className='col-12 my-3'>
                            Thêm Slider mục mới
                              </div>
                              <div className='col-12'>{isGetGender === true ? 'Loading genders' : ''}</div>
                              <div className="col-4">
                                  <label>Tên Slider</label>
                                  <select className="form-control" value={this.state.SliderA} onChange={(event) => {this.onChaneInput(event, 'SliderA')}}>
                                   <option defaultValue >-- Chọn --</option>
                                    {Slider && Slider.length > 0 && Slider.map ((item , index) => {
                                            return (
                                                <option key= {index} value={item.keyMap}>{item.valueVi}</option>
                                            )
                                        })}
                                    </select>
                              </div>

                              <div className="col-4">
                                  <label><FormattedMessage id ="manage-user.image"/></label>
                                  <div className='preview-img-container'>
                                    <input type='file' id='previewImg' hidden 
                                    onChange={(event) => this.handleOnchangeImage(event)}/>
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fa-solid fa-cloud-arrow-up"></i></label>
                                    <div className='preview-image form-control'
                                    style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                    onClick={() => this.openPreviewImge()}></div>
                                  </div>
                              </div>

                              <div className='col-12 my-3'>
                              <button type="submit" className= {this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} style={{width: 100}} 
                              onClick={() => this.handleSaveSlider()}>
                                {this.state.action === CRUD_ACTIONS.EDIT ? 'Sửa Slider' : 'Lưu Slider'} </button>
                              </div>

                              <div className='col-12 mb-5'>
                                 <TableSlider handleEditSliderFromParent = {this.handleEditSliderKey}
                                 action={ this.state.action }/> </div>
                        </div>
                    </div>
                </div>
                
                {this.state.isOpen === true && 
                <Lightbox 
                mainSrc={this.state.previewImgURL}
                onCloseRequest={() => this.setState({ isOpen: false})}/>}
            </div>
           
        )
    }

}

const mapStateToProps = state => {
    return {
         // ========= khai báo ngôn ngữ =============
         SliderRedux: state.admin.Slider,
         isLoadingGender: state.admin.isLoadingGender,
         sliderAll: state.admin.sliderAll,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSliderStart: () => dispatch(actions.fetchSliderStart()),
        createNewSlider: (data) => dispatch(actions.createNewSlider(data)),
        fetchAllSliderRedux: () => dispatch(actions.fetchAllSlider()),
        editSliderRedux: (data) => dispatch(actions.editSlider(data)),

        // ========= Đổi ngôn ngữ =============
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
