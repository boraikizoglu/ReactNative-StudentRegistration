const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    confirmationPassword: '',
    studentType: '',
};

export default ( state = INITIAL_STATE, action)=> {
    
    switch(action.type){
        case 'username_changed':
            return { ...state, username: action.payload};
        case 'email_changed':
            return { ...state, email: action.payload};
        case 'password_changed':
            return { ...state, password: action.payload};
        case 'confirmationPassword_changed':
            return { ...state, confirmationPassword: action.payload};
        case 'studentType_Changed':
        return { ...state, studentType: action.payload};
        default:
            return state;
    }
};