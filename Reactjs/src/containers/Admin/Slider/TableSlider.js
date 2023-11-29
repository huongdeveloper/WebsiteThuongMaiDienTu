import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableSlider.scss'
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

class TableSlider extends Component {
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

    // ================= Delete Xóa data Redex =======
    handleDeleteUser = (slider) => {
        // console.log('123', slider)
        this.props.deleteSliderRedux(slider.id)

    }

    // ================= Edit Sửa data Redex =========
    handleEditUser = (slider) => {
        this.props.handleEditSliderFromParent(slider)
    }

    render() {
        let arrSlider = this.state.sliderRedux;
        return (
            <React.Fragment>
            <table id="TableSlider">
            <tbody>
                    <tr>
                        <th>STT</th>
                         <th>name</th>
                         <th>Ảnh</th>
                         <th>Actions</th>
                    </tr>
                    {arrSlider && arrSlider.length > 0 && arrSlider.map((item, ixdex) => {
                        return (
                            <tr key={ixdex}>
                                <td>{ixdex + 1}</td>
                                <td>{item.SliderData.valueVi}</td>
                                <td className='img-menu_cartegory'><div className='Menu_img-cartegory' style={{backgroundImage: `url(${item.image})`}} ></div></td>
                                <td>
                                    <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fa-solid fa-pen"></i></button>
                                    <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                        </tr>
                        )
                    })}
                      
                        
                </tbody>
                </table>
            </React.Fragment>
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
        deleteSliderRedux: (id) => dispatch(actions.deleteSlider(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSlider);
