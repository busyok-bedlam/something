import React, {Component} from 'react';
import Scrollbar from './../../common/Scrollbar.jsx';

export default class CrashHistory extends Component {
    render() {
        return (
            <div className='cHistory'>
                <div className="cHistory__header">
                    <div className='players'><span>53</span> players in game</div>
                    <div className='bets'><i className='icon-poker-piece'/>12325.42</div>
                </div>
                <div className="cHistory__item cHistory__item-header">
                    <div className="name">Nickname</div>
                    <div>@</div>
                    <div>Bet</div>
                    <div>Profit</div>
                </div>
                <div className="cHistory__table">
                    <Scrollbar>
                        <div className="cHistory__item">
                            <div className="name"></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </Scrollbar>
                </div>
            </div>
        );
    }
}