import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as redBlackGameActions from "./../../actions/redBlackGameActions";
import MyHistory from './../../components/pages/MyHistory.jsx';
import ContainerPage from './../ContainerPage.jsx';

class MyHistoryPage extends Component {
    static mapStateToProps(state) {
        const {
            user,
            redBlackGame,
        } = state;
        return {
            user,
            redBlackGame,
        };
    }

    static mapDispatchToProps(dispatch) {
        return {
            redBlackGameActions: bindActionCreators(redBlackGameActions, dispatch),
        }
    }

    render() {
        const {
            user,
            redBlackGame,
            redBlackGameActions,
        } = this.props;
        if(process.env.BROWSER && !user.isAuth){
            location.href='/';
        }


        return (
            <ContainerPage>
                <MyHistory
                    user={user}
                    redBlackGame={redBlackGame}
                    redBlackGameActions={redBlackGameActions}
                />
            </ContainerPage>
        );
    }
}

export default connect(MyHistoryPage.mapStateToProps, MyHistoryPage.mapDispatchToProps)(MyHistoryPage);
