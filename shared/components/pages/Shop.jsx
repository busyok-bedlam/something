import React, {Component} from 'react';
import Scrollbar from './../common/Scrollbar.jsx';
import 'react-select/dist/react-select.css';

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
                </div>
                <aside className="shop__aside">
                    dwkld
                    <Scrollbar></Scrollbar>
                </aside>
            </div>
        );
    }
}

