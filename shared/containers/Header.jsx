import React                from 'react';
import {bindActionCreators} from 'redux';
import {connect}            from 'react-redux';
import PropTypes            from 'prop-types';
import * as userActions     from '../actions/userActions';
import HeaderComponent      from '../components/common/Header.jsx';
import {LoadingScreen}      from '../lib/LoadingScreen';
import {toast}              from 'react-toastify';
import CommonSocket from "../lib/commonWS";

class Header extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
        roulette: PropTypes.object.isRequired,
        crash: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.socket = CommonSocket.start();
    }

    componentWillUnmount() {
        CommonSocket.start()
            .then(instance => instance.close());
    }

    async cbHandleLogout(){
        try {
            LoadingScreen.open();
            const {userActions} = this.props;
            await userActions.logout();
            location.href = '/';
        } catch (error) {
            console.error(error);
            toast(error.message || error.toString());
        } finally {
            LoadingScreen.close();
        }
    }

    render() {
        const {user, roulette, crash} = this.props;
        return (
            <HeaderComponent
                totalRoulette={roulette.total}
                totalCrash={crash.total}
                isAuth={user.isAuth}
                displayName={user.displayName}
                avatar={user.avatarFull}
                balance={user.balance}
                cbHandleLogout={::this.cbHandleLogout}
                location={this.props.location}
            />
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
)(Header);
