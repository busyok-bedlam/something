import React, {Component} from 'react';
import NavLink from './../../common/NavLink.jsx';

export default class CrashHistory extends Component {
    render() {
        return (
            <div className='cLobby'>
                <div className="game__lobby">
                    <div className="game__info">
                        <h2>Chose bet (max 300 000)</h2>
                        <input type="text"/>
                        <button className="button button-green">Start game</button>
                        {/*<button className="button button-pink">Stop</button>*/}
                        <div className="game__hash">
                            <div className="left">
                                <b>№ 11239912323</b>
                                <NavLink to='/fair-game'>Fair game</NavLink>
                            </div>
                            <div className="right">
                                <b>Hash round: </b>
                                <div>9370afdf275940f5df8c5a198a1c7492803139aa31
                                    346bce4698463b
                                </div>
                                <b>Round number: </b>8
                            </div>
                        </div>
                    </div>
                    <div className="game__sidebar">
                        <button><i className='icon-refresh'/></button>
                        <button>+10</button>
                        <button>+100</button>
                        <button>+1000</button>
                        <button>+10000</button>
                        <button>x2</button>
                        <button>1/2</button>
                        <button>All</button>
                        <button><i className='icon-garbage'/></button>
                    </div>
                </div>
            </div>
        );
    }
}