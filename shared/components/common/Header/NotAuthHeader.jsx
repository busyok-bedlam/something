import React, {Component} from "react";

export default class NotAuthHeader extends Component {


    render() {
        return (
            <div className="header__top-right">
                <button className="button button-signIn"> <i className='icon icon-user'/>Sign In</button>
            </div>
        );
    }
}

