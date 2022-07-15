import { applyMiddleware, combineReducers, createStore } from 'redux';

import multi from 'redux-multi';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { reducer as toastrReducer } from 'react-redux-toastr';

const reducers = {
  toastr: toastrReducer,
};

const reducer = combineReducers(reducers);

const store = applyMiddleware(multi, thunk, promise)(createStore)(reducer);

export default store;
