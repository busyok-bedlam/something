import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import Scrollbar from '../common/Scrollbar.jsx';
import ModalController from '../../lib/ModalController';

export default class ProvablyFairModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    handleClose() {
        this.setState({open: false});
        setTimeout(ModalController.closeModal, 200);
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                onRequestClose={::this.handleClose}
                overlayClassName={"modal__overlay"}
                contentClassName={"modal probably-fair"}>
                <div onClick={::this.handleClose} className="modal__close"/>
                <div className="deposit__header deposit__header-green">
                    <h3>Provably Fair</h3>
                </div>
                <div style={{ height: 'calc(80vh - 80px)'}}>
                    <Scrollbar>
                        <h4>How it Works</h4>
                        <p className='green-line'>We have generated a chain of 10 million SHA256 hashes for each game, starting with a server secret that has been repeatedly fed the output of SHA256 back into itself 10 million times.</p>
                        <h4>Verification</h4>
                        <p className='green-line'>Anyone can easily verify integrity of the chain. We're publishing a game's hash immediately after the game ends. By checking that the SHA256 hash of that game's hash is the game's hash of the previous game you can make sure that we were not able to modify the result.
                            <br />The sample code to generate games hashes and calculate "Crash" results based can be found <a href="">here</a></p>
                    </Scrollbar>
                </div>
            </Dialog>
        );
    }
}