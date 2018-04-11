import React, {Component} from 'react';
import BetButtons from '../../common/game/BetButtons.jsx';
import GameHash from '../../common/game/GameHash.jsx';
import GameHeader from '../../common/game/GameHeader.jsx';
import roulette from '../../../../config/roulette.js';
import PropTypes from 'prop-types';

const {
    ROULETTE_MIN_BET,
    ROULETTE_MAX_BET,
    ROULETTE_BETTING
} = roulette;

export default class RouletteLobby extends Component {
    static propTypes = {
        // bet: PropTypes.number.isRequired,
        lobbyHandleChangeValue: PropTypes.func.isRequired,
    };

    state = {
        disabledButton: false,
        value: ROULETTE_MIN_BET
    };

    handleChange = e => {
        let value = +e.target.value;
        this.setState({
            value,
            disabledButton: this.validateBet(value)
        });
    };

    handleInputValue (value) {
        // this.props.lobbyHandleChangeValue(value);

        this.setState({
            disabledButton: this.validateBet(value),
            value
        })
    }

    handleNewBet = (color, e) => {
        if (this.props.roulette.status !== ROULETTE_BETTING) {
            this.errorMessage = 'You cannot to bet';
            console.error('You cannot to bet')
        } else {
            let {value} = this.state;
            this.props.rouletteActions.rouletteNewBet({color, value})
        }
    };

    validateBet = value => (!(/^[0-9]*$/.test(value))) || value === '' || value > roulette.ROULETTE_MAX_BET || value < roulette.ROULETTE_MIN_BET || value > this.props.user.balance;

    render() {
        let {disabledButton, value} = this.state;
        let {user} = this.props;
        let {userBets, sector} = this.props.roulette;
        let {rouletteID, hash, status} = this.props.roulette; //game
        let {
            ROULETTE_MIN_BET,
            ROULETTE_MAX_BET,
            ROULETTE_COLOR_PINK,
            ROULETTE_COLOR_GREEN,
            ROULETTE_COLOR_GREY
        } = roulette;

        return (
            <div className="rLobby">
                <GameHeader user={user}/>
                <div className="game__lobby">
                    <div className={(!userBets[ROULETTE_COLOR_PINK] && !userBets[ROULETTE_COLOR_GREEN] && !userBets[ROULETTE_COLOR_GREY]) ? "rLobby__bet hide" : "rLobby__bet"}>
                        <h3>Your bet:</h3>
                        <div className="wrapper">
                            {!!userBets[ROULETTE_COLOR_PINK] && <div>
                                <div className="color color-1"/>
                                <div className="bet"><i className='icon-poker-piece'/>{userBets[ROULETTE_COLOR_PINK]}</div>
                            </div>}
                            {!!userBets[ROULETTE_COLOR_GREEN] && <div>
                                <div className="color color-2"/>
                                <div className="bet"><i className='icon-poker-piece'/>{userBets[ROULETTE_COLOR_GREEN]}</div>
                            </div>}
                            {!!userBets[ROULETTE_COLOR_GREY] && <div>
                                <div className="color color-3"/>
                                <div className="bet"><i className='icon-poker-piece'/>{userBets[ROULETTE_COLOR_GREY]}</div>
                            </div>}
                        </div>
                    </div>
                    <div className="game__info">
                        <h2>Choose bet (max {ROULETTE_MAX_BET})</h2>
                        <input type="number" value={value} name='bet' min={ROULETTE_MIN_BET} max={ROULETTE_MAX_BET}
                               onChange={this.handleChange}/>
                        <div className="rLobby__buttons">
                            <button
                                onClick={() => this.handleNewBet(ROULETTE_COLOR_PINK)}
                                className="button button-pink"
                                disabled={disabledButton}>Bet x2
                            </button>
                            <button
                                onClick={() => this.handleNewBet(ROULETTE_COLOR_GREEN)}
                                className="button button-green"
                                disabled={disabledButton}>Bet x14
                            </button>
                            <button
                                onClick={() => this.handleNewBet(ROULETTE_COLOR_GREY)}
                                className="button button-gray"
                                disabled={disabledButton}>Bet x2
                            </button>
                        </div>
                        <div className="rLobby__history">

                            {this.props.roulette.lastGames.map((game, i) => (
                                <div
                                    key={i}
                                    className={`history__item history__item-${game.color}`}>{game.sector}</div>)
                            )}

                            {/*<div className="history__item history__item-color2">3</div>*/}
                            {/*<div className="history__item history__item-color3">4</div>*/}
                        </div>
                        <GameHash gameID={rouletteID} hash={hash} number={sector} status={status}/>
                    </div>
                    <BetButtons bet={value}
                                minBet={ROULETTE_MIN_BET}
                                allInBet={user.balance}
                                handleInputValue={this.handleInputValue.bind(this)}/>
                </div>
            </div>
        );
    }
}

