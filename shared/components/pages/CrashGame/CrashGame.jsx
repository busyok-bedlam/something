import React, {Component} from 'react';
import GameHeader from '../../common/game/GameHeader.jsx';

export default class CrashGame extends Component {
    render() {
        return (
            <div className='cGame'>
                <GameHeader user={this.props.user}/>
                <div className="cGame__content cGame__content-crashed">
                    {/*cGame__content-crashed - add class for overlay*/}
                    <div className="cGame__header">Max-profit:<i className='icon-poker-piece'/><span>12325.42</span></div>
                    <div className="cGame__graph">
                        <canvas></canvas>
                        <div className="cGame__caption">
                            <span className="crashed">Crashed</span>
                            <span className='coeff'>x8.43</span>
                            <div className="next-round">Next round in <span>10</span> sec</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}