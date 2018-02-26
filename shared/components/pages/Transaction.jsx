import React, {Component} from "react";
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

export default class Transaction extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            days: 15
        }
    }

    handleOnChange = (value) => {
        this.setState({
            days: value
        });
    };

    handleOnComplete = () => {
        alert('Change completed');
    };

    render() {
        return (
            <div className="transaction">
                <div className="row">
                    <div className="col-md-7">
                        <h2 className="main-header">Transaction</h2>
                        <div>Lorem ipsum dolor sit amet, consectetur
                            adipisicingelit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim
                        </div>
                        <InputRange
                            maxValue={60}
                            minValue={2}
                            value={this.state.days}
                            formatLabel={value => `${value} days`}
                            onChangeComplete={this.handleOnComplete}
                            onChange={this.handleOnChange}/>
                    </div>
                    <div className="col-12">
                        <div className="transaction__wrapper">
                            <div className="transaction__head">
                                <div className="date">Date <i
                                    className="icon-sort"/></div>
                                <div>Type <i className="icon-sort"/></div>
                                <div>Method <i className="icon-sort"/></div>
                                <div>Amount <i className="icon-sort"/></div>
                                <div>Status <i className="icon-sort"/></div>
                            </div>
                            <div className="transaction__info">
                                <div className="date">22.12.2017</div>
                                <div>Deposit</div>
                                <div>Paysera</div>
                                <div>10000</div>
                                <div>Pending</div>
                            </div>
                            <div className="transaction__info">
                                <div className="date">22.12.2017</div>
                                <div>Deposit</div>
                                <div>Paysera</div>
                                <div>10000</div>
                                <div>Pending</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

