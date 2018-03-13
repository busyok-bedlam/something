import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "./../../actions/userActions";
import Shop from './../../components/pages/Shop.jsx';

class ShopPage extends Component {
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
            userActions,
        } = this.props;


        return (
                <Shop
                    user={user}
                    userActions={userActions}
                />
        );
    }
}

export default connect(ShopPage.mapStateToProps, ShopPage.mapDispatchToProps)(ShopPage);
