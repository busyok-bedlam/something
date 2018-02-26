import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import InventoryItem      from './InventoryItem.jsx';
import Scrollbar from './../../common/Scrollbar.jsx';

export default class InGameInventory extends Component {

    static propTypes = {
        selectedItems: PropTypes.object.isRequired,
        cbHandleDeselectItem: PropTypes.func.isRequired,
        cbHandleDeselectAll: PropTypes.func.isRequired,
        cbHandleWithdraw: PropTypes.func.isRequired,
    };

    __renderItems() {
        const {selectedItems, cbHandleDeselectItem} = this.props;
        const list = [];

        for (let id in selectedItems) {
            const item = selectedItems[id];
            let itemColor = undefined;
            if (item.tags && item.tags.length) {
                item.tags.forEach(tag => {
                    if (tag.color) {
                        itemColor = '#' + tag.color;
                    }
                })
            }
            list.push(
                <InventoryItem
                    key={id}
                    color={InventoryItem.type.PINK}
                    itemPrice={item.itemData.price}
                    itemName={item.itemData.market_hash_name}
                    itemDescription={item.itemData.type}
                    itemColor={itemColor}
                    itemImage={`https://steamcommunity-a.akamaihd.net/economy/image/${item.itemData.icon_url}`}
                    onClick={() => cbHandleDeselectItem(id)}
                />
            );
        }

        return list;
    };

    render() {
        const {
            selectedItems,
            cbHandleDeselectAll,
            cbHandleWithdraw,
        } = this.props;
        return (
            <div className='invent__container'>
                <div className="invent__header">
                    <button
                        onTouchTap={cbHandleDeselectAll}
                        className="button-link">
                        Deselect All
                    </button>
                    <button className="invent__reload">
                        <i className="icon icon-reload"/>
                    </button>
                    <button
                        onTouchTap={cbHandleWithdraw}
                        disabled={!Object.keys(selectedItems).length}
                        className="button button-pink">
                        Withdraw
                    </button>
                </div>
                <div className="invent__wrapper" style={{height: '380px'}}>
                    <Scrollbar>
                        <div style={{marginRight: '20px'}}>
                            {this.__renderItems()}
                        </div>
                    </Scrollbar>
                </div>
            </div>
        );
    }
}