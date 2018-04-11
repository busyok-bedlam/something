import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Chat from '../../containers/Chat.jsx';
import CrashGame from './CrashGame/CrashGame.jsx';
import CrashLobby from './CrashGame/CrashLobby.jsx';
import CrashHistory from './CrashGame/CrashHistory.jsx';

export default class Roulette extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        bet: PropTypes.number.isRequired,
        inventory: PropTypes.array.isRequired,
        selectedItems: PropTypes.object.isRequired,
        isInventoryLoading: PropTypes.bool.isRequired,
        cbHandleUpdateInventory: PropTypes.func.isRequired,
        cbHandleSelectItem: PropTypes.func.isRequired,
        cbHandleSelectAll: PropTypes.func.isRequired,
        cbHandleDeselectItem: PropTypes.func.isRequired,
        cbHandleDeselectAll: PropTypes.func.isRequired,
        lobbyHandleChangeValue: PropTypes.func.isRequired,
        // cbHandleSelectSteamInventorySort: PropTypes.func.isRequired,
        cbHandleWithdraw: PropTypes.func.isRequired,
    };

    render() {
        const {
            user,
            bet,
            inventory,
            selectedItems,
            cbHandleUpdateInventory,
            cbHandleSelectItem,
            cbHandleSelectAll,
            cbHandleDeselectItem,
            cbHandleDeselectAll,
            cbHandleWithdraw,
            isInventoryLoading,
            lobbyHandleChangeValue
        } = this.props;
        return (
            <div className='container'>
                <div className="crash">
                    <div className='crash__container'>
                        <CrashGame user={user}/>
                        <CrashLobby bet={bet} lobbyHandleChangeValue={lobbyHandleChangeValue}/>
                    </div>
                    <CrashHistory />
                </div>
                <Chat/>
            </div>
        );
    }
}

