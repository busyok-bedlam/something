import React, {Component} from 'react';
import BetButtons from '../../common/game/BetButtons.jsx';
import GameHash from '../../common/game/GameHash.jsx';
import GameHeader from '../../common/game/GameHeader.jsx';
import roulette from '../../../../config/roulette.js';
import PropTypes from 'prop-types';


// let {ROULETTE_MIN_BET, ROULETTE_MAX_BET} = roulette;

export default class RouletteLobby extends Component {
    static propTypes = {
        bet: PropTypes.number.isRequired,
        lobbyHandleChangeValue: PropTypes.func.isRequired,
    };

    state = {
        disabledButton: false,
        value: 0
    };

    handleChange = e => {
        let value = e.target.value;
        this.props.lobbyHandleChangeValue(value);
        this.setState({
            disabledButton: this.validateBet(value)
        });
    };

    handleInputValue (value) {
        this.props.lobbyHandleChangeValue(value);
        this.setState({
            disabledButton: this.validateBet(value),
            value
        })
    }

    handleNewBet = (color, e) => {
        let {value} = this.state;
        this.props.rouletteActions.rouletteNewBet({color, value})
    };

    validateBet = value => (!(/^[0-9]*$/.test(value))) || value === '' || value > roulette.ROULETTE_MAX_BET || value < roulette.ROULETTE_MIN_BET;

    render() {
        let {disabledButton} = this.state;
        let {bet} = this.props;
        let {userBets} = this.props.roulette;
        let {rouletteID, hash} = this.props.roulette.game;


        let {
            ROULETTE_MIN_BET,
            ROULETTE_MAX_BET,
            ROULETTE_COLOR_PINK,
            ROULETTE_COLOR_GREEN,
            ROULETTE_COLOR_GREY
        } = roulette;

        return (
            <div className="rLobby">
                <GameHeader />
                <div className="game__lobby">
                    <div className={(!userBets[ROULETTE_COLOR_PINK] && !userBets[ROULETTE_COLOR_GREEN] && !userBets[ROULETTE_COLOR_GREY]) ? "rLobby__bet hide" : "rLobby__bet"}>
                        <h3>Your bet:</h3>
                        <div className="wrapper">
                            <div className={(userBets[ROULETTE_COLOR_PINK]) ? '' : 'hide'}>
                                <div className="color color-1"/>
                                <div className="bet"><i className='icon-poker-piece'/>{userBets[ROULETTE_COLOR_PINK]}</div>
                            </div>
                            <div className={(userBets[ROULETTE_COLOR_GREEN]) ? '' : 'hide'}>
                                <div className="color color-2"/>
                                <div className="bet"><i className='icon-poker-piece'/>{userBets[ROULETTE_COLOR_GREEN]}</div>
                            </div>
                            <div className={(userBets[ROULETTE_COLOR_GREY]) ? '' : 'hide'}>
                                <div className="color color-3"/>
                                <div className="bet"><i className='icon-poker-piece'/>{userBets[ROULETTE_COLOR_GREY]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="game__info">
                        <h2>Choose bet (max {ROULETTE_MAX_BET})</h2>
                        <input type="number" value={bet} name='bet' min={ROULETTE_MIN_BET} max={ROULETTE_MAX_BET}
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
                            <div className="history__item history__item-color1">2</div>
                            <div className="history__item history__item-color2">3</div>
                            <div className="history__item history__item-color3">4</div>
                        </div>
                        <GameHash gameID={rouletteID} hash={hash}/>
                    </div>
                    <BetButtons bet={bet}
                                minBet={ROULETTE_MIN_BET}
                                allInBet={300}
                                handleInputValue={this.handleInputValue.bind(this)}/>
                </div>
            </div>
        );
    }
}

