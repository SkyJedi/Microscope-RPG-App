import * as initialState from './initialState';

export const channel = (state = null, action) =>{
    if (action.type === 'channel_Changed')  return action.payload;
    return state;
};

export const events = (state = null, action) => {
    if (action.type === 'events_Changed') return action.payload;
    return state;
};

export const loading = (state = true, action) => {
    if (action.type === 'loading_Changed') return action.payload;
    return state;
};

export const logs = (state = null, action) => {
    if (action.type === 'logs_Changed') return action.payload;
    return state;
};

export const overview = (state = null, action) => {
    if (action.type === 'overview_Changed') return action.payload;
    return state;
};

export const palette = (state = initialState.palette, action) => {
    if (action.type === 'palette_Changed') return action.payload;
    return state;
};

export const periods = (state = initialState.periods, action) => {
    if (action.type === 'periods_Changed') return action.payload;
    return state;
};

export const players = (state = null, action) => {
    if (action.type === 'players_Changed') return action.payload;
    return state;
};

export const scenes = (state = null, action) => {
    if (action.type === 'scenes_Changed') return action.payload;
    return state;
};

export const show = (state = false, action) => {
    if (action.type === 'show_Changed') return action.payload;
    return state;
};

export const superTimeKey = (state = null, action) => {
    if (action.type === 'superTimeKey_Changed') return action.payload;
    return state;
};

export const timeKey = (state = null, action) => {
    if (action.type === 'timeKey_Changed') return action.payload;
    return state;
};

export const timeScale = (state = 'Period', action) => {
    if (action.type === 'timeScale_Changed') return action.payload;
    return state;
};

export const user = (state = null, action) => {
    if (action.type === 'user_Changed') return action.payload;
    return state;
};