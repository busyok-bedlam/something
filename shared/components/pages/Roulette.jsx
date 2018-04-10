import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Chat from '../../containers/Chat.jsx';
import RouletteLobby from './RouletteGame/RouletteLobby.jsx';
import RouletteWheel from './RouletteGame/RouletteWheel.jsx';
import RouletteBets from './RouletteGame/RouletteBets.jsx';
import rouletteConfig from '../../../config/roulette.js'

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
            players,
            roulette,
            rouletteActions,
            handleRouletteBetting,
            handleRouletteInGame,
            handleRouletteRewards,
            lobbyHandleChangeValue
        } = this.props;

        const {
            ROULETTE_COLOR_PINK,
            ROULETTE_COLOR_GREEN,
            ROULETTE_COLOR_GREY
        } = rouletteConfig;

        console.log(players.total.ROULETTE_COLOR_PINK);

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
                        <RouletteBets
                            user={user}
                            total={players.total.ROULETTE_COLOR_PINK}
                            players={players[rouletteConfig.ROULETTE_COLOR_PINK]}
                            color={RouletteBets.type.COLOR1}/>
                        <RouletteBets
                            user={user}
                            total={players.total.ROULETTE_COLOR_GREEN}
                            players={players[rouletteConfig.ROULETTE_COLOR_GREEN]}
                            color={RouletteBets.type.COLOR2}/>
                        <RouletteBets
                            user={user}
                            total={players.total.ROULETTE_COLOR_GREY}
                            players={players[rouletteConfig.ROULETTE_COLOR_GREY]}
                            color={RouletteBets.type.COLOR3}/>
                    </div>
                </div>
                <Chat/>
            </div>
        );
    }
}

