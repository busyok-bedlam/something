import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "./../../actions/userActions";
import HowItWorks from './../../components/pages/HowItWorks.jsx';
import ContainerPage from './../ContainerPage.jsx';

class HowItWorksPage extends Component {
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
        } = this.props;


        return (
                <HowItWorks
                    user={user}
                />
        );
    }
}

export default  connect(HowItWorksPage.mapStateToProps, HowItWorksPage.mapDispatchToProps)(HowItWorksPage);
