import React, {Component} from "react";

export default class AddFundsItem extends Component {

    render() {
        return (
            <div className="add-funds__item">
                <div>
                    <i className="icon-coin"/>
                    <span>{this.props.value}</span>
                </div>
            </div>
        );
    }
}

