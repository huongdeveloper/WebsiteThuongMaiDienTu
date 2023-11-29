import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableMenuCartegory.scss'
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

class TableMenuCartegory extends Component {
    constructor(props) {
        super(props);
        this.state ={
            menuRedux: []
        }
    }

    componentDidMount() {
       this.props.fetchMenuRedux();
    }

    // =========== Viết Redex cho Hiện lên dữ liệu ==========
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listMenu !== this.props.listMenu) {
            this.setState({
                menuRedux: this.props.listMenu
            })
        }
    }

    // ================= Delete Xóa data Redex =======
    handleDeleteUser = (menu) => {
        // console.log('123', menu)
        this.props.deleteMenuRedux(menu.id)

    }

    // ================= Edit Sửa data Redex =========
    handleEditUser = (menu) => {
        this.props.handleEditMenuFromParent(menu)
    }

    render() {
        let arrMenu = this.state.menuRedux;
        return (
            <React.Fragment>
            <table id="TableMenuCartegory">
            <tbody>
                    <tr>
                         <th>name</th>
                         <th>Ảnh</th>
                         <th>Actions</th>
                    </tr>
                    {arrMenu && arrMenu.length > 0 && arrMenu.map((item, ixdex) => {
                        let imgebase64 = '';
                        if(item.image) {
                           imgebase64 = new Buffer(item.image, 'base64').toString('binary');
                       }
                        return (
                            <tr key={ixdex}>
                                <td>{item.name}</td>

                                <td className='img-menu_cartegory'><div className='Menu_img-cartegory' style={{backgroundImage: `url(${imgebase64})`}} ></div></td>
                                <td>
                                    <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fa-solid fa-pen"></i></button>
                                    <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                        </tr>
                        )
                    })}
                      
                        
                </tbody>
                </table>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listMenu: state.admin.menu,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMenuRedux: () => dispatch(actions.fetchAllMenuStart()),
        deleteMenuRedux: (id) => dispatch(actions.deleteMenu(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableMenuCartegory);
