import React, {Component} from "react";
import NavLink from './NavLink.jsx';

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <NavLink to='/' className='footer__logo'>
                        <img src="static/images/logo.png" alt=""/>
                        <div>© 2018. All rights reserved</div>
                    </NavLink>
                    <nav className="footer__nav">
                        <NavLink to='/shop'>Shop</NavLink>
                        <NavLink to='/top-players'>Top players</NavLink>
                        <NavLink to='/faq'>FAQ</NavLink>
                        <NavLink to='/support'>Support</NavLink>
                        <NavLink to='/privacy-policy'>Privacy policy</NavLink>
                    </nav>
                    <div className="footer__social">
                        <a href="" target='_blank' className='facebook'><i className='icon-facebook' /></a>
                        <a href="" target='_blank' className='twitter'><i className='icon-twitter' /></a>
                        <a href="" target='_blank' className='steam'><i className='icon-steam' /></a>
                    </div>
                </div>
            </footer>
        );
    }
}
