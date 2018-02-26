import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as adminActions from '../actions/adminActions';
import * as drawerActions from '../actions/drawerActions';

import HeaderComponent from '../components/header.jsx';


class Header extends React.Component {

    static mapStateToProps(state) {
        return {
            user: state.admin,
            drawer: state.drawer,
        }
    }

    static mapDispatchToProps(dispatch) {
        return {
            adminActions: bindActionCreators(adminActions, dispatch),
            drawerActions: bindActionCreators(drawerActions, dispatch),
        }
    }

    render() {
        return (
            <HeaderComponent
                user={this.props.user}
                drawer={this.props.drawer}
                adminActions={this.props.adminActions}
                drawerActions={this.props.drawerActions}
            />
        );
    }
}

export default connect(
    Header.mapStateToProps,
    Header.mapDispatchToProps
)(HeaderComponent);
