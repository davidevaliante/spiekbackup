const defaultListState = {};

const producerListReducer = (state = defaultListState, action) => {
    switch (action.type) {
        case 'ADD_SINGLE_PRODUCER':
            return [
                ...state,
                action.producerToAdd
            ]
        case 'ADD_PRODUCER_LIST': {
            return action.producerListToAdd
        }
        default:
            return state
    }
}

export const addSingleProducer = (producer) => {
    return {
        type: 'ADD_SINGLE_PRODUCER',
        producerToAdd: producer
    }
}

export const addProducerList = producerList => ({
    type: 'ADD_PRODUCER_LIST',
    producerListToAdd: producerList
})

export default producerListReducer;