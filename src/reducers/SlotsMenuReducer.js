const defaultState = {}

const SlotsMenuReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_MENU_LIST':
            return action.newList
        default:
            return state
    }

}

export const updateSlotMenuList = (newList) => {
    return {
        type: 'UPDATE_MENU_LIST',
        newList: newList
    }
}

export default SlotsMenuReducer