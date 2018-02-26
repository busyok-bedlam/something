import React                from 'react';
import {bindActionCreators} from 'redux';
import {connect}            from 'react-redux';
import PropTypes            from 'prop-types';
import * as userActions     from '../actions/userActions';
import HeaderComponent      from '../components/common/Header.jsx';
import {LoadingScreen}      from '../lib/LoadingScreen';
import {toast}              from 'react-toastify';

class Header extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
    };

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
        const {user} = this.props;
        return (
            <HeaderComponent
                isAuth={user.isAuth}
                displayName={user.displayName}
                avatar={user.avatarFull}
                cbHandleLogout={::this.cbHandleLogout}
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
