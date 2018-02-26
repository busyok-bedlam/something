import React, {Component} from "react";
import NavLink from './NavLink.jsx';

export default class Sidebar extends Component {
    state = {
        sideNav: false
    };

    showSideNav() {
        this.setState({
            sideNav: !this.state.sideNav
        });
    }

    render() {
        const {user} = this.props;
        if(!user.isAuth){
            return null;
        }
        return (
            <div className="col-lg-3">
                <aside
                    className={(this.state.sideNav) ? "sidebar open" : "sidebar"}>
                    <button className="sidebar__toggle"
                            onClick={this.showSideNav.bind(this)}>
                        <svg width="15px" height="25px" viewBox="0 0 50 80"
                             xmlSpace="preserve">
                            <polyline fill="none" stroke="#FFFFFF"
                                      strokeWidth="1" strokeLinecap="round"
                                      strokeLinejoin="round"
                                      points="45.63,75.8 0.375,38.087 45.63,0.375 "/>
                        </svg>
                    </button>
                    <div className="sidebar__wrapper">
                        <NavLink to='/add-funds'>
                            <div className="sidebar__a">
                                <i className="icon side-add"/>
                                <div>Add funds</div>
                            </div>
                        </NavLink>
                        <NavLink to='/' onlyActiveOnIndex>
                            <div className="sidebar__a">
                                <i className="icon side-comp"/>
                                <div>Live competition</div>
                            </div>
                        </NavLink>
                        <NavLink to='/wins'>
                            <div className="sidebar__a">
                                <i className="icon side-wins"/>
                                <div>My wins</div>
                            </div>
                        </NavLink>
                        <NavLink to='/history'>
                            <div className="sidebar__a">
                                <i className="icon side-history"/>
                                <div>My history</div>
                            </div>
                        </NavLink>
                        <NavLink to='/user'>
                            <div className="sidebar__a">
                                <i className="icon side-details"/>
                                <div>User details</div>
                            </div>
                        </NavLink>
                        <NavLink to='/transaction'>
                            <div className="sidebar__a">
                                <i className="icon side-transaction"/>
                                <div>Transaction</div>
                            </div>
                        </NavLink>
                        <NavLink to='/request-payout'>
                            <div className="sidebar__a">
                                <i className="icon side-payout"/>
                                <div>Request payout</div>
                            </div>
                        </NavLink>
                        <NavLink to='/7'>
                            <div className="sidebar__a">
                                <i className="icon side-share"/>
                                <div>Share</div>
                            </div>
                        </NavLink>
                    </div>
                </aside>
                <FBPage appId="TaskforceDigital"
                        href="https://www.facebook.com/TaskforceDigital"
                        tabs={[]}
                        smallHeader="true"
                        hideCover={'true'}/>
                <a href="" className="sidebar__banner"><img
                    src="static/banners/banner2" alt=""/></a>
                <a href="" className="sidebar__banner"><img
                    src="static/banners/banner3" alt=""/></a>
                <a href="" className="sidebar__banner"><img
                    src="static/images/icon-paysera.png" alt=""/></a>
            </div>
        )
    }
}