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
        params: PropTpes.object.isRequired,
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSortPrice = () => {
        if (this.state.price === 'up') {
            this.setState({
                price: 'down'
            });
        } else {
            this.setState({
                price: 'up'
            });
        }
    };

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
        const {params, loadUserInventory, selectedItems, deselectItem, createDepositOffer} = this.props;
        const {search, price} = params;


        return (
            <div className='container'>
                <div className="shop">
                    <div className="shop__header">
                        <div className="shop__input">
                            <input type="text" placeholder='Search'
                                   name='search' value={search}
                                   onChange={::this.onChange}/>
                            <i className='icon-search'/>
                        </div>
                        <div>
                            <button className="button button-price"
                                    onClick={::this.onSortPrice}>
                                <span>Price</span>
                                <i className={(price === 'down') ? 'arrow-icon' : 'arrow-icon arrow-icon-active'}/>
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

