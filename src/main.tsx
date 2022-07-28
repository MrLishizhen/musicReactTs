import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from "react-router-dom";
import './index.css'
import App from './App'
import './resize.js'
import '@icon-park/react/styles/index.css'
import store from './redux/index'
import {Provider} from 'react-redux'


import '@icon-park/react/styles/index.css';
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
