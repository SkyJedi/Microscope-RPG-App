import {combineReducers} from 'redux';
import * as changeState from './changeState';

const allReducers = combineReducers({
    channel: changeState.channel,
    user: changeState.user,
    periods: changeState.periods,
});
export default allReducers;
