import React, {Component} from 'react';
import Scrollbar          from './../common/Scrollbar.jsx';
import ShopItem           from './ShopItem.jsx';
import Cart               from './Cart.jsx';
import PropTypes from 'prop-types';

export default class Shop extends Component {

    static propTypes = {
        inventory: PropTypes.array.isRequired,
        selectedItems: PropTypes.object.isRequired,
        loadMarketplaceInventory: PropTypes.func.isRequired,
        selectItem: PropTypes.func.isRequired,
        deselectItem: PropTypes.func.isRequired,
        createWithdrawOffer: PropTypes.func.isRequired,
        handleSearch: PropTypes.func.isRequired,
        handleSort: PropTypes.func.isRequired,
        params: PropTypes.object.isRequired,
    };

    onFieldKeyUp(e){
        console.log('keyye')
        if(e.keyCode === 13){
            const {handleSearch} = this.props;
            handleSearch(e.target.value);
            e.target.value = '';
        }
    }

    renderInventory() {
        const {inventory, selectedItems, selectItem, deselectItem} = this.props;
        const list = [];
        inventory.forEach(item => {
            const selected = !!selectedItems[item.assetID];
            list.push(
                <ShopItem
                    key={item._id}
                    iconUrl={item.data.icon_url}
                    name={item.name}
                    price={item.data.price * 1000}
                    selected={selected}
                    onClick={selected ? ()=>deselectItem(item) : ()=>selectItem(item)}
                />
            )
        });
        return list;
    }

    render() {
        const {params, loadMarketplaceInventory, selectedItems, createWithdrawOffer, deselectItem, handleSort} = this.props;
        const {search, price} = params;

        return (
            <div className='container'>
                <div className="shop">
                    <div className="shop__header">
                        <div className="shop__input">
                            <input
                                type="text"
                                placeholder={search || 'Search'}
                                name='search'
                                onKeyUp={::this.onFieldKeyUp}
                            />
                            <i className='icon-search'/>
                        </div>
                        <div>
                            <button
                                className="button button-price"
                                onClick={()=>handleSort({price: price === -1 ? 1 : -1})}>
                                <span>Price</span>
                                <i className={(price === 1) ? 'arrow-icon' : 'arrow-icon arrow-icon-active'}/>
                            </button>
                            <button onClick={loadMarketplaceInventory} className="button button-refresh">
                                <span><i className='icon-refresh'/>Refresh</span>
                                <span className='items'>(15 added)</span>
                            </button>
                        </div>
                    </div>
                    <div className="shop__container fix-scroll-margin" style={{height: 'calc(100vh - 30rem)'}}>
                        <Scrollbar>
                            {this.renderInventory()}
                        </Scrollbar>
                    </div>
                </div>
                <Cart
                    createWithdrawOffer={createWithdrawOffer}
                    selectedItems={selectedItems}
                    deselectItem={deselectItem}
                />
            </div>
        );
    }
}

