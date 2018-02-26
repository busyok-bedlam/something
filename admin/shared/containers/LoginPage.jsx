import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as adminActions from '../actions/adminActions';

import Login from '../components/Login.jsx';


class LoginPage extends React.Component {

    static mapStateToProps(state) {
        return {
            user: state.admin,
        }
    }

    static mapDispatchToProps(dispatch) {
        return {
            adminActions: bindActionCreators(adminActions, dispatch)
        }
    }

    render() {
        return (
            <Login
                user={this.props.user}
                adminActions={this.props.adminActions}
            />
        );
    }
}

export default connect(
    LoginPage.mapStateToProps,
    LoginPage.mapDispatchToProps
)(Login);
