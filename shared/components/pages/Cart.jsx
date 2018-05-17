import React, {Component} from 'react';
import Scrollbar from './../common/Scrollbar.jsx';
import ShopItem from './ShopItem.jsx';
import ModalController from './../../lib/ModalController.js';
import PropTypes from 'prop-types';

export default class Cart extends Component {
    static propTypes = {
        selectedItems: PropTypes.object.isRequired,
        deselectItem: PropTypes.func.isRequired,
        createWithdrawOffer: PropTypes.func.isRequired,
    };

    state = {
        cartShowed: false
    };

    toggleCart = () => {
      this.setState({
          cartShowed: !this.state.cartShowed
      })
    };

    renderItems(){
        const {selectedItems, deselectItem} = this.props;
        const list = [];
        let total = 0;
        for(let key in selectedItems){
            const item = selectedItems[key];
            total += item.data.price;
            list.push(
                <ShopItem
                    key={item._id}
                    iconUrl={item.data.icon_url}
                    name={item.name}
                    price={item.data.price * 1000}
                    selected={false}
                    onClick={()=>deselectItem(item)}
                />
            )
        }
        return {list, total};
    }

    render() {
        let {cartShowed} = this.state;
        const {createWithdrawOffer, balance} = this.props;
        const {list, total} = this.renderItems();
        return (
            <aside className={(!cartShowed) ? "cart" : " cart cart-open"}>
                <div className="game__header">
                    <div className='balance'>Balance: <i className='icon-poker-piece'/><span>{balance}</span></div>
                    <button
                        onClick={() => ModalController.openModal('DepositModal')}
                        className='button'>Deposit now
                    </button>
                </div>
                <div className="cart__header" onClick={::this.toggleCart}>
                    <h2>
                        <i className='icon-cart'/>
                        Your cart
                    </h2>
                    <div className="count">{list.length} skins</div>
                </div>
                <div className="cart__goods fix-scroll-margin" style={{height: 'calc(100vh - 43.3rem)'}}>
                    <Scrollbar>
                        {list}
                    </Scrollbar>
                </div>
                <div className="cart__footer">
                    <div>
                        Total:<span> <i className='icon-poker-piece'/>{(total * 1000).toFixed()}</span>
                    </div>
                    <button onClick={createWithdrawOffer} className="button button-green">Buy now</button>
                </div>
            </aside>
        );
    }
}

