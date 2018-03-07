import React, {Component} from 'react';
import Scrollbar from './../../common/Scrollbar.jsx';
import User from './../../common/User.jsx';

export default class CrashHistory extends Component {
    render() {
        return (
            <div className='cHistory'>
                <div className="cHistory__header">
                    <div className='players'><span>53</span> players in game</div>
                    <div className='bets'><i className='icon-poker-piece'/><span>12325.42</span></div>
                </div>
                <div className="cHistory__item cHistory__item-header">
                    <div className="name">Nickname</div>
                    <div>@</div>
                    <div>Bet</div>
                    <div>Profit</div>
                </div>
                <div className="cHistory__table" style={{height: 'calc(100vh - 32.5rem)'}}>
                    <Scrollbar>
                        <div className="cHistory__item cHistory__item-good">
                            <div className="name">
                                <User level={9} name={'ConorMcGregor'} image='./static/images/user.png'/>
                            </div>
                            <div>1x</div>
                            <div>100</div>
                            <div>-100</div>
                        </div>
                        <div className="cHistory__item cHistory__item-bad">
                            <div className="name">
                                <User level={9} name={'ConorMcGregor'} image='./static/images/user.png'/>
                            </div>
                            <div>1x</div>
                            <div>100</div>
                            <div>-100</div>
                        </div>
                    </Scrollbar>
                </div>
            </div>
        );
    }
}