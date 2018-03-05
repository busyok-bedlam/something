import React, {Component} from "react";

export default class User extends Component {
    render() {
        return (
            <div className="user">
                <span className="avatar" style={{backgroundImage: 'url("./static/images/user.png")'}}/>
                <span className="user__level">11</span>
                <span className="name">ConorMcGregor:</span>
            </div>
        );
    }
}
