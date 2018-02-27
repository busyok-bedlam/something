import React, {Component} from "react";
import NavLink from './NavLink.jsx';

export default class Footer extends Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <NavLink to='/' className='button-game'>
                        <img src="static/images/logo.png" alt=""/>
                        <div>© 2018. All rights reserved</div>
                    </NavLink>
                    <nav className="header__wrap-right">
                        <NavLink to='/shop'>Shop</NavLink>
                        <NavLink to='/top-players'>Top players</NavLink>
                        <NavLink to='/faq'>FAQ</NavLink>
                        <NavLink to='/support'>Support</NavLink>
                        <NavLink to='/privacy-policy'>Privacy policy</NavLink>
                    </nav>
                    <div className="social"></div>
                </div>
            </header>
        );
    }
}
