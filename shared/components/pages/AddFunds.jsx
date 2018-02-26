import React, {Component} from "react";
import AddFundsItem from './AddFundsItem.jsx';
import Form from './../common/Inputs/form';
import Input from '././../common/Inputs/input';
import Button from './../common/Inputs/button';
import validate from './../common/Inputs/validate.js'
import {LoadingScreen} from './../../lib/LoadingScreen';
import {toast} from 'react-toastify';

export default class AddFunds extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            LoadingScreen.open();
            const {userActions} = this.props;
            await userActions.signIn({
                funds: event.target.addFunds.value
            });
        } catch (error) {
            console.error(error);
            toast(error.message || error.toString());
        } finally {
            LoadingScreen.close();
        }
    };

    render() {
        let value = [5, 10, 15, 20, 25, 50, 100];
        let fundsBlocks = value.map((item) => <AddFundsItem value={item}/>);

        return (
            <div className="add-funds">
                <h2 className="main-header">Add funds</h2>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicingelit,
                    sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim
                </div>
                <Form ref={c => {
                    this.form = c
                }} onSubmit={this.handleSubmit} className="add-funds__form">
                    <Input
                        min="1"
                        type="number"
                        name="addFunds"
                        placeholder="Type funds"
                        className="input-coin"
                        validations={[validate.required, validate.bet]}
                    />
                    <Button className="button green-button">Add funds</Button>
                </Form>
                <div className="add-funds__wrapper">
                    {fundsBlocks}
                </div>
            </div>
        );
    }
}

