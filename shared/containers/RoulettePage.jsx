import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toast} from 'react-toastify';
import PropTypes from 'prop-types';
import * as userActions from '../actions/userActions';
import * as gameActions from '../actions/gameActions';
import * as rouletteActions from '../actions/rouletteActions';
import {LoadingScreen} from '../lib/LoadingScreen';
import Roulette from "../components/pages/Roulette.jsx";
import roulette from '../../config/roulette.js';

class RoulettePage extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        game: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
        gameActions: PropTypes.object.isRequired,
        rouletteActions: PropTypes.object.isRequired,
    };

    state = {
        bet: roulette.ROULETTE_MIN_BET,
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

    handleRouletteBetting() {
        const {rouletteActions} = this.props;
        rouletteActions.rouletteBetting();
    }
    handleRouletteInGame() {
        const {rouletteActions} = this.props;
        rouletteActions.rouletteInGame();
    }
    handleRouletteRewards() {
        const {rouletteActions} = this.props;
        rouletteActions.rouletteRewards();
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
            roulette
        } = this.props;
        const {inventory} = user;
        const {selectedItems} = game;
        let {bet, isInventoryLoading} = this.state;

        return (
            <Roulette
                bet={bet}
                roulette={roulette}
                inventory={inventory}
                selectedItems={selectedItems}
                handleRouletteBetting={::this.handleRouletteBetting}
                handleRouletteInGame={::this.handleRouletteInGame}
                handleRouletteRewards={::this.handleRouletteRewards}
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
        roulette
    } = state;
    return {
        user,
        game,
        roulette
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        rouletteActions: bindActionCreators(rouletteActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoulettePage);
