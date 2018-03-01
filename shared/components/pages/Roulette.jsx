import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat.jsx';
import RouletteLobby from './RouletteGame/RouletteLobby.jsx';
import RouletteWheel from './RouletteGame/RouletteWheel.jsx';
import RouletteBets from './RouletteGame/RouletteBets.jsx';
import ModalController from './../../lib/ModalController';

const dataPie = [
    {value: 100, stroke: "#22594e", strokeWidth: 6},
    {value: 60, stroke: "#2f7d6d"},
];

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
                    <RouletteWheel/>
                    <RouletteLobby/>
                    <div className="rBets">
                        <RouletteBets color={RouletteBets.type.COLOR1}/>
                        <RouletteBets color={RouletteBets.type.COLOR2}/>
                        <RouletteBets color={RouletteBets.type.COLOR3}/>
                    </div>
                </div>
                <Chat/>
            </div>
        );
    }
}

