import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import Coeff              from './../common/Coefficient.jsx';
import CrashGraph         from './../pages/CrashGame/CrashGraph.jsx';
import Inventory          from './../pages/CrashGame/Inventory.jsx';
import InGameInventory    from './../pages/CrashGame/InGameInventory.jsx';
import ModalController from './../../lib/ModalController';

export default class Main extends Component {

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
            <div>
                <div className="coeff__wrapper">
                    <Coeff profit={Coeff.types.GOOD}>13.04</Coeff>
                    <Coeff profit={Coeff.types.BAD}>1.01</Coeff>
                </div>
                <div className="container">
                    <div className="half-col">
                        <CrashGraph />
                    </div>
                    <div className="half-col actions">
                        <div className="actions__wrapper">
                            <div className="actions__input">
                                <div>Auto Cashout</div>
                                <input type="text" placeholder='22.13x'/>
                            </div>
                            <button
                                className="button button-pink"
                                onClick={() => ModalController.openModal('SkinsModal')}
                            >Select Skin</button>
                        </div>
                        <button className="button button-candy">UPGRADE</button>
                    </div>
                    <div className="half-col invent">
                        <h2>Your inventory</h2>
                        <Inventory
                            inventory={inventory}
                            selectedItems={selectedItems}
                            cbHandleUpdateInventory={cbHandleUpdateInventory}
                            cbHandleSelectItem={cbHandleSelectItem}
                            cbHandleSelectAll={cbHandleSelectAll}
                            isInventoryLoading={isInventoryLoading}
                        />
                    </div>
                    <div className="half-col invent">
                        <h2>Upgrade</h2>
                        <InGameInventory
                            selectedItems={selectedItems}
                            cbHandleDeselectItem={cbHandleDeselectItem}
                            cbHandleDeselectAll={cbHandleDeselectAll}
                            cbHandleWithdraw={cbHandleWithdraw}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

