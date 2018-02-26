import React, {Component}   from 'react';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes            from 'prop-types';
import Dialog               from 'material-ui/Dialog';
import {toast}              from 'react-toastify';
import * as userActions     from "../../actions/userActions";
import Scrollbar            from '../common/Scrollbar.jsx';
import InventoryItem        from './../pages/CrashGame/InventoryItem.jsx';
import ModalController      from '../../lib/ModalController';
import {LoadingScreen}      from '../../lib/LoadingScreen';

class DepositModal extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
    };

    handleClose() {
        this.setState({open: false});
        setTimeout(ModalController.closeModal, 200);
    };

    state = {
        open: true,
        isLoading: false,
        selectedItems: {},

    };

    async componentDidMount() {
        await this.__loadInventory();
    }

    async handleSubmit() {
        try {
            const {userActions} = this.props;
            const {selectedItems} = this.state;
            const assetIDs = Object.keys(selectedItems);
            if (!assetIDs.length) {
                return toast('No items selected');
            }
            LoadingScreen.open();
            await userActions.createDepositOffer(assetIDs);
        } catch (error) {
            console.error(error);
            toast(error.message || error.toString(), 'error');
        } finally {
            LoadingScreen.close();
        }
    }

    handleSelectSteamInventorySort() {
        const {user, userActions} = this.props;
        if (user.steamInventorySort === 1) {
            userActions.selectSteamInventorySort(2);
        } else {
            userActions.selectSteamInventorySort(1);
        }
    }

    async __loadInventory() {
        try {
            const {userActions} = this.props;
            this.setState({isLoading: true});
            await userActions.loadSteamInventory();
            toast('Loaded');
        } catch (error) {
            toast(error.message || error.toString(), 'error');
        } finally {
            this.setState({isLoading: false});
        }
    }

    __renderItems() {
        const {user} = this.props;
        const {steamInventory} = user;
        const list = [];

        steamInventory.forEach((item, key) => {
            let itemColor = undefined;
            if (item.tags && item.tags.length) {
                item.tags.forEach(tag => {
                    if (tag.color) {
                        itemColor = '#' + tag.color;
                    }
                })
            }
            list.push(
                <InventoryItem
                    key={key}
                    color={InventoryItem.type.GREEN}
                    itemPrice={item.itemData.price}
                    itemName={item.itemData.market_hash_name}
                    itemDescription={item.itemData.type}
                    itemColor={itemColor}
                    itemImage={`https://steamcommunity-a.akamaihd.net/economy/image/${item.itemData.icon_url}`}
                    selected={this.state.selectedItems[item.assetid] || false}
                    onClick={this.handleSelectItem.bind(this, item.assetid)}
                />
            );
        });

        return list;
    }

    async updateInventory() {
        await this.__loadInventory();
    }

    handleSelectItem(assetID) {
        const {selectedItems} = this.state;
        if (!selectedItems[assetID]) {
            selectedItems[assetID] = true;
        } else {
            delete selectedItems[assetID];
        }

        this.setState(selectedItems);
    }


    render() {
        // console.log(this.props);
        return (
            <Dialog
                open={this.state.open}
                onRequestClose={::this.handleClose}
                overlayClassName={"modal__overlay"}
                contentClassName={"modal deposit"}>
                <div onClick={::this.handleClose} className="modal__close"/>
                <div className="deposit__header">
                    <h3>DEPOSIT SKINS</h3>
                    <div>Choose a skins to autimacaly cashout</div>
                </div>
                <div className="deposit__buttons">
                    <input type="text" placeholder='Search a skin'/>
                    <div className="deposit__reload-wrap">
                        {/*TODO: You can add class "up" for toggle icon to up */}
                        <button
                            onTouchTap={::this.handleSelectSteamInventorySort}
                            className="button-link">
                            Price
                        </button>
                        <button
                            onClick={::this.updateInventory}
                            className="invent__reload">
                            <i className={`icon icon-reload ${this.state.isLoading ? 'rotate' : ''}`}/>
                        </button>
                    </div>
                    <button
                        onTouchTap={::this.handleSubmit}
                        className="button button-green">
                        Create offer
                    </button>
                </div>
                <div className="deposit__wrapper" style={{
                    height: 'calc(80vh - 240px)'
                }}>
                    <Scrollbar>
                        <div className="deposit__items">
                            {this.__renderItems()}
                            {/*<InventoryItem />*/}
                        </div>
                    </Scrollbar>
                </div>
            </Dialog>
        );
    }
}

function mapStateToProps(state) {
    const {
        user,
    } = state;
    return {
        user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(DepositModal);