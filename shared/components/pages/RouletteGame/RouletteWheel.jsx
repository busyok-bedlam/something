import React, {Component} from 'react';
import DonutChart from "react-svg-donut-chart";

export default class RouletteWheel extends Component {
    render() {
        return (
            <div className="rWheel">
                <div className="rWheel__wrapper">
                    <object type="image/svg+xml" data="static/images/icons/roulette.svg">
                        Your browser does not support SVG.
                    </object>
                    {/*<DonutChart data={dataPie} />*/}
                </div>
            </div>
        );
    }
}

