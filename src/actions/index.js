import {db} from '../firestore/db';

export const changeData = (data, type) => {
    return (dispatch, getState) => {
        const channel = getState().channel;
        const dbRef = db.doc(`channel/${channel}/data/${type}/`);
        if (type !== 'user' && type !== 'channel') dbRef.set(data);
        dispatch({type: `${type}_Changed`, payload: data})
    }
};
