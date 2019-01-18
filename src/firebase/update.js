import axios from 'axios'
import now from 'lodash/now'
import { databaseRoot } from './firebaseConfig'
import snakeCase from 'lodash/snakeCase'
import { pushNewImage } from './firebase'
import { DATABASE_REFERENCE, STORAGE_FOLDERS } from '../enums/Constants'

export const updateExtraWithId = async (extraId, updatedObject, callback) => {
    const data = now();
    await pushNewImage(updatedObject.image, 'ArticleImages', snakeCase(updatedObject.imageName));

    const task = axios.patch(`${databaseRoot}/Extra/it/${extraId}.json`, { ...updatedObject, time: data });
    callback && callback(task)
};

export const updateBonusWithId =
    async (bonusId, updatedBonus, updatedImage, updatedBonusString, internalImageData, circularImage, callback) => {
        const data = now();
        const guideId = updatedBonus.guideId;
        // rest di un field che non serve
        updatedBonus['bonusId'] = undefined;
        const updatedGuide = { bonus: updatedBonus, time: now(), content: updatedBonusString };
        try {

            // update immagine bonus
            if (updatedImage)
                await pushNewImage(updatedImage, STORAGE_FOLDERS.BONUS_IMAGES, `bonus_${snakeCase(updatedBonus.name)}`);

            // update immagine interna
            if (internalImageData)
                await pushNewImage(internalImageData, STORAGE_FOLDERS.INTERNAL_BONUS_IMAGES, `bonus_internal_${snakeCase(updatedBonus.name)}`);
            if(circularImage)
                await pushNewImage(circularImage, STORAGE_FOLDERS.CIRCULAR_BONUS_IMAGES, `bonus_circular_${snakeCase(updatedBonus.name)}`);
            // update guida
            if (guideId) {
                await axios.patch(`${databaseRoot}/Bonus/it/${bonusId}.json`, { ...updatedBonus, time: data });
                await axios.patch(`${databaseRoot}/BonusGuides/it/${guideId}.json`, updatedGuide);
                await updateBonusInSlotNode(updatedBonus, bonusId)
            }
            else {
                const guideId = await axios.post(`${databaseRoot}/BonusGuides/it/.json`, updatedGuide);
                // update bonus
                updatedBonus['guideId'] = guideId.data.name;
                await axios.patch(`${databaseRoot}/Bonus/it/${bonusId}.json`, { ...updatedBonus, time: data });
                await updateBonusInSlotNode(updatedBonus, bonusId)

            }
        } catch (error) {
            console.log(error)
        }
    };

export const updateBonusInSlotNode = async (updatedBonus, updatedBonusId) => {
    const data = now();
    const list = await axios.get(`${databaseRoot}/Slots/it.json`);
    console.log(list.data);
    for(const id in list.data){
        const slot = list.data[id];

        // controllo update bonus normali
        if (slot.bonus !== undefined && slot.bonus[updatedBonusId] !== undefined){
                slot.bonus[updatedBonusId] = updatedBonus;
                axios.patch(`${databaseRoot}/Slots/it/${id}/bonus/${updatedBonusId}.json`, {...updatedBonus, time : data}).then(success => {
                    console.log(`Updated slot with id ${id} with bonus ${updatedBonus}`)
                    console.log(success)
                }).catch( error => {
                    console.log(`Failed update for slot with id ${id} with bonus ${updatedBonus}`)
                    console.log(error)
                })
        }

        // controllo update bonus speciali
        if (slot.bonusSpecial !== undefined && slot.bonusSpecial[updatedBonusId] !== undefined){
            slot.bonusSpecial[updatedBonusId] = updatedBonus;
            axios.patch(`${databaseRoot}/Slots/it/${id}/bonusSpecial/${updatedBonusId}.json`, {...updatedBonus, time : data}).then(success => {
                console.log(`Updated slot with id ${id} with bonusSpecial ${updatedBonus}`)
                console.log(success)
            }).catch( error => {
                console.log(`Failed update for slot with id ${id} with bonusSpecial ${updatedBonus}`)
                console.log(error)
            })
        }



    }
};

export const updateSlotWithId = async (slotId, updatedSlot, updatedImage, callback) => {
    const data = now();
    axios.patch(`${databaseRoot}/Slots/it/${slotId}.json`, { ...updatedSlot, time: data })
        .then((fullfilled) => {
            if (updatedImage) {
                pushNewImage(
                    updatedImage,
                    STORAGE_FOLDERS.SLOT_IMAGES,
                    `slot_${snakeCase(updatedSlot.name)}`
                )
            }
            const slotCard = {
                description: updatedSlot.description,
                name: updatedSlot.name,
                producer: updatedSlot.producer.name,
                rating: updatedSlot.rating,
                time: updatedSlot.time,
                type: updatedSlot.type
            };
            axios.patch(`${databaseRoot}/SlotsCard/it/${slotId}.json`, { ...slotCard, time: data });
            const slotMenu = {
                description: updatedSlot.description,
                name: updatedSlot.name,
                type: updatedSlot.type
            };
            axios.patch(`${databaseRoot}/SlotsMenu/it/${slotId}.json`, { ...slotMenu, time: data });
            callback();
            console.log('patched');
        })
        .catch(error => console.log(error)
        )
};

export const updateProducerWithId = (id, updatedProducer, updatedImage, callback) => {
    const data = now();
    axios.patch(`${databaseRoot}/Producer/it/${id}.json`, { ...updatedProducer, time: data })
        .then((fullfilled) => {
            if (updatedImage) {
                pushNewImage(
                    updatedImage,
                    STORAGE_FOLDERS.PRODUCER_IMAGES,
                    `producer_${snakeCase(updatedProducer.name)}`
                )
            }
            callback();
            console.log('patched');
        })
        .catch(error => console.log(error)
        )
};


export const setTypeInMenuCard = async () => {
    const response = await axios.get(`${databaseRoot}/SlotsCard/it.json`);
    const list = response.data;
    for (const key in list) {
        const slot = list[key];
        const oldSlotMenu = await axios.get(`${databaseRoot}/SlotsMenu/it/${key}.json`);
        await axios.patch(`${databaseRoot}/SlotsMenu/it/${key}.json`, { ...oldSlotMenu.data, type: slot.type })
    }

};