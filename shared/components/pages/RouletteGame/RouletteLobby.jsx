import React, {Component} from 'react';
import NavLink from './../../common/NavLink.jsx';
import ModalController from '../../../lib/ModalController';

export default class RouletteLobby extends Component {
    render() {
        return (
            <div className="rLobby">
                <div className="game__header">
                    <div className='balance'>Balance: <i className='icon-poker-piece'/><span>1123</span></div>
                    <button
                        onClick={() => ModalController.openModal('DepositModal')}
                        className='button'>Deposit now</button>
                </div>
                <div className="game__lobby">
                    <div className="rLobby__bet">
                        <h3>Your bet:</h3>
                        <div className="wrapper">
                            <div>
                                <div className="color color-1"/>
                                <div className="bet"><i className='icon-poker-piece'/>1245</div>
                            </div>
                            <div>
                                <div className="color color-2"/>
                                <div className="bet"><i className='icon-poker-piece'/>1245</div>
                            </div>
                            <div>
                                <div className="color color-3"/>
                                <div className="bet"><i className='icon-poker-piece'/>1245</div>
                            </div>
                        </div>
                    </div>
                    <div className="game__info">
                        <h2>Choose bet</h2>
                        <input type="text"/>
                        <div className="rLobby__buttons">
                            <button className="button button-pink">Bet x2</button>
                            <button className="button button-green">Bet x14</button>
                            <button className="button button-gray">Bet x2</button>
                        </div>
                        <div className="rLobby__history">
                            <div className="history__item history__item-color1">2</div>
                            <div className="history__item history__item-color2">3</div>
                            <div className="history__item history__item-color3">4</div>
                        </div>
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

