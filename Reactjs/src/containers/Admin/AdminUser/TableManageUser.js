import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state ={
            usersRedux: []
        }
    }

    componentDidMount() {
       this.props.fetchUserRedux();
    }

    // =========== Viết Redex cho Hiện lên dữ liệu ==========
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listUser !== this.props.listUser) {
            this.setState({
                usersRedux: this.props.listUser
            })
        }
    }

    // ================= Delete Xóa data Redex =======
    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)

    }

    // ================= Edit Sửa data Redex =========
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        let arrUser = this.state.usersRedux;
        return (
            <React.Fragment>
            <table id="TableManageUser">
            <tbody>
                    <tr>
                         <th>Email</th>
                         <th>name</th>
                         <th>phonenumber</th>
                         <th>Address</th>
                         <th>Actions</th>
                    </tr>
                    {arrUser && arrUser.length > 0 && arrUser.map((item, ixdex) => {
                        return (
                            <tr key={ixdex}>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td>{item.phonenumber}</td>
                                <td>{item.address}</td>
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
        listUser: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
