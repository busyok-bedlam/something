import React, {Component} from 'react';

export default class BetButtons extends Component {
    handleAddBet = e => {
        let addValue = e.target.getAttribute('data-add');
        this.props.handleChange(this.props.bet + parseInt(addValue))
    };

    handleMultiplyBet = () => {
        this.props.handleChange(this.props.bet * 2);
    };

    handleDivideBet = () => {
        this.props.handleChange(Math.round(this.props.bet / 2));
    };

    handleAllIn = () => {
        this.props.handleChange(this.props.allIn);
    };

    handleResetBet = () => {
        this.props.handleChange(0);
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