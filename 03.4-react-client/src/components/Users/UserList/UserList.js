import React from 'react';
// import axios from 'axios';
import { Redirect } from 'react-router'
import '../../entityTable.css';

import UserListRow from './UserListRow/UserListRow';
import ModalConfirmation from '../../Modal/ModalConfirmation/ModalConfirmation';
import { getUserListCall, deleteUserCall } from '../../../apiCalls/userApiCalls';
import formMode from '../../formMode';

// const usersBaseURL = 'http://localhost:3001/api/users';
// Make a request for a user with a given ID
// axios.get('/user?ID=12345')

class UserList extends React.Component {
    constructor(props) {
        super(props);
        // let { action } = useParams();
        this.state = {
            users: [],
            isFetchingUsers: false,
            showDeleteModal: false,
            userToDelete: null,
            redirect: false
        }
        console.log(`props: ${JSON.stringify(props)}`);
    }

    componentDidMount() {
        this.fetchUserList();
        this.setState({
            isFetchingUsers: true
        });
    }

    render() {
        let redirectToForm = null;
        if (this.state.redirect === true) {
            redirectToForm = <Redirect to="/users/form" />
        }
        let deleteConfirmModalWindow = null;
        if(this.state.showDeleteModal) {
            const userDel = this.state.userToDelete;
            deleteConfirmModalWindow = (
                <ModalConfirmation 
                    confirmHandler={this.handleDeleteConfirm}
                    rejectHandler={this.handleDeleteCancel}
                    header="Potwierdź usunięcie">
                        <div>
                            <h2>Czy na pewno chcesz usunąć użytkownika?</h2>
                            <h3>Operacji nie będzie można cofnąć!</h3>
                            <p>ID: {userDel.id}</p>
                            <p>Imię: {userDel.firstName}</p>
                            <p>Nazwisko: {userDel.lastName}</p>
                        </div>
                </ModalConfirmation>
            );
        }
        if (this.state.isFetchingUsers) {
            return <p>Pobieranie użytkowników...</p>
        }
        if (this.state.users.length === 0) {
            return <p>Brak użytkowników w bazie</p>
        }
        
        const userRows = this.state.users.map((user, index) => {
            return <UserListRow user={user} key={user.id}
                showDetailsHandler={this.handleShowDetails.bind(this, user.id)}
                showEditHandler={this.handleShowEditForm.bind(this, user.id)}
                deleteHandler={this.handleDelete.bind(this, user)}
            />
        });
        return (
            <>
                {redirectToForm}
                {deleteConfirmModalWindow}
                <h1>Lista użytkowników:</h1>
                <table className="entity-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRows}
                    </tbody>
                    <tfoot>
                        <tr className="table-footer">
                            <td colSpan="4"><button onClick={this.handleShowNewForm}>Nowy użytkownik</button></td>
                        </tr>
                    </tfoot>
                </table>
            </>
        );
    }

    handleShowDetails = (userId) => {
        console.log(`handleShowDetails() userId: ${userId}`);
        window.sessionStorage.userFormMode = formMode.DETAILS;
        window.sessionStorage.userId = userId;
        this.setState({
            redirect: true
        });
    }

    handleShowEditForm = (userId) => {
        console.log(`handleShowEditForm() userId: ${userId}`);
        window.sessionStorage.userFormMode = formMode.EDIT;
        window.sessionStorage.userId = userId;
        this.setState({
            redirect: true
        });
    }

    handleDelete = (user) => {
        console.log(`handleDelete() userId: ${user.id}`);
        this.setState({
            showDeleteModal: true,
            userToDelete: user
        });

    }

    handleDeleteConfirm = () => {
        const user = this.state.userToDelete;
        // axios.delete(`${usersBaseURL}/${user.id}`)
        deleteUserCall(user.id)
            .then(res => {
                this.setState({
                    showDeleteModal: false,
                    userToDelete: null
                }, this.fetchUserList);
            });
    }

    handleDeleteCancel = () => {
        this.setState({
            showDeleteModal: false,
            userToDelete: null
        });
    }

    handleShowNewForm = () => {
        console.log(`handleShowNewForm()`);
        window.sessionStorage.userFormMode = formMode.NEW;
        window.sessionStorage.userId = null;
        this.setState({
            redirect: true
        });
    }

    fetchUserList = () => {
        getUserListCall()
            .then(response => {
                console.log(response);
                this.setState({
                    users: response.data,
                    isFetchingUsers: false,
                    showDeleteModal: false,
                    userIdToDelete: null,
                    redirect: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isFetchingUsers: true
                });
            })
            .finally(() => {
                console.log('finally');
            });
    }
}

export default UserList;