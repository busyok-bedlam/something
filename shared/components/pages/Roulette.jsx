import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Chat from '../../containers/Chat.jsx';
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
            user,
            bet,
            roulette,
            rouletteActions,
            handleRouletteBetting,
            handleRouletteInGame,
            handleRouletteRewards,
            lobbyHandleChangeValue
        } = this.props;
        return (
            <div className='container'>
                <div className="roulette">
                    <RouletteWheel roulette={roulette}/>
                    <RouletteLobby
                        user={user}
                        roulette={roulette}
                        rouletteActions={rouletteActions}
                        bet={bet}
                        handleRouletteRewards={handleRouletteRewards}
                        handleRouletteInGame={handleRouletteInGame}
                        handleRouletteBetting={handleRouletteBetting}
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

