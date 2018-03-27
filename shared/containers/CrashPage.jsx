import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toast} from 'react-toastify';
import PropTypes from 'prop-types';
import * as userActions from '../actions/userActions';
import * as gameActions from '../actions/gameActions';
import {LoadingScreen} from '../lib/LoadingScreen';
import Crash from "../components/pages/Crash.jsx";

class CrashPage extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        game: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
        gameActions: PropTypes.object.isRequired,
    };

    state = {
        bet: 0,
        isInventoryLoading: false,
    };

    async componentDidMount() {
        await this.__loadUserInventory();
    }

    async __loadUserInventory() {
        try {
            this.setState({isInventoryLoading: true});
            const {userActions} = this.props;
            await userActions.loadInventory();
        } catch (error) {
            console.error(error);
            toast(error.message || error.toString(), 'error');
        } finally {
            this.setState({isInventoryLoading: true});
        }
    }

    async cbHandleUpdateInventory() {
        await this.__loadUserInventory();
    }

    cbHandleSelectItem(item) {
        const {gameActions} = this.props;
        gameActions.selectItem(item);
    }

    cbHandleSelectAll() {
        const {gameActions, user} = this.props;
        const {inventory} = user;
        gameActions.selectAllItems(inventory);
    }

    cbHandleDeselectItem(itemID) {
        const {gameActions} = this.props;
        gameActions.deselectItem(itemID);
    }

    cbHandleDeselectAll() {
        const {gameActions} = this.props;
        gameActions.deselectAllItems();
    }

    async cbHandleWithdraw() {
        try {
            const {userActions, game} = this.props;
            LoadingScreen.open();
            // const ids = Object.keys(game.selectedItems);
            const ids = [];
            for (let key in game.selectedItems) {
                ids.push(game.selectedItems[key].assetID);
            }

            if (!ids.length) {
                return toast('No items selected', 'error');
            }
            await userActions.createWithdrawOffer(ids);
        } catch (error) {
            console.error(error);
            toast(error.message || error.toString());
        } finally {
            LoadingScreen.close();
        }
    }

    lobbyHandleChangeValue(value) {
        this.setState({
            bet: value,
        })
    }

    render() {
        const {
            user,
            game,
        } = this.props;
        const {inventory} = user;
        const {selectedItems} = game;
        let {bet, isInventoryLoading} = this.state;

        return (
            <Crash
                bet={bet}
                inventory={inventory}
                selectedItems={selectedItems}
                cbHandleUpdateInventory={::this.cbHandleUpdateInventory}
                cbHandleSelectItem={::this.cbHandleSelectItem}
                cbHandleSelectAll={::this.cbHandleSelectAll}
                cbHandleDeselectItem={::this.cbHandleDeselectItem}
                cbHandleDeselectAll={::this.cbHandleDeselectAll}
                cbHandleWithdraw={::this.cbHandleWithdraw}
                lobbyHandleChangeValue={::this.lobbyHandleChangeValue}
                isInventoryLoading={isInventoryLoading}
            />
        );
    }
}

function mapStateToProps(state) {
    const {
        user,
        game,
    } = state;
    return {
        user,
        game,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrashPage);
