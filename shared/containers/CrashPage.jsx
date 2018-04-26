import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toast} from 'react-toastify';
import PropTypes from 'prop-types';
import * as userActions from '../actions/userActions';
import * as gameActions from '../actions/gameActions';
import {LoadingScreen} from '../lib/LoadingScreen';
import Crash from "../components/pages/Crash.jsx";
import config from '../../config/crash.js';
import CrashSocket from "../lib/crashWS";
import RouletteSocket from "../lib/rouletteWS";

class CrashPage extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        // game: PropTypes.object.isRequired,
        crash: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
        // gameActions: PropTypes.object.isRequired,
    };

    state = {
        // bet: config.CRASH_MIN_BET,
        bet: 0,
        isInventoryLoading: false,
    };

    componentDidMount() {
        this.socket = CrashSocket.start();
    }

    componentWillUnmount() {
        CrashSocket.start()
            .then(instance => instance.close());
    }

    // async componentDidMount() {
    //     await this.__loadUserInventory();
    // }

    // async __loadUserInventory() {
    //     try {
    //         this.setState({isInventoryLoading: true});
    //         const {userActions} = this.props;
    //         await userActions.loadInventory();
    //     } catch (error) {
    //         console.error(error);
    //         toast(error.message || error.toString(), 'error');
    //     } finally {
    //         this.setState({isInventoryLoading: true});
    //     }
    // }

    // async cbHandleUpdateInventory() {
    //     await this.__loadUserInventory();
    // }

    // cbHandleSelectItem(item) {
    //     const {gameActions} = this.props;
    //     gameActions.selectItem(item);
    // }

    // cbHandleSelectAll() {
    //     const {gameActions, user} = this.props;
    //     const {inventory} = user;
    //     gameActions.selectAllItems(inventory);
    // }

    // cbHandleDeselectItem(itemID) {
    //     const {gameActions} = this.props;
    //     gameActions.deselectItem(itemID);
    // }

    // cbHandleDeselectAll() {
    //     const {gameActions} = this.props;
    //     gameActions.deselectAllItems();
    // }

    // async cbHandleWithdraw() {
    //     try {
    //         const {userActions, game} = this.props;
    //         LoadingScreen.open();
    //         // const ids = Object.keys(game.selectedItems);
    //         const ids = [];
    //         for (let key in game.selectedItems) {
    //             ids.push(game.selectedItems[key].assetID);
    //         }
    //
    //         if (!ids.length) {
    //             return toast('No items selected', 'error');
    //         }
    //         await userActions.createWithdrawOffer(ids);
    //     } catch (error) {
    //         console.error(error);
    //         toast(error.message || error.toString());
    //     } finally {
    //         LoadingScreen.close();
    //     }
    // }
    //
    lobbyHandleChangeValue(value) {
        this.setState({
            bet: parseInt(value)
        })
    }

    render() {
        const {
            user,
            // game,
            crash,
        } = this.props;
        // const {inventory} = user;
        // const {selectedItems} = game;
        let {bet, isInventoryLoading} = this.state;

        return (
            <Crash
                user={user}
                crash={crash}
                bet={bet}
                isInventoryLoading={isInventoryLoading}
                lobbyHandleChangeValue={::this.lobbyHandleChangeValue}
            />
        );
    }
}

function mapStateToProps(state) {
    const {
        user,
        // game,
        crash,
    } = state;
    return {
        user,
        // game,
        crash,
    };
}

function mapDispatchToProps(dispatch) {

    CrashSocket.setDispatch(dispatch);

    return {
        userActions: bindActionCreators(userActions, dispatch),
        // gameActions: bindActionCreators(gameActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrashPage);
