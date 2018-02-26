import React, {Component} from "react";


export default class WithdrawalsTab extends Component {
    render() {
        return (
            <div className='account__table'>
                <div className="account__table-header">
                    <div>Date</div>
                    <div>Total</div>
                    <div className='desc'>Details</div>
                </div>
                <div className="account__table-row">
                    <div className="content">
                        <div>22.02.18</div>
                        <div>$ 11.23</div>
                        <div className='desc'>AK-47 | Blue Laminate (Minimal wear)</div>
                        <div className='text-green ttu'>Accepted</div>
                    </div>
                </div>
                <div className="account__table-row">
                    <div className="content">
                        <div>22.02.18</div>
                        <div>$ 11.23</div>
                        <div className='desc'>AK-47 | Blue Laminate (Minimal wear)</div>
                        <div className='text-pink ttu'>Cancelled</div>
                    </div>
                </div>
                <button className="button button-green">Refresh</button>
            </div>
        )
    }
}