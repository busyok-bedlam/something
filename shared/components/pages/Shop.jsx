import React, {Component} from 'react';
import Scrollbar from './../common/Scrollbar.jsx';
import ShopItem from './ShopItem.jsx';


export default class Shop extends Component {
    state = {
        search: '',
        price: 'up'
    };

    onChange = e => {
      this.setState({
          [e.target.name]: e.target.value
      })
    };

    onSortPrice = () => {
        if(this.state.price === 'up') {
            this.setState({
                price: 'down'
            });
        } else {
            this.setState({
                price: 'up'
            });
        }
    };

    render() {
        const {search, price} = this.state;
        return (
            <div className='container'>
                <div className="shop">
                    <div className="shop__header">
                        <div className="shop__input">
                            <input type="text" placeholder='Search' name='search' value={search} onChange={::this.onChange}/>
                            <i className='icon-search'/>
                        </div>
                        <div>
                            <button className="button button-price" onClick={::this.onSortPrice}>
                                <span>Price</span>
                                <i className={(price === 'down') ? 'arrow-icon' : 'arrow-icon arrow-icon-active'}/>
                            </button>
                            <button className="button button-refresh">
                                <span><i className='icon-refresh'/>Refresh</span>
                                <span className='items'>(15 added)</span>
                            </button>
                        </div>
                    </div>
                    <div className="shop__container fix-scroll-margin" style={{height: 'calc(100vh - 30rem)'}}>
                        <Scrollbar>
                            <ShopItem/>
                            <ShopItem/>
                            <ShopItem/>
                            <ShopItem/>
                            <ShopItem/>
                            <ShopItem/>
                        </Scrollbar>
                    </div>
                </div>
                <aside className="cart">
                    <div className="game__header">
                        <div className='balance'>Balance: <i className='icon-poker-piece'/><span>1123</span></div>
                        <button
                            onClick={() => ModalController.openModal('DepositModal')}
                            className='button'>Deposit now
                        </button>
                    </div>
                    <div className="cart__header">
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
                            Total: <i className='icon-poker-piece'/><span>1123</span>
                        </div>
                        <button className="button button-green">Buy now</button>
                    </div>
                </aside>
            </div>
        );
    }
}

