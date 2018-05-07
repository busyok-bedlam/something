import React from 'react';
// import fetch from 'isomorphic-fetch';
import RaisedButton from 'material-ui/RaisedButton';
import api from "../../api";

export default class Items extends React.Component {
    updateItems() {
        api.marketplace.updateItems();
    }

    updateInventory() {
        api.marketplace.updateInventory();
    }

    render() {
        return (
            <div>
                <ul>
                    <li style={{'listStyleType': 'none'}}>
                        <RaisedButton
                            className="margin"
                            label="update items"
                            primary={true}
                            onTouchTap={this.updateItems}
                        />
                    </li>
                    <li style={{'listStyleType': 'none'}}>
                        <RaisedButton
                            className="margin"
                            label="update inventory"
                            primary={true}
                            onTouchTap={this.updateInventory}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}
