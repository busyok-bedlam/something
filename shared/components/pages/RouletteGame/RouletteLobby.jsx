import React, {Component} from 'react';
import BetButtons from '../../common/game/BetButtons.jsx';
import GameHash from '../../common/game/GameHash.jsx';
import GameHeader from '../../common/game/GameHeader.jsx';
import PropTypes from 'prop-types';

export default class RouletteLobby extends Component {
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

    validateBet = value => (!(/^[0-9]*$/.test(value))) || value === '' || value > 300000 || value <= 0;

    render() {
        let {disabledButton} = this.state;
        let {bet} = this.props;
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
                        <h2>Choose bet</h2>
                        <input type="number" value={bet} name='bet' min={0} max={300000} onChange={this.handleChange}/>
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
                                minBet={0}
                                allInBet={300}
                                handleInputValue={this.handleInputValue.bind(this)}/>
                </div>
            </div>
        );
    }
}

