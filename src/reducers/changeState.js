export const channel = (state = null, action) =>{
    if (action.type === 'channel_Changed')  return action.payload;
    return state;
};

export const user = (state = null, action) =>{
    if (action.type === 'user_Changed')  return action.payload;
    return state;
};
