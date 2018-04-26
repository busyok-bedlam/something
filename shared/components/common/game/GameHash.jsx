import React, {Component} from 'react';
import ModalController from '../../../lib/ModalController';
import PropTypes from 'prop-types';

export default class GameHash extends Component {
    static propTypes = {
        _id: PropTypes.object.isRequired,
        hash: PropTypes.string.isRequired,
    };

    render() {
        let {_id, hash, roundNumber, status} = this.props;
        // console.log(hash);
        return (
            <div className="game__hash">
                <div className="left">
                    <b>{`# ${_id}`}</b>
                    <a onClick={() => ModalController.openModal('FairGameModal')}>Fair game</a>
                </div>
                <div className="right">
                    <b>Hash round: </b>
                    <div>{hash}</div>
                    {/*<b>Round number: </b> {roundNumber && status !== 'ROULETTE_IN_GAME' ? roundNumber : ''}*/}
                    <b>Round number: </b> {roundNumber}
                </div>
            </div>
        );
    }
}