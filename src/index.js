import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import {App} from './components/index';

require('bootstrap/dist/css/bootstrap.css');
require('./styles/index.css');

export const store = createStore(allReducers, {}, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <div className='container-fluid container-scroll'>
            <App/>
        </div>
    </Provider>,
    document.getElementById('root')
);
