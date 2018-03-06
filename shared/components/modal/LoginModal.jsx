import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from './../../actions/userActions';
import Dialog from 'material-ui/Dialog';
import ModalController from '../../lib/ModalController';

class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            agree: false
        };
    }

    cbHandleLogin() {
        location.href = '/api/auth/steam';
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.checked
        });
    }

    componentDidMount() {
        this.props.router.push('/some/path')
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                overlayClassName={"modal__overlay"}
                contentClassName={"modal modal-login"}>
                <div className="modal-login__wrapper">
                    <object type="image/svg+xml" data="static/images/logo.svg">
                        Your browser does not support SVG.
                    </object>
                    <div className="checkbox__wrapper">
                        <div className="checkbox">
                            <input type="checkbox" name="agree" id="agree" checked={this.state.agree} onChange={this.handleChange.bind(this)}/>
                            <label htmlFor="agree"/>
                        </div>
                        <span>
                        I am over 18 years old and have read
                            <a
                                onClick={() => ModalController.openModal('TermsOfServiceModal', null, {
                                    onClose: () => {
                                        ModalController.openModal('LoginModal')
                                    }
                                })}>Terms of Service</a>
                        </span>
                    </div>
                    <button
                        disabled={!this.state.agree}
                        onClick={::this.cbHandleLogin}
                        className="button">
                        Enter now
                    </button>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal);