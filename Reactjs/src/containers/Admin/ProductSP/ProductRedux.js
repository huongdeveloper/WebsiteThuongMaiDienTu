import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProductRedux.scss'
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { getDetailProductById } from '../../../services/userService';
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from '../../../utils';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ProductRedux extends Component {
    constructor(props) {
        super(props);
        this.state ={
            // save to Markdown table
            contentDetail: '',
            contentDetailHTML: '',
            contentDescribe: '',
            contentDescribeHTML: '',
            hasOldData: false,
            imageList: [],
            hosts: [],
            menu: [],
            action: 'CREATE',
            detailDoctor: {},
            currentDoctorId: -1,
            // save to doctor_infor table
            

        }
    }

    async componentDidMount() {
        this.props.fetchAllCaregory();
        this.props.fetchHostStart();
    }

    // ===== Lấy file đường link ảnh ==============
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    //======= Lấy file nhiều ảnh mô tả =========
    handleImageChange = async (event) => {
        let data = event.target.files;
        let imageList = [];
        for (let i = 0; i < data.length; i++) {
            let file = data[i];
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            imageList.push({ previewURL: objectUrl, avatar: base64 });
        }

        this.setState({
            imageList: imageList,
        });
        console.log('Danh sách ảnh: ', this.state.imageList);
    };
    

    // ============ Nhấn vào ảnh Hiện ảnh toàn màn hình  ================
    openPreviewImge = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

   // =========== Viết Redex cho vai trò ===============
   componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listMenu !== this.props.listMenu) {
        let arrcartegory = this.props.listMenu;
        this.setState({
            menu: arrcartegory,
            cartegory: arrcartegory && arrcartegory.length > 0 ? arrcartegory[0].id : ''
        })
    }
    if (prevProps.hostsRedux !== this.props.hostsRedux) {
        let arrHost = this.props.hostsRedux;
        this.setState({
            hosts: arrHost, 
            hostA: arrHost && arrHost.length > 0 ? arrHost[0].keyMap : ''
        })
    }
}

    //  ========= Gõ văn bản contentDetail  ===========
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentDetail: text,
            contentDetailHTML: html,
        })
    }

     //  ========= Gõ văn bản contentDescribe ===========
     handleChangeDescribe = ({ html, text }) => {
        this.setState({
            contentDescribe: text,
            contentDescribeHTML: html,
        })
    }

     // ======== kiểm tra from nhập ==========
     checkNameInput = () => {
        let isValid = true;
        let arrChek = ['name'];
        for (let i = 0; i < arrChek.length; i++) {
            if (!this.state[arrChek[i]]) {
                isValid = false;
                alert('Missing Parameter: ' + arrChek[i]);
                break;
            }
        }
        return isValid;
    }

    // ======== Lưu Product sản phẩm ==========
    handleSaveProduct = () => {
        let isValid = this.checkNameInput();
        if (isValid === false) return;

        let data = {
            contentDetailHTML: this.state.contentDetailHTML,
            contentDetail: this.state.contentDetail,
            contentDescribeHTML: this.state.contentDescribeHTML,
            contentDescribe: this.state.contentDescribe,

            name: this.state.name,
            discount: this.state.discount,
            selled: this.state.selled,
            inventory: this.state.inventory,
            avatar: this.state.avatar,
            imageList: this.state.imageList,
            cartegory: this.state.cartegory,
            hostA: this.state.hostA,
        }

        if(this.state.action === 'CREATE') {
            // Thực hiện tạo sản phẩm
            this.props.saveDetailProduct(data)
            if(this.props.history) {
                // this.props.history.push(`/system/shows-the-product-list`)
            }  
        }
    }
    //  ========= Thông tin các ô input và select ========
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let listMenu = this.state.menu;
        let host = this.state.hosts;
        // let {hasOldData} = this.state;

        return (
            <div className='product-container'>
                <div className='product-title title'>
                    Quản lý sản phẩm 
                </div>
                
                <div className='more-infor-etra row'>
                        <div className='col-4 form-group'>
                            <label>Danh mục:</label>
                            <select className="form-control" value={this.state.cartegory} onChange={(event) => {this.handleOnChangeText(event, 'cartegory')}}> 
                            <option defaultValue >-- Chọn --</option>
                              {listMenu && listMenu.length > 0 && listMenu.map ((item , index) => {
                                return (
                                    <option key= {index} value={item.id}>{ item.name}</option>
                                )
                            })}
                            
                            </select>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tên sản phẩm:</label>
                            <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'name')} value={this.state.name}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Sản phẩm giảm giá:</label>
                            <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'discount')} value={this.state.discount}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Số lượng đã bán:</label>
                            <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'selled')} value={this.state.selled}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Số lượng sản phẩm trong kho :</label>
                            <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'inventory')} value={this.state.inventory}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Sản phẩm host:</label>
                            <select className="form-control" value={this.state.hostA} onChange={(event) => {this.handleOnChangeText(event, 'hostA')}}>
                            <option defaultValue >-- Chọn --</option>
                                    {host && host.length > 0 && host.map ((item , index) => {
                                            return (
                                                <option key= {index} value={item.keyMap}>{item.valueVi}</option>
                                            )
                                        })}
                                    </select>
                        </div>
                        <div className="col-4">
                            <label>Ảnh sản phẩm</label>
                            <div className='preview-img-container'>
                                <input type='file' id='previewImg'multiple hidden onChange={(event) => this.handleOnchangeImage(event)}/>
                                <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fa-solid fa-cloud-arrow-up"></i></label>
                                <div className='preview-image form-control' style={{backgroundImage: `url(${this.state.previewImgURL})`}} onClick={() => this.openPreviewImge()}></div>
                            </div>
                        </div>

                        <div className="col-4">
                            <label>Ảnh Mô tả sản phẩm</label>
                            <div className='desc-SP_file'>
                                <input className='dropzoneStyle' type='file' id='previewdescrion'multiple hidden onChange={this.handleImageChange}/>
                                <label className='dropzoneStyle' htmlFor='previewdescrion'>Tải ảnh <i className="fa-solid fa-cloud-arrow-up"></i></label>
                                <div className='desc-Images form-control'>
                                    {this.state.imageList.map((image, index) => (
                                        <div key={index}>
                                            <img className='item-img_decs' src={image.previewURL} alt={`Ảnh ${index}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                <div className='product-editor'>
                    <label>Chi tiết sản phẩm:</label>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} 
                value={this.state.contentDetail}/>
                </div>
                <div className='product-editor'>
                    <label>Mô tả sản phẩm:</label>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleChangeDescribe} 
                value={this.state.contentDescribe}/>
                </div>


                <button className="btn btn-primary" style={{ width: 138, marginTop: 20 }} onClick={() => this.handleSaveProduct()} >
                    {this.state.action === 'CREATE' ? 'Tạo sản phẩm' : ''}
                </button>

                {this.state.isOpen === true && 
                <Lightbox mainSrc={this.state.previewImgURL}
                onCloseRequest={() => this.setState({ isOpen: false})}/>}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listMenu: state.admin.menu,
        hostsRedux: state.admin.hosts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCaregory: () => dispatch(actions.fetchAllMenuStart()),
        saveDetailProduct: (data) => dispatch(actions.saveDetailProduct(data)),
        fetchHostStart: () => dispatch(actions.fetchHostStart()),
        editProductSPRedux: (data) => dispatch(actions.editProductSP(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRedux);
