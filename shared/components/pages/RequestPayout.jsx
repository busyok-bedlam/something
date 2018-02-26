import React, {Component} from "react";
import Form from './../common/Inputs/form';
import Input from '././../common/Inputs/input';
import Button from './../common/Inputs/button';
import validate from './../common/Inputs/validate.js'
import {LoadingScreen} from './../../lib/LoadingScreen';
import {toast} from 'react-toastify';

export default class RequestPayout extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            LoadingScreen.open();
            const {userActions} = this.props;
            await userActions.signIn({
                payout: event.target.requestPayout.value
            });
        } catch (error) {
            console.error(error);
            toast(error.message || error.toString());
        } finally {
            LoadingScreen.close();
        }
    };

    render() {
        // const {user} = this.props;
        return (
            <div className="request-payout">
                <Form ref={c => {
                    this.form = c
                }} onSubmit={this.handleSubmit} className="row">
                    <div className="col-lg-8">
                        <h2 className="main-header">Request payout</h2>
                        <div>Lorem ipsum dolor sit amet, consectetur
                            adipisicingelit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut
                        </div>
                        <h3>Your balance</h3>
                        <div className="request-payout__balance">
                            <i className="icon-coin"/> 100 000
                        </div>
                    </div>
                    <div className="w-100"/>
                    <div className="col-sm-8 col-md-6 col-lg-4">
                        <Input
                            type="number"
                            min="0"
                            // max={user.balance}
                            name="requestPayout"
                            placeholder="Type"
                            className="input-coin"
                            validations={[validate.required, validate.bet]}
                        />
                    </div>
                    <div className="col-sm-4 col-md-5 col-lg-3">
                        <Button className="button green-button">Request
                            payout</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

