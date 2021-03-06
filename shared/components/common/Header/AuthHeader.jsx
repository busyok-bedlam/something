import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NavLink from './../NavLink.jsx';
import ModalController from '../../../lib/ModalController';

export default class AuthHeader extends Component {

    static propTypes = {
        cbHandleLogout: PropTypes.func.isRequired,
        displayName: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired
    };

    render() {
        const {cbHandleLogout, displayName, avatar, balance} = this.props;
        return (
            <div className="header__top-right">
                <div className="user">
                    <NavLink to='/profile'>
                        <div className="avatar"
                             style={{backgroundImage: `url(${avatar})`}}/>
                        <div>
                            <div
                                className="name">{displayName}
                            </div>
                            <div className="coin">{balance}</div>
                        </div>
                    </NavLink>
                </div>
                <button
                    onClick={() => ModalController.openModal('DepositModal')}
                    className="button mobile-hide">Deposit</button>
                <button
                    onClick={cbHandleLogout}
                    className="button button-gray"
                ><i className='icon-logout'/>Log Out
                </button>
            </div>
        );
    }
}

