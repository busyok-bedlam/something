import React, {Component}      from "react";
import {connect}               from "react-redux";
import {bindActionCreators}    from "redux";
import * as marketplaceActions from "./../../actions/marketplaceActions";
import Deposit                 from './../../components/pages/Deposit.jsx';
import PropTypes               from 'prop-types';
import {LoadingScreen}         from '../../lib/LoadingScreen';
import {toast}                 from 'react-toastify';

class DepositPage extends Component {

    async componentDidMount() {
        await this.loadUserInventory();
    }

    componentWillUnmount(){
        const {marketplaceActions} = this.props;
        marketplaceActions.clear();
    }

    async loadUserInventory(){
        try {
            const {marketplaceActions} = this.props;
            await marketplaceActions.loadUserInventory({page: 0});
        } catch (error) {
            console.error(error);
        }
    }

    selectItem(item){
        const {marketplaceActions} = this.props;
        marketplaceActions.selectItem(item.assetID, item)
    }
    deselectItem(item){
        const {marketplaceActions} = this.props;
        marketplaceActions.deselectItem(item.assetID)
    }

    async handleSearch(search){
        try {
            const {marketplaceActions, marketplace} = this.props;
            await marketplaceActions.loadUserInventory({search});
        } catch (error){
            toast(error.message || error.toString());
        }
    }

    async handleSort(value) {
        try {
            const {marketplaceActions, marketplace} = this.props;
            await marketplaceActions.loadUserInventory({...marketplace.params, ...value});
        } catch (error){
            toast(error.message || error.toString());
        }
    }

    async selectGame(e) {
        try {
            const {marketplaceActions, marketplace} = this.props;
            await marketplaceActions.loadUserInventory({...marketplace.params, selectedGame: e.value});
        } catch (error){
            toast(error.message || error.toString());
        }
    }

    async createDepositOffer(){
        try {
            LoadingScreen.open();
            const {marketplaceActions, marketplace, user} = this.props;
            const {selectedItems} = marketplace;
            const items = [];
            for(let key in selectedItems){
                items.push({assetID: key, gameID: selectedItems[key].gameID})
            }
            await marketplaceActions.createDepositOffer(items);
            location.href = `https://steamcommunity.com/profiles/${user.id}/tradeoffers`;
        } catch (error){
            console.error(error);
            toast(error.message || error.toString())
        } finally {
            LoadingScreen.close();
        }
    }

    render() {
        const {marketplace, user} = this.props;
        const {inventory, params, selectedItems} = marketplace;

        return (
                <Deposit
                    inventory={inventory}
                    balance={user.balance}
                    selectedItems={selectedItems}
                    params={params}
                    loadUserInventory={::this.loadUserInventory}
                    selectItem={::this.selectItem}
                    deselectItem={::this.deselectItem}
                    selectGame={::this.selectGame}
                    createDepositOffer={::this.createDepositOffer}
                    handleSearch={::this.handleSearch}
                    handleSort={::this.handleSort}
                />
        );
    }
}

function mapStateToProps(state) {
    const {
        user,
        marketplace,
    } = state;
    return {
        user,
        marketplace,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        marketplaceActions: bindActionCreators(marketplaceActions, dispatch),
    }
}

DepositPage.prototype.propTypes = {
    marketplaceActions: PropTypes.object.isRequired,
    marketplace: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositPage);
