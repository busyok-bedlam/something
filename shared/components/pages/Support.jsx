import React, {Component} from "react";

import Form from './../common/Inputs/form';
import Input from '././../common/Inputs/input';
import Textarea from '././../common/Inputs/textarea';
import Button from './../common/Inputs/button';
import validate from './../common/Inputs/validate.js'
import {LoadingScreen} from '../../lib/LoadingScreen';
import {toast}    from 'react-toastify';

export default class Support extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            LoadingScreen.open();
            const {userActions} = this.props;
            const {name, email, emailConfirm, caption, text} = event.target;
            await userActions.sendSupportRequest({
                name: name.value,
                email: email.value,
                emailConfirm: emailConfirm.value,
                caption: caption.value,
                text: text.value
            });
            name.value = '';
            email.value = '';
            emailConfirm.value = '';
            caption.value = '';
            text.value = '';
            toast('Submitted');
        } catch (error) {
            console.error(error);
            alert(error.message || error.toString());
        } finally {
            LoadingScreen.close();
        }
    };

    render() {
        return (
            <div className="support">
                <Form ref={c => {
                    this.form = c
                }} onSubmit={this.handleSubmit} className="row">
                    <div className="col-lg-8">
                        <h2 className="main-header">Support</h2>
                        <div>Lorem ipsum dolor sit amet, consectetur
                            adipisicingelit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim
                        </div>
                    </div>
                    <div className="w-100"/>
                    <div className="col-sm-8 col-lg-4 m-t">
                        <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="input-border-bottom"
                            validations={[validate.required, validate.hasNumber]}
                        />
                    </div>
                    <div className="w-100"/>
                    <div className="col-sm-8 col-lg-4">
                        <Input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            className="input-border-bottom"
                            validations={[validate.required, validate.email, validate.isEqualMail]}
                        />
                    </div>
                    <div className="col-sm-8 col-lg-4">
                        <Input
                            type="email"
                            name="emailConfirm"
                            placeholder="Confirm E-mail"
                            className="input-border-bottom"
                            validations={[validate.required, validate.email, validate.isEqualMail]}
                        />
                    </div>
                    <div className="w-100"/>
                    <div className="col-sm-8 col-lg-4">
                        <Input
                            type="text"
                            name="caption"
                            placeholder="Problem caption"
                            className="input-border-bottom"
                            validations={[validate.required]}
                        />
                    </div>
                    <div className="w-100"/>
                    <div className=" col-sm-12 col-lg-8">
                        <Textarea cols="30"
                                  rows="10"
                                  name="text"
                                  className="textarea"
                                  placeholder="Problems details"
                                  validations={[validate.required]}
                        />
                    </div>
                    <div className="w-100"/>
                    <div className="col-md-8">
                        <Button className="button green-button">send
                            message</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

