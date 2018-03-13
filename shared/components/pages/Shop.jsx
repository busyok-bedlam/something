import React, {Component} from 'react';
import Scrollbar from './../common/Scrollbar.jsx';
import ShopItem from './ShopItem.jsx';


export default class Shop extends Component {
    state = {
        selectedOption: ''
    };

    render() {
        const {selectedOption} = this.state;
        return (
            <div className='container'>
                <div className="shop">
                    <div className="shop__header">
                        <div className="shop__input">
                            <input type="text" placeholder='Search'/>
                            <i className='icon-search'/>
                        </div>
                        <div>
                            <button className="button button-price">
                                <span>Price</span>
                                <i  className='arrow-icon'/>
                            </button>
                            <button className="button button-refresh">
                                <span><i className='icon-refresh'/>Refresh</span>
                                <span className='items'>(15 added)</span>
                            </button>
                        </div>
                    </div>
                    <div className="shop__container fix-scroll-margin" style={{height: 'calc(100vh - 30rem)'}}>
                        <Scrollbar>
                            <ShopItem />
                            <ShopItem />
                            <ShopItem />
                            <ShopItem />
                            <ShopItem />
                            <ShopItem />
                        </Scrollbar>
                    </div>
                </div>
                <aside className="cart fix-scroll-margin" style={{height: 'calc(100vh - 23.3rem)'}}>
                    <Scrollbar>
                        <ShopItem />
                        <ShopItem />
                        <ShopItem />
                        <ShopItem />
                        <ShopItem />
                    </Scrollbar>
                </aside>
            </div>
        );
    }
}

