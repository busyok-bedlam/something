import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware                from 'redux-thunk';
import {redirect}                     from '../middlewares/redirect';
import rootReducer                    from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    redirect
)(createStore);

const txt = '../reducers';

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    module.hot && module.hot.accept(
        txt, () => store.replaceReducer(require('../reducers'))
    );

    return store;
}
