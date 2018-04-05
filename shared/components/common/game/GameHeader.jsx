import React, {Component} from 'react';
import ModalController from '../../../lib/ModalController';

export default class GameHeader extends Component {
    render() {
        return (
            <div className="game__header">
                <div className='balance'>Balance: <i className='icon-poker-piece'/><span>{this.props.user.balance}</span></div>
                <button
                    onClick={() => ModalController.openModal('DepositModal')}
                    className='button'>Deposit now</button>
            </div>
        );
    }
}