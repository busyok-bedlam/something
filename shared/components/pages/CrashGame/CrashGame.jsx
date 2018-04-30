import React, {Component} from 'react';
import GameHeader from '../../common/game/GameHeader.jsx';
import 'chart.js/dist/Chart.bundle.min';
import PropTypes from "prop-types";

export default class CrashGame extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        crash: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            gameStatus: 'FINISHED',
            gameCreatedAt: 0,
            waitingTime: 0,
            profit: 1,
            gameData: [{y: 1, x: 0}, {y: 1, x: 0},],
            result: '',
        };
    }

    componentDidMount() {
        this.chartContainer = this.refs.chartContainer.getContext('2d');
        const gradientStroke = this.chartContainer.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#ff7900");
        this.chart = new Chart(this.chartContainer, {
            responsive: true, //resize canvas when container resized
            type: 'line',
            data: {
                datasets: [{
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointBorderWidth: 3,
                    pointHoverRadius: 0,
                    pointHoverBorderWidth: 0,
                    pointRadius: 0,
                    fill: false,
                    borderWidth: 4,
                    data: this.state.gameData,
                    cubicInterpolationMode: 'monotone',
                }],
            },
            options: {
                legend: {
                    display: false,
                },
                animation: {
                    duration: 100,
                    xAxis: true,
                    yAxis: true,
                },
                scales: {
                    xAxes: [{
                        type: 'linear',
                        autoSkip: false,
                        ticks: {
                            callback: (value) => value + 's',
                            suggestedMax: 8,
                            maxTicksLimit: 8,
                            min: 0,
                        },
                    }],
                    yAxes: [{
                        type: 'linear',
                        autoSkip: false,
                        ticks: {
                            callback: (value) => value + 'x',
                            suggestedMax: 6,
                            min: 1,
                            maxTicksLimit: 6,
                        }
                    }]
                }
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.setState({gameStatus: 'FINISHED'});
    }

    componentWillReceiveProps(nextProps) {
        const game = nextProps.crash.currentCrashGame;
        // console.log(game);
        if (game && !Object.keys(game).length) {
            // console.log('clear interval', game);
            clearInterval(this.timer);
            this.setState({
                gameData: [{y: 1, x: 0}, {y: 1, x: 0},],
            });
            this.chart.data.datasets[0].data = [{y: 1, x: 0}, {y: 1, x: 0},];
            this.chart.update();
        }

        if (game && game.status === 'BETTING' && this.state.gameStatus !== 'BETTING') {
            let waitingTime = 8700 > (game.waitingTime - 500) ? (game.waitingTime - 500)/1000 : 8.7;
            this.setState({
                gameStatus: game.status,
                gameCreatedAt: game.createdAt,
                profit: 1,
                waitingTime: waitingTime.toFixed(1),
                gameData: [{y: 1, x: 0}, {y: 1, x: 0},],
                result: '',
            });
            this.chart.data.datasets[0].data = [{y: 1, x: 0}, {y: 1, x: 0},];
            this.chart.update();
            this.timer = setInterval(() => {
                if (this.state.waitingTime > 0) {
                    let waitingTime = this.state.waitingTime - 0.1;
                    this.setState({waitingTime: waitingTime.toFixed(1)});
                }
            }, 100);
        }

        if (this.state.waitingTime < 0) {
            clearInterval(this.timer);
            this.setState({
                waitingTime: 0,
            });
        }

        // if (game && game.status === 'IN_GAME' && game.gameStart && this.props.crash.currentCrashGame.status !== 'IN_GAME') {
        if (game && game.status === 'IN_GAME' && game.gameStart && this.state.gameStatus !== 'IN_GAME') {
            clearInterval(this.timer);
            let currentTime = game.currentTime > 0 ? game.currentTime/1000 : 0;
            this.timer = setInterval(() => {
                let profit = (1 + 0.03 * currentTime * currentTime / 2).toFixed(3);
                this.setState({
                    gameStatus: game.status,
                    profit: profit,
                });
                let points = [{y: 1, x: 0}, {y: 1, x: 0.3}];
                for (let i = 2; i < 4; i++) {
                    let time = currentTime/(4 - i);
                    let value = (1 + 0.03 * time * time / 2);
                    points[i] = {
                        y: parseFloat(value),
                        x: time,
                    };
                }
                currentTime += 0.04;
                this.setState({gameData: points});
                this.chart.data.datasets[0].data = this.state.gameData;
                this.chart.update();
                this.setState({profit: this.state.gameData[this.state.gameData.length - 1].y});
            }, 40);
        }

        if (game && game.status === 'REWARDS') {
            clearInterval(this.timer);
            this.setState({
                gameStatus: game.status,
                profit: game.value,
            });
        }
    }

    render() {
        let waitingTIme = this.state.waitingTime ? this.state.waitingTime : 0;
        let profit = this.state.profit;
        return (
            <div className='cGame'>
                <GameHeader user={this.props.user}/>
                {/*<div className="cGame__content cGame__content-crashed">*/}
                <div className={`cGame__content ${this.state.gameStatus !== 'IN_GAME' ? 'cGame__content-crashed' : ''}`}>
                    {/*cGame__content-crashed - add class for overlay*/}
                    <div className="cGame__header">Max-profit:<i className='icon-poker-piece'/><span>12325.42</span></div>
                    <div className="cGame__graph">
                        <canvas ref="chartContainer"/>
                        { this.state.gameStatus === 'BETTING' ?
                                <div className="cGame__caption">
                                    <div className="next-round">Next round in <span>{waitingTIme}</span> sec</div>
                                </div>
                            :
                                this.state.gameStatus === 'REWARDS' ?
                                    <div className="cGame__caption">
                                        <span className="crashed">Crashed</span>
                                        <span className='coeff'>
                                            {parseInt(profit)}
                                            .
                                            {(Math.floor((profit-parseInt(profit)) * 100)/100).toFixed(2).slice(2)}
                                            x
                                        </span>
                                    </div>
                                :
                                <div className="cGame__caption">
                                    <span className='coeff'>
                                    {parseInt(profit)}
                                    .
                                    {(Math.floor((profit-parseInt(profit)) * 100)/100).toFixed(2).slice(2)}
                                    x
                                    </span>
                                </div>
                        }
                </div>
                </div>
            </div>
        );
    }
}