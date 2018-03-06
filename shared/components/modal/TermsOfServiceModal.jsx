import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Dialog from 'material-ui/Dialog';
import Scrollbar from '../common/Scrollbar.jsx';
import ModalController from '../../lib/ModalController';
import * as userActions from './../../actions/userActions';
import PropTypes from 'prop-types';

class TermsOfUsageModal extends Component {
    static propTypes = {
        modal: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            agree: false
        };
    }

    handleClose() {
        this.setState({open: false});
        this.props.modal.data.onClose ? this.props.modal.data.onClose() : setTimeout(ModalController.closeModal, 200);
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.checked
        });
    }

    cbHandleLogin() {
        location.href = '/api/auth/steam';
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                onRequestClose={::this.handleClose}
                overlayClassName={"modal__overlay"}
                contentClassName={"modal modal-content"}>
                <div onClick={::this.handleClose} className="modal__close"/>
                <div className="modal__header">
                    <h3>Terms of Service</h3>
                </div>
                <div style={{ height: 'calc(80vh - 25rem)'}}>
                    <Scrollbar>
                        <div style={{padding: '0 40px 0 20px'}}>
                            <h2>1. LOREM IPSUM DOLOR</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                            </p>
                            <h2>2. LOREM IPSUM DOLOR</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                            </p>
                            <h2>3. LOREM IPSUM DOLOR</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                            </p>
                        </div>
                    </Scrollbar>
                </div>
                <div className="button__wrapper">
                    <div className="checkbox__wrapper">
                        <div className="checkbox">
                            <input type="checkbox" name="agree" id="agree" checked={this.state.agree} onChange={this.handleChange.bind(this)}/>
                            <label htmlFor="agree"/>
                        </div>
                        <span>I am over 18 years old and have read Terms of Service</span>
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
    const {
        modal,
    } = state;
    return {
        modal,
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TermsOfUsageModal);