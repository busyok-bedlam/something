import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class InventoryItem extends Component {
    static type = {
        PINK: 'invent__item invent__item-pink',
        GREEN: 'invent__item invent__item-green',
        INUSE: 'invent__item invent__item-inuse',
        DEFAULT: 'invent__item',
    };

    static propTypes = {
        color: PropTypes.oneOf([
            InventoryItem.type.GREEN,
            InventoryItem.type.PINK,
            InventoryItem.type.DEFAULT,
        ]),
        itemPrice: PropTypes.number,
        itemName: PropTypes.string,
        itemDescription: PropTypes.string,
        itemColor: PropTypes.string,
        itemImage: PropTypes.string,
        selected: PropTypes.bool,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        color: InventoryItem.type.DEFAULT,
        itemPrice: 0,
        itemName: 'No name',
        itemDescription: 'No description',
        itemColor: '#ffffff',
        itemImage: '/static/images/weapon.png',
        selected: false,
        onClick: () => null,
    };

    render() {
        let {
            color,
            itemPrice,
            itemName,
            itemDescription,
            itemColor,
            itemImage,
            selected,
            onClick,
        } = this.props;

        return (
            <div className={color + (selected ? ' active' : '')}
                 onClick={onClick}>
                <div className='invent__content'>
                    <div className="img-wrap">
                        <div className='shadow'
                             style={{backgroundImage: `radial-gradient(${itemColor} -100%, transparent 65%)`}}/>
                        <img
                            src={itemImage}
                            alt=""/>
                    </div>
                    <div>
                        <div className="price">
                            $ {itemPrice}</div>
                        <div className="name"
                             style={{color: itemColor}}>{itemName}</div>
                        <div
                            className="desc">{itemDescription}</div>
                    </div>
                </div>
            </div>
        );
    }
}

InventoryItem.propTypes = {
    color: PropTypes.string
};