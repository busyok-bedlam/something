import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import InventoryItem      from './InventoryItem.jsx';
import ModalController    from '../../../lib/ModalController';
import Scrollbar from './../../common/Scrollbar.jsx';

export default class Inventory extends Component {

    static propTypes = {
        inventory: PropTypes.array.isRequired,
        selectedItems: PropTypes.object.isRequired,
        isInventoryLoading: PropTypes.bool.isRequired,
        cbHandleUpdateInventory: PropTypes.func.isRequired,
        cbHandleSelectItem: PropTypes.func.isRequired,
        cbHandleSelectAll: PropTypes.func.isRequired,
    };

    __renderItems() {
        const {inventory, cbHandleSelectItem, selectedItems} = this.props;
        const list = [];
        inventory.forEach((item, key) => {
            let itemColor = undefined;
            if(item.tags && item.tags.length){
                item.tags.forEach(tag=>{
                    if(tag.color){
                        itemColor='#'+tag.color;
                    }
                })
            }
            list.push(
                <InventoryItem
                    key={key}
                    color={selectedItems[item._id] ? InventoryItem.type.INUSE : InventoryItem.type.GREEN}
                    itemPrice={item.itemData.price}
                    itemName={item.itemData.market_hash_name}
                    itemDescription={item.itemData.type}
                    itemColor={itemColor}
                    itemImage={`https://steamcommunity-a.akamaihd.net/economy/image/${item.itemData.icon_url}`}
                    onClick={()=>cbHandleSelectItem(item)}
                />
            );
        });
        return list;
    }

    render() {
        const {cbHandleUpdateInventory, cbHandleSelectAll} = this.props;
        return (
            <div className='invent__container'>
                <div className="invent__header">
                    <button
                        onTouchTap={cbHandleSelectAll}
                        className="button-link">
                        Select All
                    </button>
                    <button
                        onTouchTap={cbHandleUpdateInventory}
                        className="invent__reload">
                        <i className="icon icon-reload"/>
                    </button>
                    <button className="button button-green"
                            onClick={() => ModalController.openModal('DepositModal')}>
                        Deposit
                    </button>
                </div>
                <div className="invent__wrapper" style={{height: '380px'}}>
                    <Scrollbar>
                        <div style={{marginRight: '20px'}}>
                            {this.__renderItems()}
                            {/*<InventoryItem*/}
                                {/*color={InventoryItem.type.INUSE}/>*/}
                        </div>
                    </Scrollbar>
                </div>
            </div>
        );
    }
}