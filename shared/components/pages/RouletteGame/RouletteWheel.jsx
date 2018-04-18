import React, {Component} from 'react';
import DonutChart from "react-svg-donut-chart";
import roulette from '../../../../config/roulette.js';
import PropTypes from 'prop-types';

export default class RouletteWheel extends Component {
    static propTypes = {
        roulette: PropTypes.object.isRequired,
    };

    state = {
        status: '',
        angleLast: 0,
        timerSeconds: 20,
        donutData: [{value: (roulette.ROULETTE_TIMER), stroke: "#ff7900", strokeWidth: .5}]
    };

    componentWillUnmount() {
        this.setIntervalID && clearInterval(this.setIntervalID);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.status === this.props.status) return;
        this.animateRoulette(nextProps)
    }

    animateRoulette(componentProps) {
        let {ROULETTE_BETTING, ROULETTE_IN_GAME, ROULETTE_REWARDS} = roulette;
        let {status} = componentProps;
        switch (status) {
            case ROULETTE_BETTING: {
                this.setState({
                    status,
                    timerSeconds: null
                });
                this.setIntervalID && clearInterval(this.setIntervalID);
                this.seconds = componentProps.counter; //game
                this.setIntervalID = setInterval(() => {
                    setTimeout(() => this.timerBlock.classList.remove('zoom'), 500);
                    this.setState({
                        timerSeconds: this.seconds,
                        donutData: [
                            {value: (roulette.ROULETTE_TIMER - this.seconds), stroke: "#3a3f46", strokeWidth: .5},
                            {value: this.seconds, stroke: "#ff7900", strokeWidth: .5}
                        ]
                    });
                    this.gambleBlock.classList.remove('zoom');
                    this.timerBlock.classList.add('zoom');
                    if (this.seconds <= 0) {
                        return clearInterval(this.setIntervalID);
                    }
                    this.seconds--;
                }, 1000);
                break;
            }
            case ROULETTE_IN_GAME: {
                this.timerBlock.classList.remove('zoom');
                this.setIntervalID && clearInterval(this.setIntervalID);
                let {sector, angle} = componentProps; //game
                sector += 1;
                let angleWheel = - (24 * sector - (24 - angle));
                console.log(angleWheel);
                this.setState({
                    status,
                    angleLast: angleWheel,
                    donutData: [{value: (roulette.ROULETTE_TIMER), stroke: "#ff7900", strokeWidth: .5}]
                });
                this.gambleBlock.classList.add('zoom');
                this.wheelBlock.style.transition = '7s ease all';
                this.wheelBlock.style.transform = 'rotate(' + (1440 + angleWheel ) + 'deg)';
                setTimeout(() => this.gambleBlock.classList.remove('zoom'), 500);
                break;
            }
            case ROULETTE_REWARDS: {
                let {angle, sector} = componentProps; //game
                sector += 1;
                let angleWheel = - (24 * sector - (24 - angle));
                this.setState({
                    status,
                    donutData: [{value: (roulette.ROULETTE_TIMER), stroke: "#ff7900", strokeWidth: .5}]
                });
                this.gambleBlock.classList.remove('zoom');
                this.wheelBlock.style.transition = 'none';
                this.wheelBlock.style.transform = 'rotate('+ angleWheel + 'deg)';
                this.wheelWinnerBlock.style.transform = 'rotate(' + (12 - angle) + 'deg)';
                break;
            }
        }
    }

    render() {
        let {status, timerSeconds, donutData} = this.state;
        let {sector} = this.props.roulette || ""; //game
        let {ROULETTE_REWARDS} = roulette;
        let color = this.props.color;
        let lowCaseColor = color.substring(15).toLowerCase();

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
                        className="rWheel__timer-data"
                        ref={timer => this.timerBlock = timer}>{timerSeconds}</div>
                    <div className="rWheel__gamble"
                         ref={gamble => this.gambleBlock = gamble}>Go!
                    </div>
                    <div
                        className={(status === ROULETTE_REWARDS)
                            ? `rWheel__winner rWheel__winner-${lowCaseColor} zoom`
                            : `rWheel__winner rWheel__winner-${lowCaseColor}`}>
                        {sector}
                    </div>
                </div>
            </div>
        );
    }
}

