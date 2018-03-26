import React, {Component} from 'react';
import ModalController from '../../../lib/ModalController';

export default class GameHash extends Component {
    render() {
        return (
            <div className="game__hash">
                <div className="left">
                    <b>№ 11239912323</b>
                    <a onClick={() => ModalController.openModal('FairGameModal')}>Fair game</a>
                </div>
                <div className="right">
                    <b>Hash round: </b>
                    <div>9370afdf275940f5df8c5a198a1c7492803139aa31
                        346bce4698463b
                    </div>
                    <b>Round number: </b>8
                </div>
            </div>
        );
    }
}