const defaultState = { isLoading: true }

const slotPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_SLOT':
            return { ...state, currentSlot: action.currentSlot }

        case 'RESET_CURRENT_SLOT':
            return {
                currentSlot: undefined
            }
        case 'SLOT_IS_LOADING':
            return {
                ...state,
                isLoading: true
            }

        case 'SLOT_IS_LOADED':
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export const slotIsLoading = () => {
    return { type: 'SLOT_IS_LOADING' }
}

export const slotIsLoaded = () => {
    return { type: 'SLOT_IS_LOADED' }
}

export const resetSlotImage = () => {
    return {
        type: 'SWITCH',
    }
}

export const updateCurrentSlot = (slot) => {
    return {
        type: 'UPDATE_CURRENT_SLOT',
        currentSlot: slot
    }
}



export const resetCurrentSlot = (slot) => {
    return {
        type: 'UPDATE_CURRENT_SLOT',
        currentSlot: undefined
    }
}


export default slotPageReducer;