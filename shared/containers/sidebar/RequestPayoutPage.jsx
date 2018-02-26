import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "./../../actions/userActions";
import RequestPayout from './../../components/pages/RequestPayout.jsx';
import ContainerPage from './../ContainerPage.jsx';

class RequestPayoutPage extends Component {
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
        if(process.env.BROWSER && !user.isAuth){
            location.href='/';
        }


        return (
            <ContainerPage>
                <RequestPayout />
            </ContainerPage>
        );
    }
}

export default connect(RequestPayoutPage.mapStateToProps, RequestPayoutPage.mapDispatchToProps)(RequestPayoutPage);
