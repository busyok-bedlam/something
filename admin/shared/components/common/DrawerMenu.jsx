import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as adminActions from '../../actions/adminActions';
import * as drawerActions from '../../actions/drawerActions';


class DrawerMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    changeMenu = (menu, e) => {
        const {drawerActions} = this.props
        drawerActions.close();
        e.preventDefault();
        browserHistory.push(menu);
    };


    render() {
        const {drawer, drawerActions} = this.props;
        return (
            <Drawer
                docked={false}
                width={300}
                open={drawer.open}
                onRequestChange={(open) => open ? drawerActions.open() : drawerActions.close()}>

                <AppBar
                    title="Admin menu"
                    style={{marginBottom: '40px'}}
                />
                <MenuItem
                    onClick={this.changeMenu.bind(this, '/users')}
                    primaryText="Users"
                    key="Users"/>
                <MenuItem
                    onClick={this.changeMenu.bind(this, '/games')}
                    primaryText="Games"
                    key="Games"/>
                <MenuItem
                    onClick={this.changeMenu.bind(this, '/transactions')}
                    primaryText="Transactions"
                    key="Transactions"/>
                <MenuItem
                    onClick={this.changeMenu.bind(this, '/payouts')}
                    primaryText="Payouts"
                    key="Payouts"/>
                <MenuItem
                    onClick={this.changeMenu.bind(this, '/support')}
                    primaryText="Support"
                    key="Support"/>
                <MenuItem
                    onClick={this.changeMenu.bind(this, '/faqs')}
                    primaryText="FAQ"
                    key="Faq"/>
                <MenuItem
                    onClick={this.changeMenu.bind(this, '/banner')}
                    primaryText="Banners"
                    key="Banners"/>

                <hr/>
                <MenuItem
                    onClick={this.props.adminActions.logout}
                    primaryText="Logout"
                    key="Logout"/>
            </Drawer>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.admin.currentUser,
        drawer: state.drawer,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        adminActions: bindActionCreators(adminActions, dispatch),
        drawerActions: bindActionCreators(drawerActions, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawerMenu);
