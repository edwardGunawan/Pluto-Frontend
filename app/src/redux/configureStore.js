import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import rootReducers, {rootEpic} from './reducers';

const epicMiddleware = createEpicMiddleware();

export default function configureStore(initialState) {
    const store = createStore(
        rootReducers,
        initialState,
        applyMiddleware(thunk, epicMiddleware)
    )
    epicMiddleware.run(rootEpic);
    return store;
}

