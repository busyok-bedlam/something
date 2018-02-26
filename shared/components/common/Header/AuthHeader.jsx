import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import ModalController    from '../../../lib/ModalController';

export default class AuthHeader extends Component {

    static propTypes = {
      cbHandleLogout: PropTypes.func.isRequired,
        displayName: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    };

    render() {
        const {cbHandleLogout, displayName, avatar} = this.props;
        return (
            <div className="header__right-auth">
                <div className="header__right-user" onClick={()=>ModalController.openModal('AccountModal')}>
                    <div className="avatar"
                         style={{backgroundImage: `url(${avatar})`}}/>
                    <div
                        className="name">{displayName} </div>
                </div>
                <button
                    onClick={cbHandleLogout}
                    className="icon icon-logout"
                />
            </div>
        );
    }
}

