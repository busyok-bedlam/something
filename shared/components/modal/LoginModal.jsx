import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import * as userActions     from './../../actions/userActions';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import ModalController from '../../lib/ModalController';
class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    cbHandleLogin(){
        location.href = '/api/auth/steam';
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                overlayClassName={"modal__overlay"}
                contentClassName={"modal modal-login"}>
                <div className="modal-login__wrapper">
                    <img src="static/images/logo.png" alt=""/>
                    <button
                        onClick={::this.cbHandleLogin}
                        className="button button-green">
                        <i className="icon icon-steam" />
                        Sign Up with STEAM<sup>TM</sup>
                    </button>
                    <div>
                        By signing in with Steam you agree that you have read and accept our <a onClick={()=>ModalController.openModal('TermsOfUsageModal', null, {onClose: ()=>{ModalController.openModal('LoginModal')}})}>Terms of Usage</a> and are at least 18 years old.
                    </div>
                </div>
            </Dialog>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal);