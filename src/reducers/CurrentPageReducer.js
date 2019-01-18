import { PAGES } from '../enums/Constants';

const defaultCurrentPageState = PAGES.HOME


const currentPageReducer = (state = defaultCurrentPageState, action) => {

    switch (action.type) {
        case PAGES.HOME:
            return PAGES.HOME
        case PAGES.SLOT_BAR:
            return PAGES.SLOT_BAR
        case PAGES.SLOT_GRATIS:
            return PAGES.SLOT_GRATIS
        case PAGES.ABOUT:
            return PAGES.ABOUT
        case PAGES.SLOT:
            return PAGES.SLOT
        case PAGES.ARTICLE:
            return PAGES.ARTICLE
        case PAGES.VLT:
            return PAGES.VLT
        case PAGES.PRODUCER:
            return {
                displaying: PAGES.PRODUCER,
                producerName: action.producerName
            }
        default:
            return state
    }
}

export const setProducerPage = (producerName) => {
    return {
        type: PAGES.PRODUCER,
        producerName: producerName
    }
}

export const setAboutPage = () => {
    return {
        type: PAGES.ABOUT
    }
}

export const setHomePage = () => {
    return {
        type: PAGES.HOME,
    }
}

export const setSlotPage = () => {
    return {
        type: PAGES.SLOT
    }
}


export const setBarPage = () => {
    return {
        type: PAGES.SLOT_BAR,
    }
}


export const setGratisPage = () => {
    return {
        type: PAGES.SLOT_GRATIS,
    }
}

export const setVltPage = () => {
    return {
        type: PAGES.VLT,
    }
}
export const setArticlePage = () => {
    return {
        type: PAGES.ARTICLE,
    }
}



export default currentPageReducer