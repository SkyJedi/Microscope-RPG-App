import {combineReducers} from 'redux';
import * as changeState from './changeState';

const allReducers = combineReducers({
    channel: changeState.channel,
    events: changeState.events,
    loading: changeState.loading,
    logs: changeState.logs,
    overview: changeState.overview,
    palette: changeState.palette,
    periods: changeState.periods,
    scenes: changeState.scenes,
    show: changeState.show,
    superTimeKey: changeState.superTimeKey,
    timeKey: changeState.timeKey,
    timeScale: changeState.timeScale,
    user: changeState.user,
});
export default allReducers;
