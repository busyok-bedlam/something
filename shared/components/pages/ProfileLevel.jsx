import React, {Component} from "react";
import Progress from 'react-progressbar';
import ModalController from '../../lib/ModalController';
import PropTypes from 'prop-types';

export default class ProfileLevel extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    render() {
        let {avatarFull, displayName, level, balance, xp} = this.props.user;
        let colorLevel = '';
        const levelMaximum = 700;
        switch (true) {
            case (level < 49):
                colorLevel = "profile__user";
                break;
            case (level < 59):
                colorLevel = "profile__user profile__user-level-1";
                break;
            case (level < 69):
                colorLevel = "profile__user profile__user-level-2";
                break;
            case (level < 79):
                colorLevel = "profile__user profile__user-level-3";
                break;
            case (level < 99):
                colorLevel = "profile__user profile__user-level-4";
                break;
            default:
                colorLevel = "profile__user profile__user-level-5";
                break;
        }
        return (
            <div className={colorLevel}>
                <div className="profile__level">{level}<i className='icon-fire'/></div>
                <div className="profile__name">{displayName}</div>
                <div className="avatar"
                     style={{backgroundImage: `url(${avatarFull})`}}/>
                <div className="profile__xp">
                    XP: <span>{(xp) ? xp : 0}</span>/{levelMaximum}
                    <Progress completed={(xp > 0) ? Math.round(xp / levelMaximum  * 100) : 0}/>
                </div>
                <div className="profile__balance">Balance: <i className='icon-poker-piece'/> <span>{balance}</span></div>
                <button
                    onClick={() => ModalController.openModal('DepositModal')}
                    className="button mobile-hide">Deposit
                </button>
            </div>
        );
    }
}
