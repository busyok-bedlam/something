import React, {Component} from 'react';
import BetButtons from '../../common/game/BetButtons.jsx';
import GameHash from '../../common/game/GameHash.jsx';
import PropTypes from "prop-types";
import crashConfig from '../../../../config/crash.js';

export default class CrashLobby extends Component {
    static propTypes = {
        bet: PropTypes.number.isRequired,
        user: PropTypes.object.isRequired,
        crash: PropTypes.object.isRequired,
        lobbyHandleChangeValue: PropTypes.func.isRequired,
        cbHandleNewBet: PropTypes.func.isRequired,
        cbHandleCashOut: PropTypes.func.isRequired,
    };

    state = {
        disabledButton: true
    };

    handleChange = e => {
        let value = e.target.value;
        this.props.lobbyHandleChangeValue(value);
        this.setState({
            disabledButton: this.validateBet(value) || this.props.user.balance < value,
        });
    };

    handleInputValue(value) {
        this.props.lobbyHandleChangeValue(value);
        this.setState({
            disabledButton: this.validateBet(value) || this.props.user.balance < value,
        })
    }

    validateBet = value =>
        (!(/^[0-9]*$/.test(value)))
        || value === ''
        || parseInt(value) > crashConfig.CRASH_MAX_BET
        || parseInt(value) < crashConfig.CRASH_MIN_BET;

    componentWillReceiveProps(nextProps) {
        let {bet, user} = nextProps;
        this.setState({
            disabledButton: this.validateBet(bet) || user.balance < bet,
        })
    }

    submitBet(e) {
        e.preventDefault();
        this.props.cbHandleNewBet(this.props.bet);
    }

    cashOut(e) {
        e.preventDefault();
        this.props.cbHandleCashOut();
    }

    render() {
        let {disabledButton} = this.state;
        let {bet, user, crash} = this.props;
        let crashStatus = crash.currentCrashGame.status !== crashConfig.STATUS.BETTING;
        let {CRASH_MIN_BET, CRASH_MAX_BET} = crashConfig;
        let {hash, _id, status} = crash.currentCrashGame;
        return (
            <div className='cLobby'>
                <div className="game__lobby">
                    <div className="game__info">
                        <form>
                            <h2>Chose bet (max {CRASH_MAX_BET})</h2>
                            <input type="number" value={bet} name='bet' min={CRASH_MIN_BET} max={CRASH_MAX_BET} onChange={this.handleChange}/>
                            { user.crashStatus === 'FREE' ?
                                <button className="button button-green" disabled={disabledButton || crashStatus} onClick={::this.submitBet}>Start game</button>
                                :
                                <button className="button button-pink" disabled={crash.currentCrashGame.status !== crashConfig.STATUS.IN_GAME} onClick={::this.cashOut}>Stop</button>
                            }
                        </form>
                        <GameHash
                            _id={_id}
                            hash={hash}
                            status={status}
                        />
                    </div>
                    <BetButtons bet={bet}
                                minBet={parseInt(CRASH_MIN_BET)}
                                allInBet={user.balance}
                                handleInputValue={this.handleInputValue.bind(this)}
                    />
                </div>
            </div>
        );
    }
}