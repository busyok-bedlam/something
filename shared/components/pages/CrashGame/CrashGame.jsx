import React, {Component} from 'react';
import ModalController from '../../../lib/ModalController';

export default class CrashGame extends Component {
    render() {
        return (
            <div className='cGame'>
                <div className="game__header">
                    <div className='balance'>Balance: <i className='icon-poker-piece'/><span>1123</span></div>
                    <button
                        onClick={() => ModalController.openModal('DepositModal')}
                        className='button'>Deposit now</button>
                </div>
                <div className="cGame__header">Max-profit:<i className='icon-poker-piece'/>12325.42</div>
            </div>
        );
    }
}