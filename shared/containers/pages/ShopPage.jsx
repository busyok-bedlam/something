import React, {Component}      from "react";
import {connect}               from "react-redux";
import {bindActionCreators}    from "redux";
import * as marketplaceActions from "./../../actions/marketplaceActions";
import Shop                    from './../../components/pages/Shop.jsx';
import PropTypes               from 'prop-types';
import {LoadingScreen}         from '../../lib/LoadingScreen';
import {toast}                 from 'react-toastify';

class ShopPage extends Component {
    async componentDidMount() {
        await this.loadMarketplaceInventory();
    }

    componentWillUnmount(){
        const {marketplaceActions} = this.props;
        marketplaceActions.clear();
    }

    async loadMarketplaceInventory(){
        try {
            const {marketplaceActions} = this.props;
            await marketplaceActions.loadMarketplaceInventory({page: 0});
        } catch (error) {
            console.error(error);
        }
    }

    selectItem(item){
        const {marketplaceActions} = this.props;
        marketplaceActions.selectItem(item._id, item);
    }
    deselectItem(item){
        const {marketplaceActions} = this.props;
        marketplaceActions.deselectItem(item._id);
    }

    async createWithdrawOffer(){
        try {
            LoadingScreen.open();
            const {marketplaceActions, marketplace, user} = this.props;
            const {selectedItems} = marketplace;
            await marketplaceActions.createWithdrawOffer(Object.keys(selectedItems));
            location.href = `https://steamcommunity.com/profiles/${user.id}/tradeoffers`;
        } catch (error){
            console.error(error);
            toast(error.message || error.toString());
        } finally {
            LoadingScreen.close();
        }
    }

    async handleSearch(search){
        console.log(search);
        try {
            const {marketplaceActions} = this.props;
            await marketplaceActions.loadMarketplaceInventory({search});
        } catch (error){
            toast(error.message || error.toString());
        }
    }

    async handleSort(value) {
        try {
            const {marketplaceActions, marketplace} = this.props;
            await marketplaceActions.loadMarketplaceInventory({...marketplace.params, ...value});
        } catch (error){
            toast(error.message || error.toString());
        }
    }

    async selectGame(e) {
        try {
            const {marketplaceActions, marketplace} = this.props;
            await marketplaceActions.loadMarketplaceInventory({...marketplace.params, selectedGame: e.value});
        } catch (error){
            toast(error.message || error.toString());
        }
    }

    render() {
        const {marketplace, user} = this.props;
        const {inventory, params, selectedItems} = marketplace;

        return (
                <Shop
                    balance={user.balance}
                    inventory={inventory}
                    selectedItems={selectedItems}
                    params={params}
                    loadMarketplaceInventory={::this.loadMarketplaceInventory}
                    selectItem={::this.selectItem}
                    deselectItem={::this.deselectItem}
                    selectGame={::this.selectGame}
                    createWithdrawOffer={::this.createWithdrawOffer}
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

ShopPage.prototype.propTypes = {
    marketplaceActions: PropTypes.object.isRequired,
    marketplace: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
