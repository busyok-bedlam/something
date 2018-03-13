import React, {Component} from 'react';
import 'react-select/dist/react-select.css';

export default class ShopItem extends Component {
    render() {
        return (
            <div className='weapon__item'>
                <div className="weapon__content">
                    <div className="img">
                        <img src="./static/images/weapon.png" alt="" />
                    </div>
                    <div className="name">AK-47 Bloodsport</div>
                    <div className="desc">(Factory New)</div>
                    <div className="price">
                        <i className="icon-poker-piece" />
                        7532
                    </div>
                </div>
                <div className="weapon__count">x2</div>
            </div>
        );
    }
}

