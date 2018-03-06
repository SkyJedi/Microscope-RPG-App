import {db} from '../firestore/db';

const localData = ['user', 'channel', 'display'];

export const loadData = () => {
    return (dispatch, getState) => {
        const channel = getState().channel;
        let dataTypes = ['periods', 'events', 'scenes', 'overview', 'palette', 'logs'];
        dataTypes.forEach((type, index) => {
            db.doc(`channel/${channel}/data/${type}/`).onSnapshot((doc) => {
                if (doc.exists) dispatch({type: `${type}_Changed`, payload: doc.data()});
                if (dataTypes.length >= index + 1) dispatch({type: `loading_Changed`, payload: false});
            }, (error) => {
            });
        });

    }
};

export const changeData = (data, type, merge = true) => {
    return (dispatch, getState) => {
        const channel = getState().channel;
        const dbRef = db.doc(`channel/${channel}/data/${type}/`);
        if (!localData.includes(type)) dbRef.set(data, {merge: merge});
        else dispatch({type: `${type}_Changed`, payload: data})
    }
};
