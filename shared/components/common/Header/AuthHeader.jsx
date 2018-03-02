import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NavLink from './../NavLink.jsx';

export default class AuthHeader extends Component {

    static propTypes = {
        cbHandleLogout: PropTypes.func.isRequired,
        displayName: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    };

    render() {
        const {cbHandleLogout, displayName, avatar} = this.props;
        return (
            <div className="header__top-right">
                    <div className="user">
                        <NavLink to='/user'>
                        <div className="avatar"
                             style={{backgroundImage: `url('./static/images/user.png')`}}/>
                        {/*style={{backgroundImage: `url(${avatar})`}}/>*/}
                        <div>
                            <div
                                className="name">{displayName}vdkjvdlkjdvljvdkjkdvdjklvd
                            </div>
                            <div className="coin">1123</div>
                        </div>
                        </NavLink>
                    </div>
                <button className="button mobile-hide">Deposit</button>
                <button
                    onClick={cbHandleLogout}
                    className="button button-gray"
                ><i className='icon-logout'/>Log Out
                </button>
            </div>
        );
    }
}

