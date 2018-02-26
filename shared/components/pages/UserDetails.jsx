import React, {Component} from "react";
import Form from './../common/Inputs/form';
import Input from '././../common/Inputs/input';
import Button from './../common/Inputs/button';
import validate from './../common/Inputs/validate.js'
import {LoadingScreen} from './../../lib/LoadingScreen';
import {toast} from 'react-toastify';
import countries from '../../../config/listCountries.json';
import commonConfig from '../../../config/commonConfig';

function isEqualNewPass(value, props, components) {
    const bothUsed = components.newPassword[0].isUsed && components.confirmNewPassword[0].isUsed;
    const bothChanged = components.newPassword[0].isChanged && components.confirmNewPassword[0].isChanged;

    if (bothChanged && bothUsed && components.newPassword[0].value !== components.confirmNewPassword[0].value) {
        return <div className="invalid-message">Passwords are not equal.</div>;
    }
}

export default class UserDetails extends Component {
    state = {
        name: this.props.user.displayedUserNameMode,
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            LoadingScreen.open();
            const {userActions} = this.props;
            const {newPassword, confirmNewPassword} = event.target;
            await userActions.newPassword(newPassword.value);
            newPassword.value = '';
            confirmNewPassword.value = '';
            toast('Password updated');
        } catch (error) {
            console.error(error);
            toast(error.message || error.toString());
        } finally {
            LoadingScreen.close();
        }
    };

    async handleChangename(event) {
        try {
            const {userActions} = this.props;
            this.setState({
                name: event.target.value
            });
            LoadingScreen.open();
            await userActions.changeUserDisplayedName(event.target.value);
            toast('Updated');
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
            <div className="user-details">
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="main-header">User details</h2>
                        <div>Lorem ipsum dolor sit amet, consectetur
                            adipisicingelit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut
                        </div>
                    </div>
                    <div className="user-details__info col-12">
                        <h3>{user.displayName}</h3>
                        <div className="user-details__flag"><img
                            src="static/images/flag.png"
                            alt=""/>{user.countryId && countries[user.countryId].title}
                        </div>
                        <b>Username: </b>
                        <div className="user-details__radio">
                            <div className="circle-radio">
                                <input type="radio" id="fullName"
                                       name="username"
                                       value={commonConfig.USER_DISPLAYED_NAME_MODE.USER_NAME}
                                       checked={user.displayedUserNameMode === commonConfig.USER_DISPLAYED_NAME_MODE.USER_NAME}
                                       onChange={::this.handleChangename}/>
                                <label className="circle-radio__label"
                                       htmlFor="fullName">
                                    <span className="big">
                                      <span className="small"/>
                                    </span>{user.userName}
                                </label>
                            </div>
                            <div className="circle-radio">
                                <input type="radio" id="shortenedName"
                                       name="username"
                                       value={commonConfig.USER_DISPLAYED_NAME_MODE.SHORT_NAME}
                                       checked={user.displayedUserNameMode === commonConfig.USER_DISPLAYED_NAME_MODE.SHORT_NAME}
                                       onChange={::this.handleChangename}/>
                                <label className="circle-radio__label"
                                       htmlFor="shortenedName">
                                    <span className="big">
                                      <span className="small"/>
                                    </span>{(user.firstName ? user.firstName[0].toUpperCase() : '') + (user.lastName ? user.lastName[0].toUpperCase() : '')}
                                </label>
                            </div>
                        </div>
                        <br/>
                        <b>Firstname: </b><span>{user.firstName}</span><br/>
                        <b>Surname: </b><span>{user.lastName}</span><br/>
                        <b>Gender: </b><span>{commonConfig.GENDER[user.gender]}</span><br/>
                    </div>
                </div>
                <Form ref={c => {
                    this.form = c
                }} onSubmit={this.handleSubmit}
                      className="row user-details__new">
                    <h3 className="col-12">Change password</h3>
                    <div className="col-sm-4">
                        <Input
                            type="password"
                            name="newPassword"
                            placeholder="New password"
                            className="input-border-bottom"
                            validations={[validate.required, isEqualNewPass]}
                        />
                    </div>
                    <div className="col-sm-4">
                        <Input
                            type="password"
                            name="confirmNewPassword"
                            placeholder="Confirm password"
                            className="input-border-bottom"
                            validations={[validate.required, isEqualNewPass]}
                        />
                    </div>
                    <div className="col-sm-4">
                        <Button className="button green-button">confirm</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

