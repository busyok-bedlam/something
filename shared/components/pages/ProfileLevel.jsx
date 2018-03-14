import React, {Component} from "react";
import Progress from 'react-progressbar';
import ModalController from '../../lib/ModalController';
import {LoadingScreen} from '../../lib/LoadingScreen';
import {toast} from 'react-toastify';

export default class ProfileLevel extends Component {
    render() {

    let {avatarFull, displayName} = this.props.user;
        return (
            <div className="profile__user profile__user-level-1">
                <div className="profile__level">
                    71
                    <i className='icon-fire'/>
                </div>
                <div className="profile__name">${displayName}</div>
                <div className="avatar"
                     style={{backgroundImage: `url(${avatarFull})`}}/>
                <div className="profile__xp">
                    XP: <span>350</span>/700
                    <Progress completed={75}/>
                </div>
                <div className="profile__balance">Balance: <i className='icon-poker-piece'/> <span>1123</span></div>
                <button
                    onClick={() => ModalController.openModal('DepositModal')}
                    className="button mobile-hide">Deposit
                </button>
            </div>
        );
    }
}
