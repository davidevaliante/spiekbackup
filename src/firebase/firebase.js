import firebase from 'firebase/app';
import 'firebase/storage'
import { COUNTRY, STORAGE_FOLDERS } from '../enums/Constants';
import now from 'lodash/now';
import axios from 'axios'
import snakeCase from 'lodash/snakeCase'
import { configuration, databaseRoot } from './firebaseConfig';

const firebaseApp = firebase.initializeApp(configuration);
export const getFirebase = () => firebase;

export const updateSlotImage = async (name, image) => {
    pushImage(image, `slot_${name}`, () => console.log("Submitted"))
}

export const deleteImages = async (name) => {
    await firebase.storage().ref().child(`slot_${snakeCase(name)}`).delete().catch((err) => console.log(err))
    await firebase.storage().ref().child(`thumb_250_slot_${snakeCase(name)}`).delete().catch((err) => console.log(err))
    await firebase.storage().ref().child(`thumb_64_slot_${snakeCase(name)}`).delete().catch((err) => console.log(err))
}

export const pushNewImage = async (image, folderName, imageName, callback) => {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${folderName}/${imageName}`).put(image)
        .then(
            (snapshot) => snapshot.ref.getDownloadURL()
                .then(
                    (url) => callback && callback(url)
                )
                .catch(
                    (error) => { console.log(error) }
                )
                .catch(
                    (error) => { console.log(error) }
                )
        )
};

export const pushImage = (image, imageName, callback) => {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${imageName}`).put(image)
        .then(
            (snapshot) => snapshot.ref.getDownloadURL()
                .then(
                    (url) => callback && callback(url)
                )
                .catch(
                    (error) => { console.log(error) }
                )
                .catch(
                    (error) => { console.log(error) }
                )
        )
};


export const pushNewSlot = (newSlot, imageData, onPushSlotSuccess, country) => {
    newSlot['time'] = now();
    let c = COUNTRY.ITALY;
    axios.post(`${databaseRoot}/Slots/${c}.json`, newSlot)
        .then(
            (success) => {
                const key = success.data.name;
                axios.put(`${databaseRoot}/Producer-Slot/${newSlot.producer.id}/${key}.json`, true);
                for (const bonusId in newSlot.bonus) {
                    axios.put(`${databaseRoot}/Bonus-Slot/${bonusId}/${key}.json`, true)
                }

                pushNewImage(
                    imageData.imageFile,
                    `${STORAGE_FOLDERS.SLOT_IMAGES}`,
                    `slot_${snakeCase(newSlot.name)}`,
                );
                onPushSlotSuccess();
            }
        )
};

export const pushNewBonus = (newBonus, imageData, country, onBonusPushSuccess) => {
    newBonus['time'] = now();
    let c = COUNTRY.ITALY;
    axios.post(`${databaseRoot}/Bonus/${c}.json`, newBonus)
        .then(
            (success) => {
                pushNewImage(
                    imageData,
                    `${STORAGE_FOLDERS.BONUS_IMAGES}`,
                    `bonus_${snakeCase(newBonus.name)}`
                );
                onBonusPushSuccess()
            }
        )
};


export const pushNewProducer = (newProducer, image, callback, country) => {
    newProducer['time'] = now();
    let c = COUNTRY.ITALY;
    axios.post(`${databaseRoot}/Producer/${c}.json`, newProducer)
        .then(
            (success) => {
                pushNewImage(
                    image,
                    STORAGE_FOLDERS.PRODUCER_IMAGES,
                    `producer_${snakeCase(newProducer.name)}`
                );
                callback()
            }
        )


};


// ----------------------NON CANCELLARE MA NON USARE---------------------
/* export const swapSlotsToNewDatabase = () => {
    // prende l'oggetto completo con tutte le slot
    axios.get(`${databaseRoot}/Slots.json`)
        .then(
            (snapshot) => {
                const slotList = snapshot.data
                // per ogni chiave (cioè id)
                for (const id in slotList) {
                    const slot = slotList[id]
                    if (!slot.isFake) {
                        axios.put(`${databaseRoot}/Slots/it/${id}.json`, omit(slot, ['isFake', 'image']))
                    }
                }
            }
        )
}

export const swapBonusToNewDatabase = () => {
    // prende l'oggetto completo con tutte le slot
    axios.get(`${databaseRoot}/Bonus.json`)
        .then(
            (snapshot) => {
                const bonusList = snapshot.data
                // per ogni chiave (cioè id)
                for (const id in bonusList) {
                    const slot = bonusList[id]
                    axios.put(`${databaseRoot}/Bonus/it/${id}.json`, slot)
                }
            }
        )
}

export const swapProducerToNewDatabase = () => {
    // prende l'oggetto completo con tutte le slot
    axios.get(`${databaseRoot}/Producer.json`)
        .then(
            (snapshot) => {
                const producerList = snapshot.data
                // per ogni chiave (cioè id)
                for (const id in producerList) {
                    const slot = producerList[id]
                    axios.put(`${databaseRoot}/Producer/it/${id}.json`, slot)
                }
            }
        )
}

export const removeImageLink = () => {
    axios.get(`${databaseRoot}/Producer/it.json`)
        .then(
            (snapshot) => {
                const slotList = snapshot.data
                for (const id in slotList) {
                    axios.delete(`${databaseRoot}/Producer/it/${id}/image.json`)

                }
            }
        )
}

export const purgeDb = () => {
    axios.get(`${databaseRoot}/${DATABASE_REFERENCE.SLOT}.json`)
        .then(
            snapshot => {
                const l = snapshot.data
                for (const id in l) {
                    if (id !== 'it')
                        axios.delete(`${databaseRoot}/${DATABASE_REFERENCE.SLOT}/${id}.json`)
                }
            }
        )
    axios.get(`${databaseRoot}/${DATABASE_REFERENCE.BONUS}.json`)
        .then(
            snapshot => {
                const l = snapshot.data
                for (const id in l) {
                    if (id !== 'it')
                        axios.delete(`${databaseRoot}/${DATABASE_REFERENCE.BONUS}/${id}.json`)
                }
            }
        )
    axios.get(`${databaseRoot}/${DATABASE_REFERENCE.PRODUCER}.json`)
        .then(
            snapshot => {
                const l = snapshot.data
                for (const id in l) {
                    if (id !== 'it')
                        axios.delete(`${databaseRoot}/${DATABASE_REFERENCE.PRODUCER}/${id}.json`)
                }
            }
        )
} */

