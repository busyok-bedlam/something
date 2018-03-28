import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toast} from 'react-toastify';
import PropTypes from 'prop-types';
import * as userActions from '../actions/userActions';
import * as gameActions from '../actions/gameActions';
import * as jackpotActions from '../actions/jackpotActions';
import {LoadingScreen} from '../lib/LoadingScreen';
import Roulette from "../components/pages/Roulette.jsx";
import jackpot from '../../config/jackpot.js';

class RoulettePage extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        game: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
        gameActions: PropTypes.object.isRequired,
        jackpotActions: PropTypes.object.isRequired,
    };

    state = {
        bet: jackpot.JACKPOT_MIN_BET,
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

    handleJackpotBetting() {
        const {jackpotActions} = this.props;
        jackpotActions.jackpotBetting();
    }
    handleJackpotInGame() {
        const {jackpotActions} = this.props;
        jackpotActions.jackpotInGame();
    }
    handleJackpotRewards() {
        const {jackpotActions} = this.props;
        jackpotActions.jackpotRewards();
    }

    lobbyHandleChangeValue(value) {
        this.setState({
            bet: parseInt(value)
        })
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

    render() {
        const {
            user,
            game,
            jackpot
        } = this.props;
        const {inventory} = user;
        const {selectedItems} = game;
        let {bet, isInventoryLoading} = this.state;

        return (
            <Roulette
                bet={bet}
                jackpot={jackpot}
                inventory={inventory}
                selectedItems={selectedItems}
                handleJackpotBetting={::this.handleJackpotBetting}
                handleJackpotInGame={::this.handleJackpotInGame}
                handleJackpotRewards={::this.handleJackpotRewards}
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
        jackpot
    } = state;
    return {
        user,
        game,
        jackpot
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        jackpotActions: bindActionCreators(jackpotActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoulettePage);
