import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "./../../actions/userActions";
import Profile from './../../components/pages/Profile.jsx';

class ProfilePage extends Component {
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
                <Profile
                    user={user}
                    userActions={userActions}
                />
        );
    }
}

export default connect(ProfilePage.mapStateToProps, ProfilePage.mapDispatchToProps)(ProfilePage);
