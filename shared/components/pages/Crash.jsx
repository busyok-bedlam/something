import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Chat from '../../containers/Chat.jsx';
import CrashGame from './CrashGame/CrashGame.jsx';
import CrashLobby from './CrashGame/CrashLobby.jsx';
import CrashHistory from './CrashGame/CrashHistory.jsx';

export default class Crash extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        crash: PropTypes.object.isRequired,
        bet: PropTypes.number.isRequired,
        isInventoryLoading: PropTypes.bool.isRequired,
        lobbyHandleChangeValue: PropTypes.func.isRequired,
        cbHandleNewBet: PropTypes.func.isRequired,
        cbHandleCashOut: PropTypes.func.isRequired,
    };

    render() {
        const {
            user,
            crash,
            bet,
            lobbyHandleChangeValue,
            cbHandleNewBet,
            cbHandleCashOut,
        } = this.props;
        return (
            <div className='container'>
                <div className="crash">
                    <div className='crash__container'>
                        <CrashGame user={user} crash={crash}/>
                        <CrashLobby
                            bet={bet}
                            lobbyHandleChangeValue={lobbyHandleChangeValue}
                            crash={crash}
                            user={user}
                            cbHandleNewBet={cbHandleNewBet}
                            cbHandleCashOut={cbHandleCashOut}
                        />
                    </div>
                    <CrashHistory />
                </div>
                <Chat/>
            </div>
        );
    }
}

