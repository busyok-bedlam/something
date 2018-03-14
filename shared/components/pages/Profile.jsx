import React, {Component} from "react";

import Form from './../common/Inputs/form';
import Input from '././../common/Inputs/input';
import Button from './../common/Inputs/button';
import validate from './../common/Inputs/validate.js';
import Progress from 'react-progressbar';
import ModalController from '../../lib/ModalController';
import {LoadingScreen} from '../../lib/LoadingScreen';
import {toast} from 'react-toastify';

export default class Profile extends Component {
    render() {
        return (
            <div className="profile">
                <h2 className="page-header">Profile</h2>
                <div className="container">
                    <div className="profile__user profile__user-level-1">
                        <div className="profile__level">
                            71
                            <i className='icon-fire'/>
                        </div>
                        <div className="profile__name">Adam Satarambell</div>
                        <div className="avatar"
                             style={{backgroundImage: `url(npm i )`}}/>
                        <div className="profile__xp">
                            XP: <span>350</span>/700
                            <Progress completed={75} />
                        </div>
                        <div className="profile__balance">Balance: <i className='icon-poker-piece'/> <span>1123</span></div>
                        <button
                            onClick={() => ModalController.openModal('DepositModal')}
                            className="button mobile-hide">Deposit</button>
                    </div>
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
                                type="email"
                                name="email"
                                placeholder="Steam link"
                                className="input-float"
                                required='true'
                                validations={[validate.required]}
                            />
                            <div className="profile__buttons">
                                <button className='button button-gray'>View my link</button>
                                <Button className="button button-green">Save</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
