import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware                from 'redux-thunk';
import {redirect}                     from '../middlewares/redirect';
import rootReducer                    from '../reducers';
import { composeWithDevTools }        from 'redux-devtools-extension';

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    redirect
))(createStore);

const txt = '../reducers';

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    module.hot && module.hot.accept(
        txt, () => store.replaceReducer(require('../reducers/index'))
    );

    return store;
}
