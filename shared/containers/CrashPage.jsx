import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions/userActions';
import * as crashActions from '../actions/crashActions';
import Crash from "../components/pages/Crash.jsx";
import CrashSocket from "../lib/crashWS";
import {toast} from 'react-toastify';

class CrashPage extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        crash: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
        crashActions: PropTypes.object.isRequired,
    };

    state = {
        bet: 0,
        isInventoryLoading: false,
    };

    componentDidMount() {
        this.socket = CrashSocket.start();
    }

    componentWillUnmount() {
        CrashSocket.start()
            .then(instance => instance.close());
    }

    cbHandleNewBet(bet) {
        const {crashActions, user} = this.props;
        console.log(user);

        if (user.blocked) {
            toast('You are blocked');
        } else if (!user.isAuth){
            toast('You are not logged in');
        } else {
            crashActions.crashNewBet(bet);
        }
    }

    cbHandleCashOut() {
        const {crashActions} = this.props;
        crashActions.crashCashOut();

    }


    lobbyHandleChangeValue(value) {
        this.setState({
            bet: parseInt(value)
        })
    }

    render() {
        const {
            user,
            crash,
        } = this.props;
        let {bet, isInventoryLoading} = this.state;

        return (
            <Crash
                user={user}
                crash={crash}
                bet={bet}
                isInventoryLoading={isInventoryLoading}
                lobbyHandleChangeValue={::this.lobbyHandleChangeValue}
                cbHandleNewBet={::this.cbHandleNewBet}
                cbHandleCashOut={::this.cbHandleCashOut}
            />
        );
    }
}

function mapStateToProps(state) {
    const {
        user,
        crash,
    } = state;
    return {
        user,
        crash,
    };
}

function mapDispatchToProps(dispatch) {

    CrashSocket.setDispatch(dispatch);

    return {
        userActions: bindActionCreators(userActions, dispatch),
        crashActions: bindActionCreators(crashActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrashPage);
