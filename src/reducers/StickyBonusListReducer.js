const defaultState = {}

const stickyBonusListReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_REF':
            return action.contextRef
        default:
            return state
    }
}

export const setContextRef = (contextRef) => ({ type: 'SET_REF', contextRef: contextRef })

export default stickyBonusListReducer;