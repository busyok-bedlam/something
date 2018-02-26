import React, {Component} from "react";

export default class LeftSidebarItem extends Component {
    render() {
        return (
            <div className="left-col__user">
                <div>
                    <div className="avatar" style={{backgroundImage: 'url(/static/images/user.png)'}}/>
                    <div>CarryMid</div>
                </div>
                <div>-</div>
                <div>$17</div>
                <div>
                    <img src="static/images/logo.png" alt=""/>
                </div>
            </div>
        );
    }
}

