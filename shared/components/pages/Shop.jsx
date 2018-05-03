import React, {Component} from 'react';
import Scrollbar          from './../common/Scrollbar.jsx';
import ShopItem           from './ShopItem.jsx';
import Cart               from './Cart.jsx';
import PropTypes          from 'prop-types';
import ShopHeader           from './ShopHeader.jsx';

export default class Shop extends Component {
    constructor() {
        super();
        this.state = {
            selectedGame: 'csgo',
        }
    }

    static propTypes = {
        inventory: PropTypes.array.isRequired,
        selectedItems: PropTypes.object.isRequired,
        loadMarketplaceInventory: PropTypes.func.isRequired,
        selectItem: PropTypes.func.isRequired,
        deselectItem: PropTypes.func.isRequired,
        createWithdrawOffer: PropTypes.func.isRequired,
        handleSearch: PropTypes.func.isRequired,
        handleSort: PropTypes.func.isRequired,
        selectGame: PropTypes.func.isRequired,
        params: PropTypes.object.isRequired,
    };

    onFieldKeyUp(e) {
        if (e.keyCode === 13) {
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
                    onClick={selected ? () => deselectItem(item) : () => selectItem(item)}
                />
            )
        });
        return list;
    }

    render() {
        const {params, loadMarketplaceInventory, selectedItems, createWithdrawOffer, deselectItem, handleSort, selectGame} = this.props;
        const {search, price, selectedGame} = params;

        return (
            <div className='container'>
                <div className="shop">
                    <ShopHeader
                        price={price}
                        placeholder={search}
                        loadMarketplaceInventory={loadMarketplaceInventory}
                        handleSort={handleSort}
                        selectedGame={selectedGame}
                        handleChangeGame={selectGame}
                        onFieldKeyUp={::this.onFieldKeyUp}/>
                    <div className="shop__container fix-scroll-margin"
                         style={{height: 'calc(100vh - 30rem)'}}>
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

