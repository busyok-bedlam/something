import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as redBlackGameActions from "./../../actions/redBlackGameActions";
import MyWins from './../../components/pages/MyWins.jsx';
import ContainerPage from './../ContainerPage.jsx';

class MyWinsPage extends Component {
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
                <MyWins
                    ser={user}
                    redBlackGame={redBlackGame}
                    redBlackGameActions={redBlackGameActions}
                />
            </ContainerPage>
        );
    }
}

export default connect(MyWinsPage.mapStateToProps, MyWinsPage.mapDispatchToProps)(MyWinsPage);
