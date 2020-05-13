import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const app =(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)
    


ReactDOM.render(app, document.getElementById('root'));

