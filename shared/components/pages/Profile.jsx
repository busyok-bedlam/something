import React, {Component} from "react";
import {LoadingScreen} from '../../lib/LoadingScreen';
import {toast} from 'react-toastify';
import ProfileInfo from './ProfileInfo.jsx';
import ProfileLevel from './ProfileLevel.jsx';
import PropTypes            from 'prop-types';

export default class Profile extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
    };

    async cbHandleSetTradeLink(tradeURL){
        try {
            LoadingScreen.open();
            const {userActions} = this.props;
            await userActions.setupTradeURL(tradeURL);
            toast("Successfully added! Now you can play!");
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
            <div className="profile">
                <h2 className="page-header">Profile</h2>
                <div className="container">
                    <ProfileLevel user={user} />
                    <ProfileInfo user={user} setTradeLink={this.cbHandleSetTradeLink.bind(this)} />
                </div>
            </div>
        );
    }
}
