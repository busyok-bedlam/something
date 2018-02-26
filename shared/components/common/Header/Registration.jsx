import React, {Component} from "react";
import Dropdown from 'react-dropdown';

import Form from './../Inputs/form';
import Input from '././../Inputs/input';
import Button from './../Inputs/button';
import validate from './../Inputs/validate.js'
import countries from '../../../../config/listCountries.json';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import {toast} from 'react-toastify';
import commonConfig from '../../../../config/commonConfig';

const genderOptions = [
    {value: commonConfig.GENDER.MALE, label: 'Male'},
    {value: commonConfig.GENDER.FEMALE, label: 'Female'},
];

export default class Registration extends Component {
    state = {
        gender: '',
        country: '',
        birthday: undefined,
        showDatePicker: false
    };

    _onSelect(option) {
        this.setState({
            gender: option
        });
    }

    _onSelectCountry(option) {
        this.setState({
            country: option
        });
    }

    handleCheckbox() {
        this.setState({
            adult: !this.state.adult
        })
    }

    _showdateSelect() {
        this.setState({
            showDatePicker: !this.state.showDatePicker
        })
    }

    _blurdateSelect() {
        this.setState({
            showDatePicker: false
        })
    }

    _dateSelect(date) {
        this.setState({
            birthday: date
        })
    }

    handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const {userActions} = this.props;
            const {
                username,
                name,
                surname,
                password,
                passwordConfirm,
                email,
                emailConfirm,
                adult
            } = event.target;
            await userActions.signUp({
                userName: username.value,
                firstName: name.value,
                lastName: surname.value,
                gender: this.state.gender.value,
                countryId: this.state.country.value-1,
                password: password.value,
                confirmPassword: passwordConfirm.value,
                email: email.value,
                emailConfirm: emailConfirm.value,
                adult: adult.value,
                birthday: this.state.birthday,
            });
        } catch (error) {
            console.error(error);
            toast(error.message || error.toString());
            alert(error.message || error.toString());
        }
    };

    render() {
        return (
            <div className="modal-window registration">
                <div
                    className="row justify-content-center modal-window__header">
                    <div className="col-lg-6">
                        <img src="static/images/logo.png" alt=""/>
                        <h2 className="modal-header">Registration</h2>
                    </div>
                </div>
                <Form ref={c => {
                    this.form = c
                }} onSubmit={this.handleSubmit}>
                    <div className="row justify-content-around">
                        <fieldset>
                            <Input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="input-border-bottom"
                                validations={[validate.required]}
                            />
                            <div
                                className={(this.state.birthday) ? "input-border-bottom date-picker valid" : "input-border-bottom date-picker"}>
                                <input type="text"
                                       onClick={::this._showdateSelect}
                                       readOnly={true}
                                       value={this.state.birthday}
                                       placeholder="Date of birthday"/>
                                <div
                                    style={{opacity: this.state.showDatePicker ? '1' : '0'}}
                                    onBlur={::this._blurdateSelect}>
                                    <InfiniteCalendar
                                        display="years"
                                        selected={this.state.birthday}
                                        height={300}
                                        width={255}
                                        displayOptions={{
                                            showMonthsForYears: false
                                        }}
                                        min={new Date(new Date().setFullYear(new Date().getFullYear() - 40))}
                                        minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 40))}
                                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                                        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                                        onSelect={::this._dateSelect}
                                    />
                                </div>
                            </div>
                            <Input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                className="input-border-bottom"
                                validations={[validate.required, validate.email, validate.isEqualMail]}
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                name="password"
                                className="input-border-bottom"
                                validations={[validate.required, validate.isEqual]}
                            />
                        </fieldset>
                        <fieldset>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="input-border-bottom"
                                validations={[validate.required, validate.hasNumber]}
                            />
                            <div className="input-border-bottom">
                                <Dropdown options={genderOptions}
                                          onChange={::this._onSelect}
                                          value={this.state.gender}
                                          className={(this.state.gender) ? 'custom-select valid' : 'custom-select'}
                                          placeholder="Gender"/>
                            </div>
                            <Input
                                type="email"
                                name="emailConfirm"
                                placeholder="Confirm E-mail"
                                className="input-border-bottom"
                                validations={[validate.required, validate.email, validate.isEqualMail]}
                            />
                            <Input
                                type="password"
                                name="passwordConfirm"
                                placeholder="Confirm password"
                                className="input-border-bottom"
                                validations={[validate.required, validate.isEqual]}
                            />
                        </fieldset>
                        <fieldset>
                            <Input
                                type="text"
                                name="surname"
                                placeholder="Surname"
                                className="input-border-bottom"
                                validations={[validate.required, validate.hasNumber]}
                            />
                            <div className="input-border-bottom">
                                <Dropdown
                                    options={countries.map((country, i) => {
                                        return {
                                            value: i + 1,
                                            label: country.title
                                        }
                                    })}
                                    onChange={::this._onSelectCountry}
                                    value={this.state.country}
                                    className={(this.state.country) ? 'custom-select valid' : 'custom-select'}
                                    placeholder="Country"/>
                            </div>
                        </fieldset>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-sm-6 col-lg-4">
                            <div className="checkbox-wrapper">
                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                        name="adult"
                                        id="adult"
                                        checked={this.state.adult}
                                        onClick={::this.handleCheckbox}
                                    />
                                    <label htmlFor="adult"/>
                                </div>
                                <div className="desc">Yes, please confirm that
                                    you are 18 years old
                                </div>
                            </div>
                            <h2>
                                <Button
                                    className="button green-button"
                                    isDisabled={
                                        !this.state.adult ||
                                        !this.state.gender ||
                                        !this.state.country ||
                                        !this.state.birthday
                                    }>
                                    register now
                                </Button>
                            </h2>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

