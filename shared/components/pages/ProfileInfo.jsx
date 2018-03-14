import React, {Component} from "react";

import Form from './../common/Inputs/form';
import Input from '././../common/Inputs/input';
import Button from './../common/Inputs/button';
import validate from './../common/Inputs/validate.js';
import {LoadingScreen} from '../../lib/LoadingScreen';
import {toast} from 'react-toastify';


export default class ProfileInfo extends Component {
    state = {
      steamLink: ''
    };

    openProfileWindow = () => {
        window.open(`https://steamcommunity.com/profiles/${this.props.user.id}/tradeoffers/privacy#trade_offer_access_url`);
    };

    handleSubmit = e => {
      e.preventDefault();
        const linkPattern = new RegExp('(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+');
        if (linkPattern.test(this.state.steamLink)) {
            alert('success')
        } else {
            alert('fall')
        }
    };

    onChange = e => {
      this.setState({
          [e.target.name]: e.target.value
      });
    };

    handleClick () {
        console.log(this)
    }

    render() {
        let {steamLink} = this.state;

        return (
            <div className="profile__info">
                <div className="profile__header">
                    <button className="header__bottom-right-link active">All</button>
                    <button className="header__bottom-right-link">Roulette</button>
                    <button className="header__bottom-right-link">Crash</button>
                </div>
                <div className="top-players__total">
                    <div>
                        <h3>2333</h3>
                        <span>wins</span></div>
                    <div>
                        <h3>100 000</h3>
                        <span>losses</span></div>
                    <div>
                        <h3>759</h3>
                        <span>profit</span></div>
                </div>
                <Form ref={c => {
                    this.form = c
                }} onSubmit={this.handleSubmit} className="row">
                    <Input
                        type="text"
                        name="steamLink"
                        placeholder="Steam link"
                        className="input-float"
                        required='true'
                        value={steamLink}
                        onChange={this.onChange}
                        validations={[validate.required, validate.tradeLink]}
                    />
                    <div className="profile__buttons">
                        <div className='button button-gray' onClick={this.openProfileWindow}>View my link</div>
                        <Button className="button button-green">Save</Button>
                    </div>
                </Form>
            </div>
        );
    }
}
