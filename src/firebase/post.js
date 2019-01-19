import axios from 'axios'
import { databaseRoot } from './firebaseConfig'
import { STORAGE_FOLDERS } from '../enums/Constants'
import { pushNewImage } from './firebase'
import snakeCase from 'lodash/snakeCase'
import now from 'lodash/now';

export const submitExtraFromHtml = async (newExtra, callback) => {
    const objectToPush = newExtra;
    objectToPush['time'] = now();
    axios.post(`${databaseRoot}/Extra/it.json`, objectToPush)
        .then(success => {
            pushNewImage(newExtra.image, 'ArticleImages', snakeCase(newExtra.imageName))
            callback(success)
        })
};

export const pushNewBonuswithGuide = async (newBonus, image, guide, internalImageData, circularImageData, language, callback) => {
    const newGuide = {
        bonus: newBonus,
        time: now(),
        content: guide
    }
    newBonus['time'] = now()

    try {
        const guidePushId = await axios.post(`${databaseRoot}/BonusGuides/it.json`, newGuide)
        newBonus['guideId'] = guidePushId.data.name
        const newBonusCallbackData = await axios.post(`${databaseRoot}/Bonus/it.json`, newBonus)
        await pushNewImage(image, STORAGE_FOLDERS.BONUS_IMAGES, `bonus_${snakeCase(newBonus.name)}`)
        await pushNewImage(internalImageData, STORAGE_FOLDERS.INTERNAL_BONUS_IMAGES, `bonus_internal_${snakeCase(newBonus.name)}`)
        await pushNewImage(circularImageData, STORAGE_FOLDERS.CIRCULAR_BONUS_IMAGES, `bonus_circular_${snakeCase(newBonus.name)}`)
        if (callback) callback(newBonusCallbackData)
    } catch (error) {
        console.log(error)
    }
}

export const updateBanners = async(banners, callback, onError) => {
    axios.patch(`${databaseRoot}/Banners/it/banners.json`, banners).then(success =>{
        callback(success)
    }).catch(error => onError(error))
}