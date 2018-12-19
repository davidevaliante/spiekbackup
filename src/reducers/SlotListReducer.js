const defaultListState = {};

const SlotListReducer = (state = defaultListState, action) => {
    switch (action.type) {
        case 'ADD_SINGLE_SLOT':
            return [
                ...state,
                action.slotToAdd
            ]
        case 'ADD_SLOT_LIST': {
            return {
                ...state,
                ...action.slotListToAdd
            }
        }
        case 'REPLACE_SLOT_LIST':
            return action.newList

        default:
            return state
    }
}

export const addSingleSlot = (slot) => {
    return {
        type: 'ADD_SINGLE_SLOT',
        slotToAdd: slot
    }
}

export const replaceSlotList = (newList) => {
    return {
        type: 'REPLACE_SLOT_LIST',
        newList: newList
    }
}

export const addSlotList = slotList => ({
    type: 'ADD_SLOT_LIST',
    slotListToAdd: slotList
})

export default SlotListReducer;