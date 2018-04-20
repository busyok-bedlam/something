import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Chat from '../../containers/Chat.jsx';
import RouletteLobby from './RouletteGame/RouletteLobby.jsx';
import RouletteWheel from './RouletteGame/RouletteWheel.jsx';
import RouletteBets from './RouletteGame/RouletteBets.jsx';
import rouletteConfig from '../../../config/roulette.js';

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

        return (
            <div className='container'>
                <div className="roulette">
                    <RouletteWheel color={roulette.color} sector={roulette.sector} angle={roulette.angle} counter={roulette.counter} status={roulette.status} roulette={roulette}/>
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
                            status={roulette.status}
                            winnerColor={roulette.color}
                            coeff={rouletteConfig["ROULETTE_COLOR_PINK_MULTIPLY"]}
                            ownColor={rouletteConfig.ROULETTE_COLOR_PINK}
                            total={players.total.ROULETTE_COLOR_PINK || 0}
                            players={players[rouletteConfig.ROULETTE_COLOR_PINK]}
                            classByColor={RouletteBets.type.COLOR1}/>
                        <RouletteBets
                            user={user}
                            status={roulette.status}
                            winnerColor={roulette.color}
                            total={players.total.ROULETTE_COLOR_GREEN || 0}
                            coeff={rouletteConfig["ROULETTE_COLOR_GREEN_MULTIPLY"]}
                            ownColor={rouletteConfig.ROULETTE_COLOR_GREEN}
                            players={players[rouletteConfig.ROULETTE_COLOR_GREEN]}
                            classByColor={RouletteBets.type.COLOR2}/>
                        <RouletteBets
                            user={user}
                            status={roulette.status}
                            winnerColor={roulette.color}
                            total={players.total.ROULETTE_COLOR_GREY || 0}
                            coeff={rouletteConfig["ROULETTE_COLOR_GREY_MULTIPLY"]}
                            ownColor={rouletteConfig.ROULETTE_COLOR_GREY}
                            players={players[rouletteConfig.ROULETTE_COLOR_GREY]}
                            classByColor={RouletteBets.type.COLOR3}/>
                    </div>
                </div>
                <Chat/>
            </div>
        );
    }
}

