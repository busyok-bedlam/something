import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as adminActions from '../actions/adminActions';
import * as usersActions from '../actions/usersActions';
import Users from '../components/pages/Users.jsx';

class UsersPage extends React.Component {

    render() {
        const {
            user,
            users,
            params,
            adminActions,
            usersActions,
        } = this.props;

        return (
            <Users
                user={user}
                users={users}
                params={params}
                adminActions={adminActions}
                usersActions={usersActions}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.admin,
        users: state.users,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        adminActions: bindActionCreators(adminActions, dispatch),
        usersActions: bindActionCreators(usersActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersPage);
