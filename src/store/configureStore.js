import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
// https://github.com/gaearon/redux-thunk
import logger from 'redux-diff-logger';
https://www.npmjs.com/package/redux-diff-logger

export default function configureStore(initialState) {
    const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
    // P how is initialState passed into this function?
    // I it is a const in the reducers' grid component!
    const store = createStoreWithMiddleware(rootReducer, initialState);

    // P what is hot? is this a handy mechnism used for live reload of a store on the server?
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}