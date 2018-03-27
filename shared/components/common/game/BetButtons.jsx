import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class BetButtons extends Component {
    static propTypes = {
        bet: PropTypes.number.isRequired,
        allInBet: PropTypes.number.isRequired,
        minBet: PropTypes.number.isRequired,
        handleInputValue: PropTypes.func.isRequired,
    };

    handleAddBet = e => {
        let addValue = e.target.getAttribute('data-add');
        this.props.handleInputValue(this.props.bet + parseInt(addValue))
    };

    handleMultiplyBet = () => {
        this.props.handleInputValue(this.props.bet * 2);
    };

    handleDivideBet = () => {
        this.props.handleInputValue(Math.round(this.props.bet / 2));
    };

    handleAllIn = () => {
        this.props.handleInputValue(this.props.allInBet);
    };

    handleResetBet = () => {
        this.props.handleInputValue(this.props.minBet);
    };

    render() {
        return (
            <div className="game__sidebar">
                {/*<button><i className='icon-refresh'/></button>*/}
                <button onClick={this.handleAddBet} data-add="10">+10</button>
                <button onClick={this.handleAddBet} data-add="100">+100</button>
                <button onClick={this.handleAddBet} data-add="1000">+1000</button>
                <button onClick={this.handleAddBet} data-add="10000">+10000</button>
                <button onClick={this.handleMultiplyBet}>x2</button>
                <button onClick={this.handleDivideBet}>1/2</button>
                <button onClick={this.handleAllIn}>All</button>
                <button onClick={this.handleResetBet}><i className='icon-garbage'/></button>
            </div>
        );
    }
}