import React, {Component} from "react";
import User from './../common/User.jsx';
import PropTypes from "prop-types";

export default class TopPlayers extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
    };

    state = {
        selectedGame: 'all',
        periodForInfo: 30
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
        })
    };

    componentDidMount() {
        setTimeout(() => this.handleChangeGame(null, this.props.user, this.state.selectedGame), 0);
    }

    render() {
        let {selectedGame, periodForInfo} = this.state;
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
                        <button name="rouletteGameProfit"
                                onClick={this.handleChangeGame}
                                className={selectedGame === "rouletteGameProfit"
                                    ? "header__bottom-right-link active"
                                    : "header__bottom-right-link"}>
                            Roulette
                        </button>
                        <button name="crashGameProfit"
                                onClick={this.handleChangeGame}
                                className={selectedGame === "crashGameProfit"
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
                        <h3>2333</h3>
                        <span>players in top</span></div>
                    <div>
                        <h3>100 000</h3>
                        <span>max profit</span></div>
                    <div>
                        <h3>759</h3>
                        <span>games</span></div>
                    <div>
                        <h3>54</h3>
                        <span>unique players</span></div>
                </div>
                <div className="top-players__header">
                    <div className='place'>Place</div>
                    <div className='user'>Nickname</div>
                    <div>Wins</div>
                    <div>Profit</div>
                </div>
                <div>
                    <div className="top-players__item">
                        <div className='place'>1</div>
                        <User level={9} name={'ConorMcGregor'} image='./static/images/user.png'/>
                        <div>356</div>
                        <div><i className='icon-poker-piece'/> 333 333</div>
                    </div>
                </div>
            </div>
        );
    }
}
