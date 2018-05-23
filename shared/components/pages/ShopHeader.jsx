import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import commonConfig from '../../../config/commonConfig';

export default class Shop extends Component {
    static propTypes = {
        handleChangeGame: PropTypes.func.isRequired,
        handleSort: PropTypes.func.isRequired,
        loadMarketplaceInventory: PropTypes.func.isRequired,
        onFieldKeyUp: PropTypes.func.isRequired,
        selectedGame: PropTypes.number.isRequired,
        placeholder: PropTypes.string,
        price: PropTypes.number.isRequired,
    };

    gameOptions(){
        const options = [{value: 0, label: <div className='select__option'>ALL</div>},];
        for (let key in commonConfig.MARKETPLACE_GAMES){
            options.push({value: key, label: <div className='select__option'>{commonConfig.MARKETPLACE_GAMES[key].label}</div>});
        }
        return options;
    }

    render() {
        const {handleChangeGame, placeholder, onFieldKeyUp, handleSort, price, loadMarketplaceInventory, selectedGame} = this.props;

        return (
            <div className="shop__header">
                <div className="shop__input">
                    <input
                        type="text"
                        placeholder={placeholder || 'Search'}
                        name='search'
                        onKeyUp={onFieldKeyUp}
                    />
                    <i className='icon-search'/>
                </div>
                <div>
                    <Select
                        name="form-field-name"
                        value={selectedGame || 0}
                        onChange={handleChangeGame}
                        searchable={false}
                        clearable={false}
                        className='select'
                        optionClassName='select__options'
                        options={this.gameOptions()}
                    />
                    <button
                        className="button button-price"
                        onClick={() => handleSort({price: price === -1 ? 1 : -1})}>
                        <span>Price</span>
                        <i className={(price === 1) ? 'arrow-icon' : 'arrow-icon arrow-icon-active'}/>
                    </button>
                    <button onClick={loadMarketplaceInventory} className="button button-refresh">
                        <span><i className='icon-refresh'/>Refresh</span>
                        {/*todo 15 added ? */}
                        {/*<span className='items'>(15 added)</span>*/}
                    </button>
                </div>
            </div>
        );
    }
}

