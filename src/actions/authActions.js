export const studentTypeChanged = (type) => {
  
    return (dispatch) => {
        dispatch({
            type: 'studentType_Changed',
            payload: type,
        });
    };
};

export const usernameChanged = (username) => {
  
    return (dispatch) => {
        dispatch({
            type: 'username_changed',
            payload: username,
        });
    };
};

export const emailChanged = (email) => {
    return (dispatch) => {
        dispatch({
            type: 'email_changed',
            payload: email,
        });
    };
};

export const passwordChanged = (password) => {
    return (dispatch) => {
        dispatch({
            type: 'password_changed',
            payload: password
        });
    };
};

export const confirmationPasswordChanged = (confirmationPassword) => {
    return (dispatch) => {
        dispatch({
            type: 'confirmationPassword_changed',
            payload: confirmationPassword
        });
    };
};