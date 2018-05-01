import React, {Component} from 'react';
import Scrollbar          from './../common/Scrollbar.jsx';
import ShopItem           from './ShopItem.jsx';
import Cart               from './CartDeposit.jsx';
import PropTpes from 'prop-types';

export default class Deposit extends Component {

    static propTypes = {
        inventory: PropTpes.array.isRequired,
        selectedItems: PropTpes.object.isRequired,
        loadUserInventory: PropTpes.func.isRequired,
        selectItem: PropTpes.func.isRequired,
        deselectItem: PropTpes.func.isRequired,
        createDepositOffer: PropTpes.func.isRequired,
        handleSearch: PropTpes.func.isRequired,
        handleSort: PropTpes.func.isRequired,
        params: PropTpes.object.isRequired,
    };

    onFieldKeyUp(e){
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
                    iconUrl={item.iconUrl}
                    name={item.name}
                    price={item.price * 1000}
                    selected={selected}
                    onClick={selected ? ()=>deselectItem(item) : ()=>selectItem(item)}
                />
            )
        });
        return list;
    }

    render() {
        const {params, loadUserInventory, selectedItems, deselectItem, createDepositOffer, handleSort} = this.props;
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
                            <button className="button button-price"
                                    onClick={()=>handleSort({price: price === -1 ? 1 : -1})}>
                                <span>Price</span>
                                <i className={(price === 1) ? 'arrow-icon' : 'arrow-icon arrow-icon-active'}/>
                            </button>
                            <button onClick={loadUserInventory}
                                    className="button button-refresh">
                                <span><i
                                    className='icon-refresh'/>Refresh</span>
                                <span className='items'>(15 added)</span>
                            </button>
                        </div>
                    </div>
                    <div className="shop__container fix-scroll-margin"
                         style={{height: 'calc(100vh - 30rem)'}}>
                        <Scrollbar>
                            {this.renderInventory()}
                        </Scrollbar>
                    </div>
                </div>
                <Cart
                    createDepositOffer={createDepositOffer}
                    selectedItems={selectedItems}
                    deselectItem={deselectItem}
                />
            </div>
        );
    }
}

