import {useState, lazy} from 'react'
import {Routes, useRoutes, Route, Link} from "react-router-dom";

import AppCom from './components/AppCom'

import './App.less'

function App() {

    return (
        <div className="App">
            <AppCom></AppCom>
        </div>
    )
}

export default App
