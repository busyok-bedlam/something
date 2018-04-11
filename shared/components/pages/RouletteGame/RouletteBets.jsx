import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Scrollbar from './../../common/Scrollbar.jsx';
import User from './../../common/User.jsx';
import rouletteConfig from '../../../../config/roulette.js';

export default class RouletteBets extends Component {
    static PropTypes = {
        color: PropTypes.string.isRequired
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
        const {color, players, user, total} = this.props;

        let bets = players.map((el, i) =>
            (<div className={(el.userID === user.id) ? "rBets__item active" : "rBets__item"} key={i} ref={block => { if(el.user === user.id) this.myBet = block}}>
                <User level={user.level} name={el.displayName} image={el.avatar}/>
                <div>
                    <i className='icon-poker-piece'/>{el.bet}
                </div>
            </div>)
        );

        return (
            <div className={"rBets__wrapper " + color}>
                <div className="rBets__header">
                    <h2>Total bet: <i className='icon-poker-piece'/><span>{total}</span></h2>
                    {/* TODO: Add scroll for my bet and add class "active"*/}
                    <button className="button-border" onClick={this.handleClick}>Find me</button>
                </div>
                <div style={{height: '24.4rem'}} className='fix-scroll-margin' ref={el => this.wrapperScroll = el}>
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