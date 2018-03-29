import React, {Component} from 'react';
import DonutChart from "react-svg-donut-chart";
import roulette from '../../../../config/roulette.js';

export default class RouletteWheel extends Component {
    state = {
        status: '',
        timerSeconds: null,
        donutData: []
    };

    componentWillReceiveProps(nextProps) {
        let {ROULETTE_BETTING, ROULETTE_IN_GAME, ROULETTE_REWARDS} = roulette;
        let {status} = nextProps.roulette;
        switch (status) {
            case ROULETTE_BETTING: {
                this.setState({
                    status
                });
                let endDate = nextProps.roulette.game.date;
                this.seconds = Math.round((endDate.getTime() - new Date().getTime()) / 1000);
                this.setIntervalID = setInterval(() => {
                    this.timer.classList.remove('zoom');
                    this.setState({
                        timerSeconds: this.seconds,
                        donutData: [
                            {value: (roulette.ROULETTE_TIMER - this.seconds), stroke: "#3a3f46", strokeWidth: .5},
                            {value: this.seconds, stroke: "#ff7900", strokeWidth: .5}
                        ]
                    });
                    this.timer.classList.add('zoom');
                    this.seconds--;
                    if (this.seconds < 0) {
                        clearInterval(this.setIntervalID)
                    }
                }, 1000);
                break;
            }
            case ROULETTE_IN_GAME: {
                this.setState({
                    status
                });
                setTimeout(() => this.gamble.classList.remove('zoom'), 500);
                break;
            }
            case ROULETTE_REWARDS: {
                this.setState({
                    status
                });
                break;
            }
        }
    }

    render() {
        let {status, timerSeconds, donutData} = this.state;
        let {ROULETTE_BETTING, ROULETTE_IN_GAME, ROULETTE_REWARDS} = roulette;
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
                            <DonutChart data={donutData}/>
                        </div>
                        <div
                            className={(status === ROULETTE_BETTING) ? "rWheel__timer-data zoom" : "rWheel__timer-data"} ref={timer => this.timer = timer}>{timerSeconds}</div>
                        <div className={(status === ROULETTE_IN_GAME) ? "rWheel__gamble zoom" : "rWheel__gamble"}
                             ref={gamble => this.gamble = gamble}>Gamble!
                        </div>
                        {/* TODO: Change color: ..-color1 (2 or 3)*/}
                        <div
                            className={(status === ROULETTE_REWARDS) ? "rWheel__winner rWheel__winner-color1 zoom" : "rWheel__winner rWheel__winner-color1"}>11
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

