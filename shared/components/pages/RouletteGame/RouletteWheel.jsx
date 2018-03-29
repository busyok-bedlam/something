import React, {Component} from 'react';
import DonutChart from "react-svg-donut-chart";
import roulette from '../../../../config/roulette.js';

export default class RouletteWheel extends Component {
    state = {
        status: '',
        timerSeconds: 20,
        donutData: [{value: (roulette.ROULETTE_TIMER), stroke: "#ff7900", strokeWidth: .5}]
    };

    componentWillReceiveProps(nextProps) {
        let {ROULETTE_BETTING, ROULETTE_IN_GAME, ROULETTE_REWARDS} = roulette;
        let {status} = nextProps.roulette;
        switch (status) {
            case ROULETTE_BETTING: {
                this.setState({
                    status,
                    timerSeconds: null,
                    donutData: [{value: (roulette.ROULETTE_TIMER), stroke: "#ff7900", strokeWidth: .5}]
                });
                this.setIntervalID && clearInterval(this.setIntervalID);
                this.seconds = 0;
                let endDate = nextProps.roulette.game.date;
                this.seconds = Math.round((endDate.getTime() - new Date().getTime()) / 1000);
                this.setIntervalID = setInterval(() => {
                    setTimeout(() => this.timerBlock.classList.remove('zoom'), 500);
                    this.setState({
                        timerSeconds: this.seconds,
                        donutData: [
                            {value: (roulette.ROULETTE_TIMER - this.seconds), stroke: "#3a3f46", strokeWidth: .5},
                            {value: this.seconds, stroke: "#ff7900", strokeWidth: .5}
                        ]
                    });
                    this.timerBlock.classList.add('zoom');
                    if (this.seconds <= 0) {
                        return clearInterval(this.setIntervalID);
                    }
                    this.seconds--;
                }, 1000);
                break;
            }
            case ROULETTE_IN_GAME: {
                this.setState({
                    status,
                    donutData: [{value: (roulette.ROULETTE_TIMER), stroke: "#ff7900", strokeWidth: .5}]
                });
                this.gambleBlock.classList.add('zoom');
                this.wheelBlock.style.transform = 'rotate(' + (1440 + 7) + 'deg)';
                setTimeout(() => this.gambleBlock.classList.remove('zoom'), 500);
                break;
            }
            case ROULETTE_REWARDS: {
                this.setState({
                    status,
                    donutData: [{value: (roulette.ROULETTE_TIMER), stroke: "#ff7900", strokeWidth: .5}]
                });
                this.wheelWinnerBlock.style.transform = 'rotate(' + 7 + 'deg)';
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
                    <div className="rWheel__roulette" ref={wheel => this.wheelBlock = wheel}/>
                    <div className={(status === ROULETTE_REWARDS) ? "rWheel__pointer move" : "rWheel__pointer"}/>
                    <div
                        className={(status === ROULETTE_REWARDS) ? "rWheel__roulette-winner" : "rWheel__roulette-winner hide"}
                        ref={winner => this.wheelWinnerBlock = winner}/>
                    <div className='rWheel__timer'>
                        <DonutChart data={donutData}/>
                    </div>
                    <div
                        className={(status === ROULETTE_BETTING) ? "rWheel__timer-data zoom" : "rWheel__timer-data"}
                        ref={timer => this.timerBlock = timer}>{timerSeconds}</div>
                    <div className={(status === ROULETTE_IN_GAME) ? "rWheel__gamble zoom" : "rWheel__gamble"}
                         ref={gamble => this.gambleBlock = gamble}>Gamble!
                    </div>
                    {/* TODO: Change color: ..-color1 (2 or 3)*/}
                    <div
                        className={(status === ROULETTE_REWARDS) ? "rWheel__winner rWheel__winner-color1 zoom" : "rWheel__winner rWheel__winner-color1"}>11
                    </div>
                </div>
            </div>
        );
    }
}

