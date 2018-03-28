import React, {Component} from 'react';
import BetButtons from '../../common/game/BetButtons.jsx';
import GameHash from '../../common/game/GameHash.jsx';
import GameHeader from '../../common/game/GameHeader.jsx';
import jackpot from '../../../../config/jackpot.js';
import PropTypes from 'prop-types';

export default class RouletteLobby extends Component {
    static propTypes = {
        bet: PropTypes.number.isRequired,
        lobbyHandleChangeValue: PropTypes.func.isRequired,
    };

    state = {
        disabledButton: false
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
            disabledButton: this.validateBet(value)
        })
    }

    validateBet = value => (!(/^[0-9]*$/.test(value))) || value === '' || value > jackpot.JACKPOT_MAX_BET || value < jackpot.JACKPOT_MIN_BET;

    render() {
        let {disabledButton} = this.state;
        let {bet} = this.props;
        let {JACKPOT_MIN_BET, JACKPOT_MAX_BET} = jackpot;
        return (
            <div className="rLobby">
                <GameHeader />
                <div className="game__lobby">
                    <div className="rLobby__bet">
                        <h3>Your bet:</h3>
                        <div className="wrapper">
                            <div>
                                <div className="color color-1"/>
                                <div className="bet"><i className='icon-poker-piece'/>1245</div>
                            </div>
                            <div>
                                <div className="color color-2"/>
                                <div className="bet"><i className='icon-poker-piece'/>1245</div>
                            </div>
                            <div>
                                <div className="color color-3"/>
                                <div className="bet"><i className='icon-poker-piece'/>1245</div>
                            </div>
                        </div>
                    </div>
                    <div className="game__info">
                        <h2>Choose bet (max {JACKPOT_MAX_BET})</h2>
                        <input type="number" value={bet} name='bet' min={JACKPOT_MIN_BET} max={JACKPOT_MAX_BET} onChange={this.handleChange}/>
                        <div className="rLobby__buttons">
                            <button className="button button-pink" disabled={disabledButton}>Bet x2</button>
                            <button className="button button-green" disabled={disabledButton}>Bet x14</button>
                            <button className="button button-gray" disabled={disabledButton}>Bet x2</button>
                        </div>
                        <div className="rLobby__history">
                            <div className="history__item history__item-color1">2</div>
                            <div className="history__item history__item-color2">3</div>
                            <div className="history__item history__item-color3">4</div>
                        </div>
                        <GameHash />
                    </div>
                    <BetButtons bet={bet}
                                minBet={JACKPOT_MIN_BET}
                                allInBet={300}
                                handleInputValue={this.handleInputValue.bind(this)}/>
                </div>
            </div>
        );
    }
}

