import React, {Component} from 'react';
import DonutChart from "react-svg-donut-chart";

const dataPie = [
    {value: 5, stroke: "#3a3f46", strokeWidth: .5},
    {value: 6, stroke: "#ff7900", strokeWidth: .5},
];

export default class RouletteWheel extends Component {
    render() {
        return (
            <div className="rWheel">
                {/*TODO: add class for showing ...-waiting - for timer $; ...-gamble - at start; ...-winner */}
                <div className="rWheel__wrapper rWheel__wrapper-winner">
                    <object type="image/svg+xml" data="static/images/icons/roulette.svg">
                        Your browser does not support SVG.
                    </object>
                    <object className='rWheel__pointer' type="image/svg+xml" data="static/images/icons/pointer.svg">
                        Your browser does not support SVG.
                    </object>
                    <div className='rWheel__timer'>
                        <DonutChart data={dataPie}/>
                    </div>
                    <div className="rWheel__timer-data">5</div>
                    <div className="rWheel__gamble">Gamble!</div>
                    {/* TODO: Change color: ..-color1 (2 or 3)*/}
                    <div className="rWheel__winner rWheel__winner-color1">11</div>
                </div>
            </div>
        );
    }
}

