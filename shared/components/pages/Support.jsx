import React, {Component} from "react";

import Form from './../common/Inputs/form';
import Input from '././../common/Inputs/input';
import Textarea from '././../common/Inputs/textarea';
import Button from './../common/Inputs/button';
import Social from './../common/Social.jsx';
import validate from './../common/Inputs/validate.js'
import {LoadingScreen} from '../../lib/LoadingScreen';
import {toast} from 'react-toastify';

export default class Support extends Component {
    state = {
        success: false
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            LoadingScreen.open();
            const {sendSupport} = this.props;
            const {email, steamLink, text} = event.target;
            console.log(email, steamLink, text);
            let req = await sendSupport({
                email: email.value,
                steamLink: steamLink.value,
                text: text.value
            });
            this.setState({success: req.success})
            email.value = '';
            steamLink.value = '';
            text.value = '';
            // toast('Submitted');
        } catch (error) {
            console.error(error);
            toast(error.message || error.toString());
        } finally {
            LoadingScreen.close();
        }
    };

    render() {
        let {success} = this.state;
        let userSteamLink = this.props.user.profileUrl;
        return (
            <div className="support page-container">
                <h2 className="page-header">Support</h2>
                {
                    (success)
                        ? <h3>Thanks for your request!</h3>
                        : <Form ref={c => {
                            this.form = c
                        }} onSubmit={this.handleSubmit} className="row">
                            <Input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                className="input-float"
                                required='true'
                                validations={[validate.required, validate.email]}
                            />
                            <Input
                                type="text"
                                name="steamLink"
                                placeholder="Steam link"
                                className="input-float valid"
                                required='true'
                                readOnly={true}
                                value={userSteamLink}
                                validations={[validate.required, validate.steamLink]}
                            />
                            <Textarea cols="30"
                                      rows="10"
                                      name="text"
                                      className="input-float input-float-textarea"
                                      required='true'
                                      placeholder="Message"
                                      validations={[validate.required]}
                            />
                            <div className="support__buttons">
                                <Social/>
                                <Button className="button">send
                                    message</Button>
                            </div>
                        </Form>
                }
            </div>
        );
    }
}
