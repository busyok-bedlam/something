import React, {Component} from 'react';
import BetButtons from '../../common/game/BetButtons.jsx';
import GameHash from '../../common/game/GameHash.jsx';
import PropTypes from "prop-types";

export default class CrashLobby extends Component {
    static propTypes = {
        bet: PropTypes.number.isRequired,
        lobbyHandleChangeValue: PropTypes.func.isRequired,
    };

    state = {
        disabledButton: true
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

    validateBet = value => (!(/^[0-9]*$/.test(value))) || value === '' || value > 300000;

    render() {
        let {disabledButton} = this.state;
        let {bet} = this.props;
        return (
            <div className='cLobby'>
                <div className="game__lobby">
                    <div className="game__info">
                        <form onSubmit={this.handleSubmit}>
                            <h2>Chose bet (max 300 000)</h2>
                            <input type="number" value={bet} name='bet' onChange={this.handleChange}/>
                            <button className="button button-green" disabled={disabledButton}>Start game</button>
                            {/*<button className="button button-pink">Stop</button>*/}
                        </form>
                        <GameHash />
                    </div>
                    <BetButtons bet={bet}
                                minBet={0}
                                allInBet={300}
                                handleInputValue={this.handleInputValue.bind(this)}/>
                </div>
            </div>
        );
    }
}