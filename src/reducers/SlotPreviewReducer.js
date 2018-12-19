const defaultState = {}

const slotPreviewReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_PREVIEW':
            return action.slotPreview

        case 'CLEAN':
            return {

            }

        default:
            return state
    }
}

export const updateSlotPreview = (newSlotPreview) => {
    console.log(newSlotPreview);

    return {
        type: 'UPDATE_PREVIEW',
        slotPreview: newSlotPreview
    }
}

export const cleanSlotPreview = () => {
    return {
        type: 'CLEAN',
    }
}

export default slotPreviewReducer