import React from 'react';
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import * as gamesActions from '../actions/gamesActions';
import Transactions from '../components/pages/Transactions.jsx';

class TransactionsPage extends React.Component {

    render() {
        return (
            <Transactions/>
        );
    }
}

function mapStateToProps(state) {
    return {
        // games: state.games,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        // gamesActions: bindActionCreators(gamesActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsPage);
