import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as botsActions from '../actions/botsActions';
// import Games from '../components/pages/Games.jsx';
import Bots from '../components/pages/Bots.jsx';

class BotsPage extends React.Component {

    render() {
        const {
            bots,
            params,
            botsActions,
        } = this.props;
        // console.log(this.props);

        return (
            <Bots
                bots={bots}
                params={params}
                botsActions={botsActions}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        bots: state.bots,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        botsActions: bindActionCreators(botsActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BotsPage);
