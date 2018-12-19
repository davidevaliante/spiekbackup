const defaultState = false

const playModeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'IS_PLAYING':
            return true
        case 'IS_NOT_PLAYING':
            return false
        default:
            return defaultState
    }
}

export const setUserPlaying = () => {
    return {
        type: 'IS_PLAYING',
    }
}

export const setUserNotPlaying = () => {
    return {
        type: 'IS_NOT_PLAYING',
    }
}

export default playModeReducer;