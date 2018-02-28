import * as initialState from './initialState';

export const channel = (state = null, action) =>{
    if (action.type === 'channel_Changed')  return action.payload;
    return state;
};

export const user = (state = null, action) =>{
    if (action.type === 'user_Changed')  return action.payload;
    return state;
};

export const periods = (state = initialState.periods, action) => {
    if (action.type === 'periods_Changed') return action.payload;
    return state;
};