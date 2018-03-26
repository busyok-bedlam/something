import React, {Component} from 'react';
import BetButtons from '../../common/game/BetButtons.jsx';
import GameHash from '../../common/game/GameHash.jsx';

export default class CrashHistory extends Component {
    state = {
        bet: 0,
        disabledButton: true
    };

    handleChange = e => {
        let value = e.target.value;
        this.setState({
            [e.target.name]: value,
            disabledButton: this.validateBet(value)
        });
    };

    handleSubmit = e => {
        e.preventDefault();
    };

    handleInputValue (value) {
        this.setState({
            bet: value,
            disabledButton: this.validateBet(value)
        })
    }

    validateBet = value => (!(/^[0-9]*$/.test(value))) || value === '' || value > 300000;

    render() {
        let {bet, disabledButton} = this.state;
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
                    <BetButtons bet={bet} allIn={300} handleChange={this.handleInputValue.bind(this)}/>
                </div>
            </div>
        );
    }
}