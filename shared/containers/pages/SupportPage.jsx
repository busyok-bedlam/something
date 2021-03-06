import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "./../../actions/userActions";
import Support from './../../components/pages/Support.jsx';
import api from './../../api';

class SupportPage extends Component {
    static mapStateToProps(state) {
        const {
            user,
        } = state;
        return {
            user,
        };
    }

    static mapDispatchToProps(dispatch) {
        return {
            userActions: bindActionCreators(userActions, dispatch),
        }
    }

    render() {
        const {
            user,
            userActions,
        } = this.props;


        return (
                <Support
                    user={user}
                    userActions={userActions}
                    sendSupport={::api.user.sendSupport}
                />
        );
    }
}

export default connect(SupportPage.mapStateToProps, SupportPage.mapDispatchToProps)(SupportPage);
