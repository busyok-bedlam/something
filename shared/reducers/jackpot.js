import {
    JACKPOT_BETTING,
    JACKPOT_IN_GAME,
    JACKPOT_REWARDS
} from '../actions/jackpotActions';

let initialState = {
    game: {},
    lastGame: {},
    bets: {},
    status: '',
};

export default function jackpot(state = initialState, action) {
    switch (action.type) {
        case JACKPOT_BETTING: {
            // const {game} = action.payload;
            let game = {};
            game.lastBet = 12;
            game.date = new Date(Date.now());
            let lastGame ={};
            lastGame.lastBet = 12;
            lastGame.date = new Date(Date.now());
            return {...state, game, lastGame, status: action.type};
        }
        case JACKPOT_IN_GAME: {
            return {...state, status: action.type};
        }
        case JACKPOT_REWARDS:{
            return {...state, status: action.type}
        }
        default:
            return state;
    }
}
