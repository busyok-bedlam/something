import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Scrollbar from './../../common/Scrollbar.jsx';
import User from './../../common/User.jsx';
import roulette from '../../../../config/roulette.js';

export default class RouletteBets extends Component {
    static PropTypes = {
        classByColor: PropTypes.string.isRequired,
        ownColor: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        winnerColor: PropTypes.string.isRequired
    };

    static type = {
        COLOR1: 'rBets__wrapper-pink',
        COLOR2: 'rBets__wrapper-green',
        COLOR3: 'rBets__wrapper-grey'
    };

    handleClick = () => {
        if (this.myBet) {
            const {offsetTop, offsetHeight} = this.myBet;
            this.columnScroll.scrollTo(offsetTop - Math.round(this.wrapperScroll.offsetHeight / 2) + Math.round(offsetHeight / 2));
        }
    };

    render() {
        const {classByColor, players, user, total, coeff, status, ownColor, winnerColor} = this.props;

        let bets = players.map((el, i) =>
            (<div className={(el.userID === user.id) ? "rBets__item active" : "rBets__item"} key={i} ref={block => {
                if (el.user === user.id) this.myBet = block
            }}>
                <User level={el.level} name={el.displayName} image={el.avatar}/>
                <div>
                    <i className='icon-poker-piece'/>{el.bet}
                </div>
            </div>)
        );

        return (
            <div className={"rBets__wrapper " + classByColor}>
                <div className="rBets__header">
                    <h2>Total bet: <i className='icon-poker-piece'/>
                        <span>{
                            status === roulette.ROULETTE_REWARDS
                                ? (ownColor === winnerColor)
                                    ? (total * coeff)
                                    : (total > 0) ? "-" + total : total
                                : total
                        }</span>
                    </h2>
                    <button className="button-border" onClick={this.handleClick}>Find me</button>
                </div>
                <div style={{height: '24.4rem'}} className={
                            status === roulette.ROULETTE_REWARDS
                                ? (ownColor === winnerColor)
                                    ? 'fix-scroll-margin'
                                    : 'fix-scroll-margin disabled'
                                : 'fix-scroll-margin'
                        }
                    ref={el => this.wrapperScroll = el}>
                    <Scrollbar ref={el => this.columnScroll = el}>
                        <div>
                            {
                                bets
                            }
                        </div>
                    </Scrollbar>
                </div>
            </div>
        );
    }
}