import truncate from 'lodash/truncate'
import snakeCase from 'lodash/snakeCase'
import { IMGS_SIZES } from '../enums/Constants'

import split from 'lodash/split'
import dropRight from "lodash/dropRight"
import map from "lodash/map"
import replace from "lodash/replace"
import forEach from "lodash/forEach"
import filter from 'lodash/filter'
import he from 'he'

export const replaceTextTips = (text) => {

    const QUALCHE_STRING = text

    let listArray = split(QUALCHE_STRING, '</li>')
    console.log(listArray)
    //va rimosso l'ultimo elemento che è stringa vuota
    listArray = dropRight(listArray, 1)
    console.log(listArray)
    //sostituzione
    listArray = map(listArray, x => replace(x, '<li>', '@'))
    console.log(listArray)
    //stringa finale
    let finalString = ''
    forEach(listArray, x => finalString += x)

    return finalString
}

export const replaceTextTec = (text) => {

    const QUALCHE_STRING = text

    let listArray = split(QUALCHE_STRING, '</li>')
    console.log(listArray)
    //va rimosso l'ultimo elemento che è stringa vuota
    listArray = dropRight(listArray, 1)
    console.log(listArray)
    //sostituzione
    listArray = map(listArray, x => replace(x, '<li>', '$'))
    console.log(listArray)
    //stringa finale
    let finalString = ''
    forEach(listArray, x => finalString += x)

    return finalString
}

export const removeHtmlFrom = (str) => {
    if ((str === null) || (str === '') || (str === undefined))
        return '';
    else
        str = str.toString();
    return he.decode(str.replace(/<[^>]*>/g, ''));
}

// costruisce il link ad un immagine
export const getImageLinkFromName = (type, name, size, ) => {
    const urlStart = 'https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/'
    const slotFolder = 'SlotImages%2F'
    const bonusFolder = 'BonusImages%2F'
    const producerFolder = 'ProducerImages%2F'
    const articleFolder = 'ArticleImages%2F'
    const internalBonusfolder = 'InternalBonusImages%2F'
    const circularBonusImageFolder = 'CircularBonusImages%2F'
    const urlEnd = '?alt=media'

    if (type === 'slot') {
        switch (size) {
            case 'small':
                return `${urlStart}${slotFolder}thumb_${IMGS_SIZES.SMALL}_slot_${snakeCase(name)}${urlEnd}`
            case 'medium':
                return `${urlStart}${slotFolder}thumb_${IMGS_SIZES.MEDIUM}_slot_${snakeCase(name)}${urlEnd}`
            case 'big':
                return `${urlStart}${slotFolder}slot_${snakeCase(name)}${urlEnd}`
            default:
                return `${urlStart}${slotFolder}thumb_${IMGS_SIZES.MEDIUM}_slot_${snakeCase(name)}${urlEnd}`
        }
    }

    if (type === 'bonus') {
        return `${urlStart}${bonusFolder}bonus_${snakeCase(name)}${urlEnd}`
    }

    if(type === 'bonus_circular'){
        return `${urlStart}${circularBonusImageFolder}bonus_circular_${snakeCase(name)}${urlEnd}`
    }

    if (type === 'bonusInternal') {
        return `${urlStart}${internalBonusfolder}bonus_internal_${snakeCase(name)}${urlEnd}`
    }

    if (type === 'producer') {
        switch (size) {
            case 'small':
                return `${urlStart}${producerFolder}thumb_${IMGS_SIZES.SMALL}_producer_${snakeCase(name)}${urlEnd}`
            default:
                return `${urlStart}${producerFolder}producer_${snakeCase(name)}${urlEnd}`
        }
    }

    if (type === 'article') {
        return `${urlStart}${articleFolder}${snakeCase(name)}_article_image${urlEnd}`
    }


}


export const formatList = (slotList, bonusList, producerList) => {

    // oggetto di base,
    // results deve contenere una lista di oggetti con questa struttura :
    /*
        {
            "title": "Bruen - Green",
            "description": "Monitored analyzing moratorium",
            "image": "https://s3.amazonaws.com/uifaces/faces/twitter/msveet/128.jpg",
            "price": "$88.56"
        },
    */

    const truncateOptions = { length: '60', omission: '...' }
    const list = {
        SlotOnline: {
            name: "Slot Online",
            results: []
        },
        SlotBar: {
            name: "Slot Bar",
            results: []
        },
        Bonus: {
            name: "Bonus",
            results: []
        },
        Produttori: {
            name: "Produttori",
            results: []
        },
    }


    let l = []

    for (const key in slotList) {
        let x = slotList[key]
        x['id'] = key
        l.push(x)
    }



    const slotOnline = filter(l, (slot) => {
        return slot.type === 'GRATIS'
    });
    const slotBar = filter(l, (slot) => slot.type === 'BAR');

    console.log(slotOnline);


    for (const slot in slotOnline) {
        const current = slotOnline[slot]
        slotOnline.push({
            id: current.id,
            title: current.name,
            description: `${truncate(removeHtmlFrom(current.description), truncateOptions)}`,
            image: getImageLinkFromName('slot', current.name, 'small'),
            original: current,
            type: 'slot-online'
        })
    }

    for (const slot in slotBar) {
        const current = slotBar[slot]
        slotBar.push({
            id: current.id,
            title: current.name,
            description: `${truncate(removeHtmlFrom(current.description), truncateOptions)}`,
            image: getImageLinkFromName('slot', current.name, 'small'),
            original: current,
            type: 'slot-bar'
        })
    }

    const formattedBonus = []
    for (const bonus in bonusList) {
        const current = bonusList[bonus]
        formattedBonus.push({
            id: bonus,
            title: `Bonus ${current.name}`,
            description: current.bonus,
            image: getImageLinkFromName('bonus', current.name, 'medium'),
            link: current.link,
            type: 'bonus'
        })
    }

    const formattedProducer = []
    for (const producer in producerList) {
        const current = producerList[producer]
        formattedProducer.push({
            id: producer,
            title: current.name,
            image: getImageLinkFromName('producer', current.name),
            link: current.link,
            description: `${truncate(removeHtmlFrom(current.description), truncateOptions)}`,
            type: 'producer'
        })
    }


    list['SlotOnline']['results'] = slotOnline
    list['SlotBar']['results'] = slotBar
    list['Bonus']['results'] = formattedBonus
    list['Produttori']['results'] = formattedProducer


    return list
}

export const smoothScrollTo = (elementId) => {
    document.getElementById(elementId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}


export const doesFileExist = (urlToFile) => {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status === "404") {
        return false;
    } else {
        return true;
    }
}
