import {createStore,combineReducers} from 'redux'
import Play from './reducer/play'

const allReducers = {
    Play
}
export default createStore(combineReducers(allReducers));