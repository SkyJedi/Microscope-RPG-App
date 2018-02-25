export const changeData = (data, type) => {
    return (dispatch) => {
        dispatch({type: `${type}_Changed`, payload: data})
    }
};

