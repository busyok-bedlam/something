import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "./../../actions/userActions";
import UserDetails from './../../components/pages/UserDetails.jsx';
import ContainerPage from './../ContainerPage.jsx';

class UserDetailsPage extends Component {
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
        if(process.env.BROWSER && !user.isAuth){
            location.href='/';
        }


        return (
            <ContainerPage>
                <UserDetails
                    user={user}
                    userActions={userActions}
                />
            </ContainerPage>
        );
    }
}

export default connect(UserDetailsPage.mapStateToProps, UserDetailsPage.mapDispatchToProps)(UserDetailsPage);
