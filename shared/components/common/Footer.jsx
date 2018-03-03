import React, {Component} from "react";
import NavLink from './NavLink.jsx';
import Social from './Social.jsx';

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <NavLink to='/' className='footer__logo'>
                        <object className='logoSVG' type="image/svg+xml" data="static/images/logo.svg">
                            Your browser does not support SVG.
                        </object>
                        <div>© 2018. All rights reserved</div>
                    </NavLink>
                    <nav className="footer__nav">
                        <NavLink to='/shop'>Shop</NavLink>
                        <NavLink to='/top-players'>Top players</NavLink>
                        <NavLink to='/faq'>FAQ</NavLink>
                        <NavLink to='/support'>Support</NavLink>
                        <NavLink to='/privacy-policy'>Privacy policy</NavLink>
                    </nav>
                    <Social />
                </div>
            </footer>
        );
    }
}
