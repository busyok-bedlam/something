import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "./../../actions/userActions";
import FAQ from './../../components/pages/FAQ.jsx';
import ContainerPage from './../ContainerPage.jsx';

class FAQPage extends Component {
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
            <ContainerPage>
                <FAQ
                    user={user}
                />
            </ContainerPage>
        );
    }
}

export default connect(FAQPage.mapStateToProps, FAQPage.mapDispatchToProps)(FAQPage);
