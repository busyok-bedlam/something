import React, {Component} from 'react';
import ModalController from '../../../lib/ModalController';
import PropTypes from 'prop-types';

export default class GameHash extends Component {
    static propTypes = {
        _id: PropTypes.string,
        hash: PropTypes.string,
    };

    render() {
        let {gameID, hash} = this.props;
        // console.log(hash);
        return (
            <div className="game__hash">
                <div className="left">
                    <b>{`# ${gameID}`}</b>
                    <a onClick={() => ModalController.openModal('FairGameModal')}>Fair game</a>
                </div>
                <div className="right">
                    <b>Hash round: </b>
                    <div>{hash}</div>
                </div>
            </div>
        );
    }
}