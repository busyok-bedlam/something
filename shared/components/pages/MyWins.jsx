import React, {Component} from "react";

import Dropdown from 'react-dropdown';
import GameItem from './BlackOrRed/GameItem.jsx';
import gameConfig from '../../../config/game';
import {toast}    from 'react-toastify';
import {LoadingScreen} from '../../lib/LoadingScreen';

const options = [
    {
        value: gameConfig.COLORS.RED,
        label: 'RED'
    }, {value: gameConfig.COLORS.BLACK, label: 'BLACK'},
];

export default class MyWins extends Component {
    state = {
        selected: ''
    };

    async _onSelect(selected) {
        try {
            const {redBlackGameActions} = this.props;
            this.setState({selected});
            LoadingScreen.open();
            await redBlackGameActions.getHistory(0, selected.value, true/*only wins*/);
        } catch (error) {
            console.error(error);
            toast(error.message || error.toString());
        } finally {
            LoadingScreen.close();
        }
    }

    __renderGames() {
        const {redBlackGame, redBlackGameActions, user} = this.props;
        const {history} = redBlackGame;
        const games = [];
        history.forEach((game, key) => {
            games.push(
                <GameItem
                    user={user}
                    redBlackGameActions={redBlackGameActions}
                    game={game}
                    key={key}
                    progress={game.status === gameConfig.STATUS.FINISHED ? GameItem.types.FINISHED : GameItem.types.NEW}
                />
            );
        })
        return games;
    }

    async componentDidMount() {
        try {
            const {redBlackGameActions} = this.props;
            LoadingScreen.open();
            await redBlackGameActions.getHistory(null, null, true/*only wins*/);
            window.onscroll = this.__onScrollBottom.bind(this)
        } catch (error) {
            console.error(error);
            toast(error.message || error.toString())
        } finally {
            LoadingScreen.close();
        }
    }

    __onScrollBottom() {
        const d = document.body;
        const offset = d.scrollTop + window.innerHeight;
        const height = d.offsetHeight;

        if (offset > height - 100) {
            const {redBlackGame, redBlackGameActions} = this.props;
            const {selected} = this.state;
            if (!redBlackGame.isLoading && !redBlackGame.historyLastLoaded) {
                redBlackGameActions.getHistory(redBlackGame.historyPage + 1, selected, true/*only wins*/);
            }
        }
    }

    render() {
        return (
            <div className="my-wins row">
                <div className="col-md-8">
                    <h2 className="main-header">My wins</h2>
                    <div>Lorem ipsum dolor sit amet, consectetur
                        adipisicingelit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-border-bottom">
                        <Dropdown options={options}
                                  onChange={this._onSelect.bind(this)}
                                  value={this.state.selected}
                                  className='custom-select'
                                  placeholder="Red or Black"/>
                    </div>
                    <div className="blackred-list">
                        {this.__renderGames()}
                    </div>
                </div>
            </div>
        );
    }
}

