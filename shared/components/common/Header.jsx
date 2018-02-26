import React, {Component} from "react";
import PropTypes          from 'prop-types';
import NavLink            from './NavLink.jsx';
import LangHeader         from './Header/LangHeader.jsx';
import AuthHeader         from './Header/AuthHeader.jsx';
import NotAuthHeader      from './Header/NotAuthHeader.jsx';
import ModalController    from '../../lib/ModalController';

export default class Header extends Component {

    static propTypes = {
        isAuth: PropTypes.bool.isRequired,
        displayName: PropTypes.string,
        avatar: PropTypes.string,
        cbHandleLogout: PropTypes.func.isRequired,
    };

    state = {
        auth: false
    };

    render() {
        const {
            isAuth,
            displayName,
            avatar,
            cbHandleLogout,
        } = this.props;

        return (
            <header className = "header">
                <div className="header__top container">
                    <div className="header__top-left">
                        <span>15:67:67</span>
                        <span>dropdown</span>
                    </div>
                    <div className="header__top-right">
                        {
                            (isAuth) ?
                                <AuthHeader
                                    cbHandleLogout={cbHandleLogout}
                                    displayName={displayName}
                                    avatar={avatar}
                                /> :
                                <NotAuthHeader/>
                        }
                    </div>
                </div>
                <div className="header__wrap">
                    <div className="container">
                        <nav className="header__wrap-left">
                            <div className='logo'>
                                <img src="static/images/logo.png" alt=""/>
                            </div>
                            <NavLink to='/' className='button-game'>
                                Roulette
                                <div className="link-chip">7532</div>
                            </NavLink>
                            <NavLink to='/crash' className='button-game'>
                                Crash
                                <div className="link-chip">7532</div>
                            </NavLink>
                        </nav>
                        <nav className="header__wrap-right">
                            <NavLink to='/shop'>Shop</NavLink>
                            <NavLink to='/top-players'>Top players</NavLink>
                            <NavLink to='/faq'>FAQ</NavLink>
                            <NavLink to='/support'>Support</NavLink>
                            <NavLink to='/privacy-policy'>Privacy policy</NavLink>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}
