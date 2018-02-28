import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import Chat from './Chat.jsx';
import ModalController from './../../lib/ModalController';

export default class Roulette extends Component {

    static propTypes = {
        inventory: PropTypes.array.isRequired,
        selectedItems: PropTypes.object.isRequired,
        isInventoryLoading: PropTypes.bool.isRequired,
        cbHandleUpdateInventory: PropTypes.func.isRequired,
        cbHandleSelectItem: PropTypes.func.isRequired,
        cbHandleSelectAll: PropTypes.func.isRequired,
        cbHandleDeselectItem: PropTypes.func.isRequired,
        cbHandleDeselectAll: PropTypes.func.isRequired,
        // cbHandleSelectSteamInventorySort: PropTypes.func.isRequired,
        cbHandleWithdraw: PropTypes.func.isRequired,
    };

    render() {
        const {
            inventory,
            selectedItems,
            cbHandleUpdateInventory,
            cbHandleSelectItem,
            cbHandleSelectAll,
            cbHandleDeselectItem,
            cbHandleDeselectAll,
            cbHandleWithdraw,
            isInventoryLoading
        } = this.props;
        return (
            <div className='container'>
                <div className="roulette">
                    <div className="roulette__wheel"></div>
                    <div className="roulette__lobby"></div>
                </div>
                <Chat />
            </div>
        );
    }
}

