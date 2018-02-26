import React, {Component} from "react";
import Scrollbar from './../Scrollbar.jsx';
import Item from './LeftSidebarItem.jsx';

export default class LeftSidebar extends Component {

    render() {
        return (
            <div>
                <div className='left-col__total'>
                    <div><i className="icon icon-users"/> <span>123</span></div>
                    <div>$ 20 000.22</div>
                </div>
                <div className="left-col__history">
                    <div className="left-col__head">
                        <div>USERNAME</div>
                        <div>CASHOUT</div>
                        <div>BET</div>
                        <div>WINS</div>
                    </div>
                    <div className="left-col__wrapper">
                        <Scrollbar>
                            <Item />
                            <Item />
                            <Item />
                        </Scrollbar>
                    </div>
                </div>
            </div>
        );
    }
}

