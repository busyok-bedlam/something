import React, {Component} from 'react';
import Scrollbar from './../common/Scrollbar.jsx';
import ShopItem from './ShopItem.jsx';
import ModalController from './../../lib/ModalController.js';

export default class Cart extends Component {
    state = {
        cartShowed: false
    };

    toggleCart = () => {
      this.setState({
          cartShowed: !this.state.cartShowed
      })
    };

    render() {
        let {cartShowed} = this.state;
        return (
            <aside className={(!cartShowed) ? "cart" : " cart cart-open"}>
                <div className="game__header">
                    <div className='balance'>Balance: <i className='icon-poker-piece'/><span>1123</span></div>
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
                    <div className="count">15 skins</div>
                </div>
                <div className="cart__goods fix-scroll-margin" style={{height: 'calc(100vh - 43.3rem)'}}>
                    <Scrollbar>
                        <ShopItem/>
                        <ShopItem/>
                        <ShopItem/>
                        <ShopItem/>
                        <ShopItem/>
                    </Scrollbar>
                </div>
                <div className="cart__footer">
                    <div>
                        Total:<span> <i className='icon-poker-piece'/>1123</span>
                    </div>
                    <button className="button button-green">Buy now</button>
                </div>
            </aside>
        );
    }
}

