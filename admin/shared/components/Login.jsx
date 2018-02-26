import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import api from "../api/index";


export  default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: null,
            password: null,
            message: ''
        };
    }

    async signIn() {
        try {
            const {userName, password} = this.state;
            const res = await api.admin.signIn({userName, password});
            if (res && res.dataUser) {
                location.href = '/users';
            } else {
                throw new Error('SignIn error. No user data');
            }
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }
        const data = {
            userName: this.state.userName,
            password: this.state.password,
        };
    }

    async signUp() {
        try {
            const {adminActions} = this.props;
            const {userName, password} = this.state;
            const res = await api.admin.signUp({userName, password});
            if (res && res.dataUser) {
                adminActions.successLoginUser(res.dataUser);
                location.href = '/'
            } else {
                throw new Error('SignIn error. No user data');
            }
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        }

        const data = {
            login: this.state.login,
            password: this.state.password,
        };
    }

    handleInput(e) {
        const data = {};
        data[e.target.name] = e.target.value;
        this.setState(data);
    }

    render() {
        const message = this.state.message;
        return (
            <div className="login-page">
                <label>{message}</label> <br />
                <TextField
                    name="userName"
                    floatingLabelText="Login"
                    onChange={::this.handleInput}
                /><br />
                <br />
                <TextField
                    name="password"
                    onChange={::this.handleInput}
                    floatingLabelText="Password"
                    type="password"/>
                <br />
                <RaisedButton
                    label="Sign In"
                    primary={true}
                    style={{margin: 12}}
                    onTouchTap={::this.signIn}/>
                <RaisedButton
                    label="Sign Up"
                    primary={true}
                    style={{margin: 12}}
                    onTouchTap={::this.signUp}/>
            </div>
        );
    }
}
