import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { App } from './components/App';

import { store } from './helpers';

import { render } from 'react-dom';
import { Provider } from 'react-redux';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);