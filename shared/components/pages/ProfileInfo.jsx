import React, {Component} from "react";
import Form from './../common/Inputs/form';
import Input from '././../common/Inputs/input';
import Button from './../common/Inputs/button';
import validate from './../common/Inputs/validate.js';
import PropTypes from 'prop-types';

export default class ProfileInfo extends Component {

    state = {
        selectedGame: 'all',
        infoGame: {}
    };

    static propTypes = {
        user: PropTypes.object.isRequired,
        setTradeLink: PropTypes.func.isRequired,
    };

    openProfileWindow = () => {
        window.open(`https://steamcommunity.com/profiles/${this.props.user.id}/tradeoffers/privacy#trade_offer_access_url`);
    };

    handleSubmit = e => {
        e.preventDefault();
        let link = e.target.steamLink.value;
        this.props.setTradeLink(link);
    };

    handleChangeGame = (e, userObject, gameName)=> {
        const user = userObject || this.props.user;
        const game = gameName || e.target.name;
        if(game === 'all') {
            this.setState({
                selectedGame: game,
                infoGame: {
                    wins: user['rouletteGameProfit'].wins + user['crashGameProfit'].wins,
                    losses: user['rouletteGameProfit'].losses + user['crashGameProfit'].losses,
                    profit: user['rouletteGameProfit'].profit + user['crashGameProfit'].profit
                }
            })
        } else {
            this.setState({
                selectedGame: game,
                infoGame: {
                    wins: user[game].wins,
                    losses: user[game].losses,
                    profit: user[game].profit
                }
            })
        }
    };

    componentDidMount() {
        setTimeout(() => this.handleChangeGame(null, this.props.user, 'all'), 0);
    }

    render() {
        let {selectedGame, infoGame} = this.state;
        return (
            <div className="profile__info">
                <div className="profile__header">
                    <button name="all"
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
                <div className="top-players__total">
                    <div>
                        <h3>{infoGame.wins}</h3>
                        <span>wins</span></div>
                    <div>
                        <h3>{infoGame.losses}</h3>
                        <span>losses</span></div>
                    <div>
                        <h3>{infoGame.profit}</h3>
                        <span>profit</span></div>
                </div>
                <Form onSubmit={this.handleSubmit} className="row">
                    <Input
                        type="text"
                        name="steamLink"
                        placeholder="Steam link"
                        className="input-float"
                        required='true'
                        validations={[validate.required, validate.tradeLink]}
                    />
                    <div className="profile__buttons">
                        <div className='button button-gray' onClick={this.openProfileWindow}>View my link</div>
                        <Button className="button button-green">Save</Button>
                    </div>
                </Form>
            </div>
        );
    }
}
