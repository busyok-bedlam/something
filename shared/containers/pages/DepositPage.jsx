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

    async createDepositOffer(){
        try {
            LoadingScreen.open();
            const {marketplaceActions, marketplace, user} = this.props;
            const {selectedItems} = marketplace;
            await marketplaceActions.createDepositOffer(Object.keys(selectedItems));
            location.href = `https://steamcommunity.com/profiles/${user.id}/tradeoffers`;
        } catch (error){
            console.error(error);
            toast(error.message || error.toString())
        } finally {
            LoadingScreen.close();
        }
    }

    render() {
        const {marketplace} = this.props;
        const {inventory, params, selectedItems} = marketplace;

        return (
                <Deposit
                    inventory={inventory}
                    selectedItems={selectedItems}
                    params={params}
                    loadUserInventory={::this.loadUserInventory}
                    selectItem={::this.selectItem}
                    deselectItem={::this.deselectItem}
                    createDepositOffer={::this.createDepositOffer}
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
