const defaultState = []

const PopularSlotreducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_SLOT_POPULAR':
            return [...state, action.slotToAdd]
        default:
            return state

    }
}

export const addPopularSlot = (slotCard) => (
    {
        type: 'ADD_SLOT_POPULAR',
        slotToAdd: slotCard
    }
)

export default PopularSlotreducer