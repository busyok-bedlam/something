import React, {Component} from "react";
import User from './../common/User.jsx';

export default class TopPlayers extends Component {
    render() {
        return (
            <div className="top-players page-container">
                <h2 className="page-header">Top players</h2>
                <div className="top-players__buttons">
                    <div>
                        <button className="header__bottom-right-link active">All</button>
                        <button className="header__bottom-right-link">Roulette</button>
                        <button className="header__bottom-right-link">Crash</button>
                    </div>
                    <div>
                        <button className="header__bottom-right-link">1 Day</button>
                        <button className="header__bottom-right-link">7 Day</button>
                        <button className="header__bottom-right-link active">30 Day</button>
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
                    <div className='name'>Nickname</div>
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
