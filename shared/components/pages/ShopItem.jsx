import React, {Component} from 'react';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';

export default class ShopItem extends Component {

    static propTypes = {
        iconUrl: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    }

    render() {
        const {iconUrl, price, name, selected, onClick} = this.props;
        return (
            <div onClick={onClick} className={`weapon__item ${selected && 'weapon__item-selected'}`}>
                <div className="weapon__content">
                    <div className="img">
                        <img src={`https://steamcommunity-a.akamaihd.net/economy/image/${iconUrl}`} alt={`${name} | ${price}`} />
                    </div>
                    <div className="name">{name}</div>
                    <div className="desc">(Factory New)</div>
                    <div className="price">
                        <i className="icon-poker-piece" />
                        {price.toFixed()}
                    </div>
                </div>
                <div className="weapon__count">x2</div>
            </div>
        );
    }
}

