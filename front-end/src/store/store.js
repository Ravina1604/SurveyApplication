import { createStore,combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk'

import authReducer from './reducers/auth';
import surveyReducer from './reducers/surveys';

const rootReducer = combineReducers({
   auth: authReducer,
   surveys: surveyReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;