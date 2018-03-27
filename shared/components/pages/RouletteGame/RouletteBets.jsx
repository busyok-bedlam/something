import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Scrollbar from './../../common/Scrollbar.jsx';
import User from './../../common/User.jsx';

export default class RouletteBets extends Component {
    static PropTypes = {
        color: PropTypes.string.isRequired
    };

    static type = {
        COLOR1: 'rBets__wrapper-color1',
        COLOR2: 'rBets__wrapper-color2',
        COLOR3: 'rBets__wrapper-color3'
    };

    handleClick = () => {
        if(this.myBet) {
            const {offsetTop, offsetHeight} = this.myBet;
            this.columnScroll.scrollTo(offsetTop - Math.round(this.wrapperScroll.offsetHeight / 2) + Math.round(offsetHeight / 2));
        }
    };

    render() {
        const {color} = this.props;
        let bets = [{user: 21561245}, {user: 21561241}, {user: 21561241}, {user: 21561241}, {user: 21561241}, {user: 21561241}, {user: 21561241}, {user: 21561241}].map((el, i) =>
            (<div className={(el.user === 21561245) ? "rBets__item active" : "rBets__item"} key={i} ref={block => {if(el.user === 21561245) this.myBet = block}}>
                <User level={9} name={'ConorMcGregor'} image='./static/images/user.png'/>
                <div>
                    <i className='icon-poker-piece'/>1123
                </div>
            </div>)
        );

        return (
            <div className={"rBets__wrapper " + color}>
                <div className="rBets__header">
                    <h2>Total bet: <i className='icon-poker-piece'/><span>1123</span></h2>
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