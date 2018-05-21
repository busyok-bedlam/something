import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import Scrollbar from '../common/Scrollbar.jsx';
import ModalController from '../../lib/ModalController';
import NavLink from './../common/NavLink.jsx';
import config from '../../../config';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "../../actions/userActions";
import PropTypes from "prop-types";

const {MIN, MAX} = config.PAYMENTS;

class DepositModal extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            paymentAmount: 1,
        };
    }

    handleClose() {
        this.setState({open: false});
        setTimeout(ModalController.closeModal, 200);
    }

    componentDidMount() {
        let close = document.createElement('div');
        close.classList.add("modal__close");
        close.addEventListener('click', ::this.handleClose);
        document.getElementsByClassName('modal__overlay')[0].appendChild(close);
    }

    createPayment(method) {
        this.props.userActions.createPayment({method: method, amount: this.state.paymentAmount});
        this.handleClose();
    }

    handleChange = e => {
        let value = e.target.value;
        console.log(this.validateBet(value));
        this.setState({
            paymentAmount: this.validateBet(value) ? 1 : value,
        });
    };

    validateBet = value =>
        (!(/^[0-9]*$/.test(value)))
        || value === ''
        || parseInt(value) > MAX
        || parseInt(value) < MIN;

    render() {
        const {user} = this.props;
        return (
            <Dialog
                open={this.state.open}
                onRequestClose={::this.handleClose}
                overlayClassName={"modal__overlay"}
                contentClassName={"modal modal-deposit"}>
                <div className="modal-deposit__wrapper">
                    <div className="modal__header">
                        <h3>Deposit</h3>
                    </div>
                    <div className='modal-deposit__balance'>Balance <i className='icon-poker-piece'/> <span>{user.balance}</span>
                    </div>
                    <div style={{height: 'calc(80vh - 20rem)'}}>
                        <Scrollbar>
                            <div style={{padding: '0 2rem'}}>
                                <div className='modal-deposit__block'>
                                    <div className="modal-deposit__content">
                                        <h3>DEPOSIT WITH SKINS</h3>
                                        <img src="static/images/logo.png" alt='Blaze'/>
                                        <h4>Exchange your skins for coins. </h4>
                                        <div className='price'>
                                            For every <span>1 cent</span> you will receive <span>1 coin</span>.
                                            You can send up to <span>10 items</span> at a time.
                                        </div>
                                        <NavLink onClick={::this.handleClose} to='/deposit' className='button'>Deposit now</NavLink>
                                    </div>
                                </div>
                                <div className='modal-deposit__block'>
                                    {user.paymentStatus === 'FREE' ?
                                        <div className="modal-deposit__content">
                                            {/*<div className="modal-deposit__content modal-deposit__content-disabled">*/}
                                            {/*<div className="disabled">*/}
                                            {/*<img src="static/images/logo.png" alt='Blaze'/>*/}
                                            {/*<div>Coming soon</div>*/}
                                            {/*</div>*/}
                                            <h3>DEPOSIT WITH PAYMENT SYSTEMS</h3>
                                            {/*<img src="static/images/logo.png" alt='Blaze'/>*/}
                                            <h4>Exchange currency for coins</h4>
                                            <div className="modal-deposit__input">
                                                <input type="number"
                                                       value={this.state.paymentAmount}
                                                       name='paymentAmount'
                                                       min={MIN}
                                                       max={MAX}
                                                       onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className='modal-deposit__buttons'>
                                                <button className="modal-deposit__button modal-deposit__button-paypal"
                                                // method="paypal"
                                                onClick={this.createPayment.bind(this, 'PAYPAL')}
                                                />
                                                <button className="modal-deposit__button modal-deposit__button-bitcoin"
                                                // method="bitcoin"
                                                onClick={this.createPayment.bind(this, 'COINPAYMENTS')}
                                                />
                                                {/*<button className="modal-deposit__button modal-deposit__button-g2a"/>*/}
                                                {/*<button className="modal-deposit__button modal-deposit__button-gift"/>*/}
                                            </div>
                                            <NavLink to='/deposit' className='button'>Deposit now</NavLink>
                                        </div>
                                        :
                                        <div className="modal-deposit__content">
                                            <h3>DEPOSIT WITH PAYMENT SYSTEMS</h3>
                                            <a href={user.paymentURL}>You have unfinished payment</a>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Scrollbar>
                    </div>
                </div>
            </Dialog>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal);
