import React, {Component} from "react";
import {LoadingScreen} from '../../lib/LoadingScreen';
import {toast} from 'react-toastify';
import ProfileInfo from './ProfileInfo.jsx';
import ProfileLevel from './ProfileLevel.jsx';


export default class Profile extends Component {
    hanldleClick = () => {
        console.log(this)
    };

    render() {
        const {user} = this.props;
        return (
            <div className="profile">
                <h2 className="page-header">Profile</h2>
                <div className="container">
                    <ProfileLevel user={user} click={this.hanldleClick}/>
                    <ProfileInfo user={user} />
                </div>
            </div>
        );
    }
}
