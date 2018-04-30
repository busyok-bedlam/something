import React, {Component} from 'react';
import Scrollbar from './../../common/Scrollbar.jsx';
import User from './../../common/User.jsx';
import PropTypes from "prop-types";

export default class CrashHistory extends Component {
    static propTypes = {
        playersBet: PropTypes.array.isRequired,
        currentCrashGame: PropTypes.object,
    };
    render() {
        const {playersBet, currentCrashGame} = this.props;
        const usersBetList = playersBet.map((bet, index) => {
            return (
                <div
                    className={`cHistory__item ${
                        bet.result ?
                            bet.result === 'won' ?
                                'cHistory__item-good'
                                : 'cHistory__item-bad'
                            : ''
                    }`}
                    key={index}>
                    <div className="name">
                        <User level={bet.level} name={bet.userName} image={bet.userAvatar}/>
                    </div>
                    <div>{bet.cashOut && bet.cashOut > 0 ? bet.cashOut + 'x' : '-'}</div>
                    <div>{bet.bet}</div>
                    <div>{bet.profit ? bet.profit : '-'}</div>
                </div>
            );
        });
        return (
            <div className='cHistory'>
                <div className="cHistory__header">
                    <div className='players'><span>{currentCrashGame.totalUsers}</span> players in game</div>
                    <div className='bets'><i className='icon-poker-piece'/><span>{currentCrashGame.totalAmount}</span></div>
                </div>
                <div className="cHistory__item cHistory__item-header">
                    <div className="name">Nickname</div>
                    <div>@</div>
                    <div>Bet</div>
                    <div>Profit</div>
                </div>
                <div className="cHistory__table" style={{height: 'calc(100vh - 32.5rem)'}}>
                    <Scrollbar>
                        {usersBetList}
                    </Scrollbar>
                </div>
            </div>
        );
    }
}