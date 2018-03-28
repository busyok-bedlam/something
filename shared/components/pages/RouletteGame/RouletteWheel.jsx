import React, {Component} from 'react';
import DonutChart from "react-svg-donut-chart";
import jackpot from '../../../../config/jackpot.js';

const dataPie = [
    {value: 5, stroke: "#3a3f46", strokeWidth: .5},
    {value: 6, stroke: "#ff7900", strokeWidth: .5},
];

export default class RouletteWheel extends Component {
    state = {
        status: ''
    };

    componentWillReceiveProps(nextProps) {
        let {JACKPOT_BETTING, JACKPOT_IN_GAME, JACKPOT_REWARDS} = jackpot;
        let {status} = nextProps.jackpot;
        switch (status) {
            case JACKPOT_BETTING: {
                this.setState({
                    status
                });
                break;
            }
            case JACKPOT_IN_GAME: {
                this.setState({
                    status
                });
                break;
            }
            case JACKPOT_REWARDS: {
                this.setState({
                    status
                });
                break;
            }
        }
    }

    render() {
        let {status,} = this.state;
        let {JACKPOT_BETTING, JACKPOT_IN_GAME, JACKPOT_REWARDS} = jackpot;
        return (
            <div className="rWheel">
                <div className={'rWheel__wrapper'}>
                    <div>
                        <object type="image/svg+xml" data="static/images/icons/roulette.svg">
                            Your browser does not support SVG.
                        </object>
                        <object className='rWheel__pointer' type="image/svg+xml" data="static/images/icons/pointer.svg">
                            Your browser does not support SVG.
                        </object>
                        <div className='rWheel__timer'>
                            <DonutChart data={dataPie}/>
                        </div>
                            <div className={(status === JACKPOT_BETTING) ? "rWheel__timer-data zoom" : "rWheel__timer-data"}>5</div>
                            <div className={(status === JACKPOT_IN_GAME) ? "rWheel__gamble zoom" : "rWheel__gamble"}>Gamble!</div>
                            {/* TODO: Change color: ..-color1 (2 or 3)*/}
                            <div className={(status === JACKPOT_REWARDS) ? "rWheel__winner rWheel__winner-color1 zoom" : "rWheel__winner rWheel__winner-color1"}>11</div>
                    </div>
                </div>
            </div>
        );
    }
}

