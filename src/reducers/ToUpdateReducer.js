const defaultState = false;

const toUpdateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'TO_UPDATE':
            console.log('toUpdateReducer::', action, state)
            return !state
        default:
            return defaultState
    }
}

export const setToUpdate = () => {
    return {
        type: 'TO_UPDATE',
    }
}

export default toUpdateReducer;
