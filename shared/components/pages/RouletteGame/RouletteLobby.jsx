import React, {Component} from 'react';
import BetButtons from '../../common/game/BetButtons.jsx';
import GameHash from '../../common/game/GameHash.jsx';
import ModalController from '../../../lib/ModalController';

export default class RouletteLobby extends Component {
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
            <div className="rLobby">
                <div className="game__header">
                    <div className='balance'>Balance: <i className='icon-poker-piece'/><span>1123</span></div>
                    <button
                        onClick={() => ModalController.openModal('DepositModal')}
                        className='button'>Deposit now</button>
                </div>
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
                        <h2>Choose bet</h2>
                        <input type="number" value={bet} name='bet' onChange={this.handleChange}/>
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
                    <BetButtons bet={bet} allIn={300} handleChange={this.handleInputValue.bind(this)}/>
                </div>
            </div>
        );
    }
}

