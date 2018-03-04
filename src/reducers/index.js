import {combineReducers} from 'redux';
import * as changeState from './changeState';

const allReducers = combineReducers({
    channel: changeState.channel,
    display: changeState.display,
    events: changeState.events,
    loading: changeState.loading,
    overview: changeState.overview,
    palette: changeState.palette,
    periods: changeState.periods,
    scenes: changeState.scenes,
    user: changeState.user,
});
export default allReducers;
