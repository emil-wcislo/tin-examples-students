import React from 'react';
// import axios from 'axios';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
} from "react-router-dom";
import { Redirect } from 'react-router'

import formMode from '../../formMode';
import ModalMessage from '../../Modal/ModalMessage/ModalMessage';

import { getUserDetailsCall, createUserCall, updateUserCall } from '../../../apiCalls/userApiCalls';

import '../../entityForm.css';


// const usersBaseUrl = 'http://localhost:3001/api/users';

class UserForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            user: {
                firstName: '',
                lastName: ''
            },
            errors: {
                firstName: [],
                lastName: []
            },
            formMode: formMode.NEW,
            modalMessage: null,
            redirect: false
        }
    }

    componentDidMount() {
        const currentFormMode = window.sessionStorage.userFormMode;
        const userId = window.sessionStorage.userId;
        console.log(`UserForm.componentDidMount() formMode: ${currentFormMode} userId: ${userId}`);
        this.setState({
            userId: userId,
            user: {
                firstName: '',
                lastName: ''
            },
            errors: {
                firstName: [],
                lastName: []
            },
            formMode: currentFormMode,
            modalMessage: null,
            redirect: false
        })
        if (currentFormMode === formMode.EDIT || currentFormMode === formMode.DETAILS) {
            this.fetchUserDetails(userId);
        }

    }

    render() {
        let redirect = null;
        if (this.state.redirect) {
            redirect = (<Redirect to="/users" />);
        }

        let modalMessageWindow = null;
        if (this.state.modalMessage && this.state.modalMessage !== '') {
            modalMessageWindow = (
                <ModalMessage closeHandler={this.handleCloseModalMessage} header="Potwierdzenie">
                    <span>{this.state.modalMessage}</span>
                </ModalMessage>
            );
        }

        const currentFormMode = this.state.formMode;
        let pageTitle = null;
        if (currentFormMode === formMode.NEW) {
            pageTitle = "Nowy użytkownik";
        } else if (currentFormMode === formMode.EDIT) {
            pageTitle = "Edycja użytkownika";
        } else if (currentFormMode === formMode.DETAILS) {
            pageTitle = "Szczegóły użytkownika";
        }

        const readonly = currentFormMode === formMode.DETAILS;
        const user = { ...this.state.user };

        let firstNameErrs = null;
        if (this.state.errors.firstName && this.state.errors.firstName.length > 0) {
            firstNameErrs = this.state.errors.firstName.map((err, index) => {
                return (<span className="fieldError" key={`firstNameErr_${index}`}>{err}</span>);
            });
        }

        let lastNameErrs = null;
        if (this.state.errors.lastName && this.state.errors.lastName.length > 0) {
            lastNameErrs = this.state.errors.lastName.map((err, index) => {
                return (<span className="fieldError" key={`lastNameErr_${index}`}>{err}</span>);
            });
        }

        let errorSummary = null;
        if (!this.isFormValid()) {
            errorSummary = (<span className="errorSummary">Formularz zawiera błędy</span>);
        }

        let saveBtn = null;
        if (currentFormMode === formMode.NEW || currentFormMode === formMode.EDIT) {
            saveBtn = (<button className="action-btn" onClick={this.handleSave}>Zapisz</button>)
        }
        console.log(`UserForm.render() formMode: ${currentFormMode} readonly: ${readonly}`);
        return (
            <div className="form-container">
                {redirect}
                {modalMessageWindow}
                <h2> {pageTitle}</h2>
                <form>
                    <input type="hidden" name="user_id" value={user.id || ''}></input>

                    <label htmlFor="firstName">Imię:</label>
                    <input id="firstName" name="firstName" type="text" readOnly={readonly}
                        value={user.firstName || ''} onChange={this.handleFieldChange}></input>
                    {firstNameErrs}

                    <label htmlFor="lastName">Nazwisko:</label>
                    <input id="lastName" name="lastName" type="text" readOnly={readonly}
                        value={user.lastName || ''} onChange={this.handleFieldChange}></input>
                    {lastNameErrs}


                    <div className="form-actions-container">

                        {saveBtn}
                        <Link to="/users" className="action-btn">Anuluj</Link>
                    </div>
                    {errorSummary}
                </form >
            </div >
        );
    }

    handleSave = (event) => {
        const currentFormMode = this.state.formMode;
        const user = this.state.user;
        const formValid = this.validateForm();
        console.log(`UserForm.handleSave formMode: ${currentFormMode} formValid: ${formValid} user: ${JSON.stringify(user)}`);
        // alert(`UserForm.handleSave formMode: ${currentFormMode}`);
        event.preventDefault();
        if (!formValid) {
            return false;
        }
        let promise = null;
        let confirmMessage = null;
        if (currentFormMode === formMode.NEW) {
            // promise = axios.post(usersBaseUrl, user);
            promise = createUserCall(user);
            confirmMessage = "Pomyślnie dodano użytkownika";
        } else if (currentFormMode === formMode.EDIT) {
            // const userid = this.state.userId;
            // promise = axios.put(`${usersBaseUrl}/${userid}`, user);
            promise = updateUserCall(user);
            confirmMessage = "Pomyślnie zaktualizowano użytkownika";
        }
        promise.then(res => {
            this.setState({
                modalMessage: confirmMessage
            });
        })
            .catch(err => {
                console.log(err);
            });
        return false;
    }

    handleFieldChange = (event) => {
        const fieldName = event.target.name;
        const newVal = event.target.value;
        console.log(`handleFieldChange() field: ${fieldName} value: ${newVal}`);
        const user = { ...this.state.user }
        user[fieldName] = newVal;
        const errArray = this.validateField(newVal, fieldName);
        const errors = { ...this.state.errors };
        errors[fieldName] = errArray;
        this.setState({
            errors: errors,
            user: user
        });
    }

    validateField(value, fieldName) {
        const errArray = [];
        if (fieldName === 'firstName') {
            if (!value || value.trim() === '') {
                errArray.push('Pole "Imię" jest wymagane');
            } else if (value.length < 2) {
                errArray.push('Pole "Imię" musi zawierać przynajmniej 2 znaki');
            }
        }
        if (fieldName === 'lastName') {
            if (!value || value.trim() === '') {
                errArray.push('Pole "Nazwisko" jest wymagane');
            } else if (value.length < 3) {
                errArray.push('Pole "Nazwisko" musi zawierać przynajmniej 3 znaki');
            }
        }

        // console.log(`validateField() value: ${value} fieldName: ${fieldName} errors: ${JSON.stringify(errors)} `);
        return errArray;
    }

    validateForm() {
        let valid = true;
        const user = this.state.user;
        const errors = { ...this.state.errors };
        for (let field in user) {
            const fieldErrors = this.validateField(user[field], field);
            errors[field] = fieldErrors;
            if (fieldErrors.length > 0) {
                valid = false;
            }
        }
        this.setState({
            errors: errors
        })
        return valid;
    }

    isFormValid() {
        const errors = this.state.errors;
        for (let field in errors) {
            if (errors[field].length > 0) {
                console.log(`has errors for field: ${field}`);
                return false;
            }
        }
        return true;
    }

    fetchUserDetails = (userId) => {
        // const url = `${usersBaseUrl}/${userId}`;
        // console.log(`fetchUserDetails() userId: ${userId} url: ${url}`);
        // axios.get(url)
        getUserDetailsCall(userId)
            .then(result => {
                console.log(`fetchUserDetails() result: ${JSON.stringify(result.data)}`);
                this.setState({
                    user: result.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleCloseModalMessage = (event) => {
        this.setState({
            modalMessage: null,
            redirect: true
        });
    }
}

export default UserForm;