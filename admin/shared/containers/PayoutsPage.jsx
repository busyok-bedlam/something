import React from 'react';
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import * as gamesActions from '../actions/gamesActions';
import Payouts from '../components/pages/Payouts.jsx';

class PayoutsPage extends React.Component {

    render() {
        return (
            <Payouts/>
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
)(Payouts);
