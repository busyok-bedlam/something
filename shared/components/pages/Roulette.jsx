import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat.jsx';
import RouletteLobby from './RouletteGame/RouletteLobby.jsx';
import RouletteWheel from './RouletteGame/RouletteWheel.jsx';
import RouletteBets from './RouletteGame/RouletteBets.jsx';

export default class Roulette extends Component {
    static propTypes = {
        bet: PropTypes.number.isRequired,
        inventory: PropTypes.array.isRequired,
        selectedItems: PropTypes.object.isRequired,
        isInventoryLoading: PropTypes.bool.isRequired,
        cbHandleUpdateInventory: PropTypes.func.isRequired,
        lobbyHandleChangeValue: PropTypes.func.isRequired,
        // cbHandleSelectSteamInventorySort: PropTypes.func.isRequired,
        cbHandleWithdraw: PropTypes.func.isRequired,
    };

    render() {
        const {
            bet,
            jackpot,
            handleJackpotBetting,
            handleJackpotInGame,
            handleJackpotRewards,
            lobbyHandleChangeValue
        } = this.props;
        return (
            <div className='container'>
                <button className="button" onClick={()=> handleJackpotBetting({})}>Betting</button>
                <button className="button" onClick={()=> handleJackpotInGame({})}>In game</button>
                <button className="button" onClick={()=> handleJackpotRewards({})}>Rewards</button>
                <div className="roulette">
                    <RouletteWheel jackpot={jackpot}/>
                    <RouletteLobby
                        jackpot={jackpot} bet={bet} handleJackpotRewards={handleJackpotRewards}
                        handleJackpotInGame={handleJackpotInGame} handleJackpotBetting={handleJackpotBetting}
                        lobbyHandleChangeValue={lobbyHandleChangeValue}/>
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

