const defaultAuthState = {
    isLoggedIn : false,
    userName : undefined,
    userId : undefined
};

const authReducer = (state = defaultAuthState, action) => {
    switch(action.type){
        case 'MAKE_USER_LOGGED_IN':
            return {
                ...state,
                'isLoggedIn':action.isLoggedIn
            };
        case 'MAKE_USER_LOGGED_OUT':
            return {
                ...state,
                'isLoggedIn':action.isLoggedIn
            };
        case 'SET_USERNAME':
            return{
                ...state,
                'userName':action.userName
            };
        case 'SET_USERID':
            return{
                ...state,
                'userId':action.userId
            }
        default:
            return state;
    }
}

export const setUserLoggedIn = () => {
    return {
        type:'MAKE_USER_LOGGED_IN',
        isLoggedIn:true
    }
}

export const setUserLoggedOut = () => {
    return {
        type:'MAKE_USER_LOGGED_OUT',
        isLoggedIn:false
    }
}

export const setUserName = (userName) => {
    return {
        type:'SET_USERNAME',
        userName : userName
    }
}

export const setUserId = (userId) => {
    return {
        type:'SET_USERID',
        userId : userId
    }
}

export default authReducer;
