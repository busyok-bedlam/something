import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as gamesActions from '../actions/gamesActions';
import Games from '../components/pages/Games.jsx';

class GamesPage extends React.Component {

    render() {
        const {
            games,
            params,
            gamesActions,
        } = this.props;

        return (
            <Games
                games={games}
                params={params}
                gamesActions={gamesActions}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        games: state.games,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        gamesActions: bindActionCreators(gamesActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamesPage);
