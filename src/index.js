import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'react-popup';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import {App} from './components/index';
require('bootstrap/dist/css/bootstrap.css');

export const store = createStore(allReducers, {}, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
ReactDOM.render(
    <Provider store={store}>
        <Popup />
        </Provider>,
        document.getElementById('popupContainer')
);
