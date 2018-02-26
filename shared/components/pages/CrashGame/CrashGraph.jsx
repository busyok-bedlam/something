import React, {Component} from "react";
import PropTypes          from 'prop-types';
import 'chart.js/dist/Chart.bundle.min';

//x - time
//y - profit

const gameData = [
    {y: 1, x: 0},
    {y: 1, x: 0},
];


export default class CrashGraph extends Component {
    static types = {
        GOOD: 'GOOD',
        BAD: 'BAD'
    };

    state = {
        profit: 1,
    };

    componentDidMount() {
        this.chartContainer = this.refs.chartContainer.getContext('2d');
        const gradientStroke = this.chartContainer.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#e45484");
        gradientStroke.addColorStop(1, "#44b982");
        this.chart = new Chart(this.chartContainer, {
            responsive: true, //resize canvas when container resized
            type: 'line',
            data: {
                datasets: [{
                    label: 'time',
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointBorderWidth: 5,
                    pointHoverRadius: 0,
                    pointHoverBorderWidth: 0,
                    pointRadius: 0,
                    fill: false,
                    borderWidth: 4,
                    data: gameData,
                }],
                cubicInterpolationMode: 'default',
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        autoSkip: true,
                    }],
                    yAxes: [{
                        type: 'linear',
                        autoSkip: true,
                    }]
                }
            }
        });

        // setInterval(() => {
        //     const lastGameData = gameData[gameData.length - 1];
        //     // gameData[gameData.length - 1]={
        //     // const newTime = parseFloat((lastGameData.x +0.1).toFixed(3));
        //     gameData.push({
        //         x: parseFloat((lastGameData.x +0.01).toFixed(3)),
        //         y: parseFloat((lastGameData.y * 1.001).toFixed(3)),
        //     });
        //     const labels = [];
        //     gameData.forEach(data=>{
        //         labels.push(data.x+'s');
        //     });
        //     this.chart.data.datasets[0].data = gameData;
        //     this.chart.data.labels = labels;
        //     this.chart.update();
        //     this.setState({profit: gameData[gameData.length - 1].y});
        //
        //
        // }, 10);
    }

    render() {
        const {result} = this.props;
        let profitClass = 'graph';
        switch (result) {
            case CrashGraph.types.GOOD:
                profitClass = 'graph graph-good';
                break;
            case CrashGraph.types.BAD:
                profitClass = 'graph graph-bad';
                break;
        }
        let profit = this.state.profit.toFixed(2);
        return (
            <div className={profitClass}>
                <div className="graph__back">
                    <div className="graph__content">
                        <div className="graph__header"><span>Max profit:</span>
                            $ 100 000
                        </div>
                        <canvas ref="chartContainer"/>
                        {/*<span className="graph__coeff">{this.state.profit.toFixed(2)}x</span>*/}
                        <span className="graph__coeff">
                            <span className='int'>{parseInt(profit)}</span>
                            .
                            <span className='double'>{(profit-parseInt(profit)).toFixed(2).slice(2)}</span>
                            x
                        </span>
                    </div>
                </div>
                <div className="graph__footer">
                    <span>53 players updating...</span>
                    <span>$ 325.42</span>
                </div>
            </div>
        );
    }
}

CrashGraph.propTypes = {
    result: PropTypes.string
};