import React, {Component} from 'react';
import Scrollbar          from './../common/Scrollbar.jsx';
import ShopItem           from './ShopItem.jsx';
import Cart               from './CartDeposit.jsx';
import PropTpes from 'prop-types';
import ShopHeader         from './ShopHeader.jsx';

export default class Deposit extends Component {
    constructor() {
        super();
        this.state = {
            selectedGame: 'csgo',
        }
    }

    static propTypes = {
        inventory: PropTpes.array.isRequired,
        selectedItems: PropTpes.object.isRequired,
        loadUserInventory: PropTpes.func.isRequired,
        selectItem: PropTpes.func.isRequired,
        deselectItem: PropTpes.func.isRequired,
        selectGame: PropTpes.func.isRequired,
        createDepositOffer: PropTpes.func.isRequired,
        handleSearch: PropTpes.func.isRequired,
        handleSort: PropTpes.func.isRequired,
        params: PropTpes.object.isRequired,
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
                    iconUrl={item.iconUrl}
                    name={item.name}
                    price={item.price * 1000}
                    selected={selected}
                    onClick={selected ? () => deselectItem(item) : () => selectItem(item)}
                />
            )
        });
        return list;
    }

    render() {
        const {params, loadUserInventory, selectedItems, deselectItem, createDepositOffer, handleSort, selectGame, balance} = this.props;
        const {search, price, selectedGame} = params;

        return (
            <div className='container'>
                <div className="shop">
                    <ShopHeader
                        price={price}
                        placeholder={search}
                        loadMarketplaceInventory={loadUserInventory}
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
                    balance={balance}
                    createDepositOffer={createDepositOffer}
                    selectedItems={selectedItems}
                    deselectItem={deselectItem}
                />
            </div>
        );
    }
}

