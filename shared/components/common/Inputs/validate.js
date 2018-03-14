import React from "react";
import {isEmail} from 'validator';

export default class validate {
    static required(value, props) {
        if (!value || (props.isCheckable && !props.checked)) {
            return <div className="invalid-message">Required</div>;
        }
    }

    static hasNumber(value) {
        if (/\d/.test(value)) {
            return <div className="invalid-message">Field can't contain
                number</div>;
        }
    }

    static bet(value) {
        if (value <= 0) {
            return <div className="invalid-message">Wrong number</div>;
        }
    }

    static email(value) {
        if (!isEmail(value)) {
            return <div className="invalid-message">${value} is not a valid
                email.</div>;
        }
    }

    static steamLink(value){
        const linkPattern = new RegExp('(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+');
        if (!linkPattern.test(value)) {
            return <div className="invalid-message">Is not a valid steam link.</div>
        }
    }

    static tradeLink(value){
        const linkPattern = new RegExp('(?:https?:\\/\\/)?steamcommunity\\.com\\/tradeoffer\\/new\\/\\?partner=[a-zA-Z0-9]+&token=[a-zA-Z0-9]+');
        if (!linkPattern.test(value)) {
            return <div className="invalid-message">Is not a valid steam link.</div>
        }
    }

    static isEqual(value, props, components) {
        const bothUsed = components.password[0].isUsed && components.passwordConfirm[0].isUsed;
        const bothChanged = components.password[0].isChanged && components.passwordConfirm[0].isChanged;

        if (bothChanged && bothUsed && components.password[0].value !== components.passwordConfirm[0].value) {
            return <div className="invalid-message">Passwords are not
                equal.</div>;
        }
    }

    static isEqualMail(value, props, components) {
        const bothUsedMail = components.email[0].isUsed && components.emailConfirm[0].isUsed;
        const bothChangedMail = components.email[0].isChanged && components.emailConfirm[0].isChanged;

        if (bothChangedMail && bothUsedMail && components.email[0].value !== components.emailConfirm[0].value) {
            return <div className="invalid-message">E-mail are not equal.</div>;
        }
    }
}