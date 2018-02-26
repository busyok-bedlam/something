import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "./../../actions/userActions";
import AddFunds from './../../components/pages/AddFunds.jsx';
import ContainerPage from './../ContainerPage.jsx';

class AddFundsPage extends Component {
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
                <AddFunds />
            </ContainerPage>
        );
    }
}

export default connect(AddFundsPage.mapStateToProps, AddFundsPage.mapDispatchToProps)(AddFundsPage);
