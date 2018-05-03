import React, {Component} from "react";
import User from './../common/User.jsx';
import PropTypes from "prop-types";
import api from './../../api';

export default class TopPlayers extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
    };

    state = {
        selectedGame: 'all',
        periodForInfo: 30,
        uniquePlayers: 0,
        topPlayers: 0,
        gamesRoulette: 0,
        topRoulette: [],
        topCrash: [],
        gamesCrash: 5
    };

    handleChangeGame = (e, userObject, gameName) => {
        const user = userObject || this.props.user;
        const game = gameName || e.target.name;
        if (game === 'all') {
            this.setState({
                selectedGame: game
            })
        } else {
            this.setState({
                selectedGame: game
            })
        }
    };

    handleChangePeriod = e => {
        const period = e.target.name;
        this.setState({
            periodForInfo: parseInt(period)
        }, function () {
            this.__fetchData();
        });
    };

    __fetchData = () => {
        api.user.getTopUser({
            period: this.state.periodForInfo,
        })
            .then(res => {
                this.setState({
                    uniquePlayers: res.uniquePlayers,
                    topPlayers: res.topPlayers,
                    topRoulette: res.topRoulette,
                    gamesRoulette: res.gamesRoulette,
                    topCrash: res.topCrash
                });
            })
            .catch(err => console.error(err))
    };

    async componentDidMount() {
        await this.__fetchData()
    }

    render() {
        let {selectedGame, periodForInfo, uniquePlayers, topPlayers, topRoulette, topCrash, gamesRoulette, gamesCrash} = this.state;

        let rouletteGames = topRoulette.map((el, key) =>
            <div className="top-players__item" key={key}>
                <div className='place'>{key + 1}</div>
                <User level={el.level} name={el.displayName} image={el.avatarFull}/>
                <div>{el.wins}</div>
                <div><i className='icon-poker-piece'/> {el.amount}</div>
            </div>
        );

        let crashGames = topCrash.map((el, key) =>
            <div className="top-players__item" key={key}>
                <div className='place'>{key + 1}</div>
                <User level={el.level} name={el.displayName} image={el.avatarFull}/>
                <div>{el.wins}</div>
                <div><i className='icon-poker-piece'/> {el.amount}</div>
            </div>
        );

        // let allGames = topRoulette.map((el, key) => {
            // let sumEl;
            // for(let i = 0; i < topRoulette.length; i++) {
            //     console.log(topCrash.length);
            //     if(i > topCrash.length) {
            //         sumEl = sumEl = Object.assign({}, topRoulette[i]);
            //         console.log('sum el return')
            //     }
            //     else {
            //         if(topCrash[i]._id === el._id) {
            //             console.log('sum el summed')
            //             sumEl = Object.assign({}, topCrash[i]);
            //         }
            //         console.log(topCrash[i])
            //     }
            // }
            // console.log(sumEl)
        //         return (
        //             <div className="top-players__item" key={key}>
        //                 <div className='place'>{key + 1}</div>
        //                 <User level={sumEl.level} name={sumEl.displayName} image={sumEl.avatarFull}/>
        //                 <div>{sumEl.wins}</div>
        //                 <div><i className='icon-poker-piece'/> {sumEl.amount}</div>
        //             </div>)
        //     }
        // );

        return (
            <div className="top-players page-container">
                <h2 className="page-header">Top players</h2>
                <div className="top-players__buttons">
                    <div>
                        <button
                            name="all"
                            onClick={this.handleChangeGame}
                            className={selectedGame === "all"
                                ? "header__bottom-right-link active"
                                : "header__bottom-right-link"}>
                            All
                        </button>
                        <button name="roulette"
                                onClick={this.handleChangeGame}
                                className={selectedGame === "roulette"
                                    ? "header__bottom-right-link active"
                                    : "header__bottom-right-link"}>
                            Roulette
                        </button>
                        <button name="crash"
                                onClick={this.handleChangeGame}
                                className={selectedGame === "crash"
                                    ? "header__bottom-right-link active"
                                    : "header__bottom-right-link"}>
                            Crash
                        </button>
                    </div>
                    <div>
                        <button
                            name="1"
                            onClick={this.handleChangePeriod}
                            className={periodForInfo === 1
                                ? "header__bottom-right-link active"
                                : "header__bottom-right-link"}>
                            1 Day
                        </button>
                        <button
                            name="7"
                            onClick={this.handleChangePeriod}
                            className={periodForInfo === 7
                                ? "header__bottom-right-link active"
                                : "header__bottom-right-link"}>
                            7 Day
                        </button>
                        <button
                            name="30"
                            onClick={this.handleChangePeriod}
                            className={periodForInfo === 30
                                ? "header__bottom-right-link active"
                                : "header__bottom-right-link"}>
                            30 Day
                        </button>
                    </div>
                </div>
                <div className="top-players__total">
                    <div>
                        <h3>{topPlayers}</h3>
                        <span>players in top</span></div>
                    <div>
                        {(selectedGame === "roulette") && <h3>{(topRoulette.length) ? topRoulette[0].amount : 0}</h3>}
                        {(selectedGame === "crash") && <h3>{(topCrash.length) ? topCrash[0].amount : 0}</h3>}
                        {(selectedGame === "all") &&
                        <h3>{((topRoulette.length && topRoulette[0].amount) || 0) + (topCrash.length && topCrash[0].amount || 0)}</h3>}
                        <span>max profit</span></div>
                    <div>
                        {(selectedGame === "roulette") && <h3>{gamesRoulette}</h3>}
                        {(selectedGame === "crash") && <h3>{gamesCrash}</h3>}
                        {(selectedGame === "all") && <h3>{gamesRoulette + gamesCrash}</h3>}
                        <span>games</span></div>
                    <div>
                        <h3>{uniquePlayers}</h3>
                        <span>unique players</span></div>
                </div>
                <div className="top-players__header">
                    <div className='place'>Place</div>
                    <div className='user'>Nickname</div>
                    <div>Wins</div>
                    <div>Profit</div>
                </div>
                <div>
                    {
                        (selectedGame === "roulette")
                            ? rouletteGames
                            : (selectedGame === "crash")
                                ? crashGames
                                : 'all'
                    }
                </div>
            </div>
        );
    }
}
