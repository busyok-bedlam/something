import React, {Component} from "react";


export default class BetHistoryTab extends Component {
    render() {
        return (
            <div className='account__table'>
                <div className="account__table-header">
                    <div>Date</div>
                    <div>Profit</div>
                    <div>x</div>
                    <div className='desc'>Skins</div>
                </div>
                <div className="account__table-row">
                    <div className="content">
                        <div>22.02.18</div>
                        <div>$ 11.23</div>
                        <div>12.1x</div>
                        <div className='desc'>AK-47 | Blue Laminate (Minimal wear)</div>
                    </div>
                </div>
                <div className="account__table-row">
                    <div className="content">
                        <div>22.02.18</div>
                        <div>$ 11.23</div>
                        <div>12.1x</div>
                        <div className='desc'>AK-47 | Blue Laminate (Minimal wear)</div>
                    </div>
                </div>
                <button className="button button-green">Refresh</button>
            </div>
        )
    }
}