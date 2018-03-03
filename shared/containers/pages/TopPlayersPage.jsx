import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "./../../actions/userActions";
import TopPlayers from './../../components/pages/TopPlayers.jsx';

class TopPlayersPage extends Component {
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
                <TopPlayers
                    user={user}
                    userActions={userActions}
                />
        );
    }
}

export default connect(TopPlayersPage.mapStateToProps, TopPlayersPage.mapDispatchToProps)(TopPlayersPage);
