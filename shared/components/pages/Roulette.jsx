import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import Chat from './Chat.jsx';
import DonutChart from "react-svg-donut-chart";
import NavLink from './../common/NavLink.jsx'
import ModalController from './../../lib/ModalController';

const dataPie = [
    {value: 100, stroke: "#22594e", strokeWidth: 6},
    {value: 60, stroke: "#2f7d6d"},
]

export default class Roulette extends Component {

    static propTypes = {
        inventory: PropTypes.array.isRequired,
        selectedItems: PropTypes.object.isRequired,
        isInventoryLoading: PropTypes.bool.isRequired,
        cbHandleUpdateInventory: PropTypes.func.isRequired,
        cbHandleSelectItem: PropTypes.func.isRequired,
        cbHandleSelectAll: PropTypes.func.isRequired,
        cbHandleDeselectItem: PropTypes.func.isRequired,
        cbHandleDeselectAll: PropTypes.func.isRequired,
        // cbHandleSelectSteamInventorySort: PropTypes.func.isRequired,
        cbHandleWithdraw: PropTypes.func.isRequired,
    };

    render() {
        const {
            inventory,
            selectedItems,
            cbHandleUpdateInventory,
            cbHandleSelectItem,
            cbHandleSelectAll,
            cbHandleDeselectItem,
            cbHandleDeselectAll,
            cbHandleWithdraw,
            isInventoryLoading
        } = this.props;
        return (
            <div className='container'>
                <div className="roulette">
                    <div className="rWheel">
                        <div className="rWheel__wrapper">
                            <object type="image/svg+xml" data="static/images/icons/roulette.svg">
                                Your browser does not support SVG.
                            </object>
                            <DonutChart data={dataPie} />
                        </div>
                    </div>
                    <div className="rLobby">
                        <div className="game__header">
                            <div className='balance'>Balance: <i className='icon-poker-piece'/><span>1123</span></div>
                            <NavLink to='/deposit' className='button'>Deposit now</NavLink>
                        </div>
                        <div className="game__lobby">
                            <div className="rLobby__bet">
                                <h3>Your bet:</h3>
                                <div className="wrapper">
                                    <div>
                                        <div className="color pink" />
                                        <div className="bet"><i className='icon-poker-piece' />1245</div>
                                    </div>
                                    <div>
                                        <div className="color green" />
                                        <div className="bet"><i className='icon-poker-piece' />1245</div>
                                    </div>
                                    <div>
                                        <div className="color gray" />
                                        <div className="bet"><i className='icon-poker-piece' />1245</div>
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
                                    <div className="history__item green">2</div>
                                    <div className="history__item pink">3</div>
                                    <div className="history__item gray">4</div>
                                </div>
                                <div className="game__hash">
                                    <div className="left">
                                        <b>№ 11239912323</b>
                                        <NavLink to='/fair-game'>Fair game</NavLink>
                                    </div>
                                    <div className="right">
                                        <b>Hash round: </b>
                                        <div>9370afdf275940f5df8c5a198a1c7492803139aa31
                                            346bce4698463b</div>
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
                </div>
                <Chat />
            </div>
        );
    }
}

