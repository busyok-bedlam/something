import React, {Component} from "react";

export default class LangHeader extends Component {

    render() {
        return (
            <div className="header__lang">
                <i className="icon-lang icon-eng current" />
                <i className="icon-lang icon-fr" />
                <i className="icon-lang icon-port" />
            </div>
        );
    }
}

