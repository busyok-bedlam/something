import React, {Component} from "react";

import Form from './../Inputs/form';
import Input from '././../Inputs/input';
import Button from './../Inputs/button';
import validate from './../Inputs/validate.js';
import {LoadingScreen} from '../../../lib/LoadingScreen';
import {toast} from 'react-toastify';

export default class RecoveryPassword extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            LoadingScreen.open();
            const {userActions} = this.props;
            const email = event.target.email.value;
            const message = await userActions.passwordForgot(email);
            toast(message);
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        } finally {
            LoadingScreen.close();
        }
    };

    render() {
        return (
            <div className="recovery-pass modal-window">
                <div
                    className="row justify-content-center modal-window__header">
                    <div className="col-lg-6">
                        <img src="static/images/logo.png" alt=""/>
                        <h2 className="modal-header">Password recovery</h2>
                    </div>
                </div>
                <Form ref={c => {
                    this.form = c
                }} onSubmit={this.handleSubmit}
                      className="row justify-content-around">
                    <fieldset>
                        <Input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            className="input-border-bottom"
                            validations={[validate.required, validate.email]}
                        />
                        <Button className="button green-button">Confirm
                            recovery</Button>
                    </fieldset>
                </Form>
            </div>
        );
    }
}

