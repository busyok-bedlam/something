import React, {Component} from 'react';
import BetButtons from '../../common/game/BetButtons.jsx';
import GameHash from '../../common/game/GameHash.jsx';
import PropTypes from "prop-types";
import config from '../../../../config/crash.js';

export default class CrashLobby extends Component {
    static propTypes = {
        bet: PropTypes.number.isRequired,
        lobbyHandleChangeValue: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        crash: PropTypes.object.isRequired,
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

    handleInputValue(value) {
        this.props.lobbyHandleChangeValue(value);
        this.setState({
            disabledButton: this.validateBet(value)
        })
    }

    validateBet = value => (!(/^[0-9]*$/.test(value))) || value === '' || value === 0 || parseInt(value) > config.CRASH_MAX_BET || parseInt(value) < config.CRASH_MIN_BET;

    submitBet(e) {
        // e.stopPropagation();
        e.preventDefault();
        console.log(this.props.bet);
    }

    render() {
        let {disabledButton} = this.state;
        let {bet, user, crash} = this.props;
        let {CRASH_MIN_BET, CRASH_MAX_BET} = config;
        let {hash, round, _id, roundNumber} = crash.currentCrashGame;
        // console.log(crash);
        return (
            <div className='cLobby'>
                <div className="game__lobby">
                    <div className="game__info">
                        <form>
                            <h2>Chose bet (max {CRASH_MAX_BET})</h2>
                            <input type="number" value={bet} name='bet' min={CRASH_MIN_BET} max={CRASH_MAX_BET} onChange={this.handleChange}/>
                            <button className="button button-green" disabled={disabledButton} onClick={::this.submitBet}>Start game</button>
                            {/*<button className="button button-pink">Stop</button>*/}
                        </form>
                        <GameHash
                            _id={_id}
                            hash={hash}
                            roundNumber={roundNumber}
                        />
                    </div>
                    <BetButtons bet={bet}
                                minBet={parseInt(CRASH_MIN_BET)}
                                allInBet={300}
                                handleInputValue={this.handleInputValue.bind(this)}
                    />
                </div>
            </div>
        );
    }
}