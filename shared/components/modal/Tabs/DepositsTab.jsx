import React, {Component}   from "react";
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux';
import {toast}              from 'react-toastify';
import * as userActions     from '../../../actions/userActions';
import botsConfig           from '../../../../config/bots';

class DepositsTab extends Component {

    async componentDidMount(){
        try {
            const {userActions} = this.props;
            await userActions.loadTradeHistory(botsConfig.TRADE_TYPE.DEPOSIT);
        } catch (error){
            console.error(error);
            toast(error.message || error.toString(), 'error');
        }
    }

    __renderTrades(){
        const {trades} = this.props.user;
        const list = [];
        trades.forEach((trade, i)=>{
            list.push(
                <div
                    key={i}
                    className="account__table-row">
                    <div className="content">
                        <div>22.02.18</div>
                        <div>$ 11.23</div>
                        <div className='desc'>AK-47 | Blue Laminate (Minimal wear)</div>
                        <div className='text-green ttu'>{trade.status}</div>
                    </div>
                </div>
            );
        });
        return list;
    }

    render() {
        return (
            <div className='account__table'>
                <div className="account__table-header">
                    <div>Date</div>
                    <div>Total</div>
                    <div className='desc'>Details</div>
                </div>
                {this.__renderTrades()}
                <button className="button button-green">Refresh</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        user,
    } = state;
    return {
        user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(DepositsTab);