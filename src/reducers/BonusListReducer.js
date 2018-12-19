const defaultListState = {};

const bonusListReducer = (state = defaultListState, action) => {
    switch (action.type) {
        case 'ADD_SINGLE_BONUS':
            return [
                ...state,
                action.bonusToAdd
            ]
        case 'ADD_BONUS_LIST': {
            return action.bonusListToAdd
        }
        default:
            return state
    }
}

export const addSingleBonus = (bonus) => {
    return {
        type: 'ADD_SINGLE_BONUS',
        bonusToAdd: bonus
    }
}

export const addBonusList = bonusList => ({
    type: 'ADD_BONUS_LIST',
    bonusListToAdd: bonusList
})

export default bonusListReducer;