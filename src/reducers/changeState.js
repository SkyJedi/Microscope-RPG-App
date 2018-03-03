import * as initialState from './initialState';
import * as Components from '../components/index';
import React from 'react';


export const channel = (state = null, action) =>{
    if (action.type === 'channel_Changed')  return action.payload;
    return state;
};

export const display = (state = <Components.PeriodTimeline/>, action) => {
    if (action.type === 'display_Changed') return action.payload;
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

export const overview = (state = null, action) => {
    if (action.type === 'overview_Changed') return action.payload;
    return state;
};
export const periods = (state = initialState.periods, action) => {
    if (action.type === 'periods_Changed') return action.payload;
    return state;
};

export const scenes = (state = null, action) => {
    if (action.type === 'scenes_Changed') return action.payload;
    return state;
};

export const user = (state = null, action) => {
    if (action.type === 'user_Changed') return action.payload;
    return state;
};