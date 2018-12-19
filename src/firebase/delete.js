import axios from "axios";
import firebase from "firebase";
import snakeCase from "lodash/snakeCase";
import { databaseRoot } from "./firebaseConfig";
import { storageRef, pushNewImage } from './firebase'

export const deleteExtraWithId = async (id, callback) => {
    await axios.delete(`${databaseRoot}/Extra/it/${id}.json`)
    callback && callback(id)
}

export const deleteSlotWithId = (id, callback) => {
    axios.get(`${databaseRoot}/Slots/it/${id}/name.json`)
        .then(
            success => {
                const slotName = success.data;
                axios.delete(`${databaseRoot}/Slots/it/${id}.json`)
                    .then(
                        () => {
                            callback()
                            // firebase.storage().ref().child(`SlotImages/${snakeCase(slotName)}`).delete()
                            //     .then(() => callback())
                        }
                    )
            }
        );
    axios.delete(`${databaseRoot}/SlotsCard/it/${id}.json`);
    axios.delete(`${databaseRoot}/SlotsMenu/it/${id}.json`);
};

export const deleteBonusWithId = (id, callback) => {
    axios.get(`${databaseRoot}/Bonus/it/${id}/name.json`)
        .then(
            success => {
                const bonusName = success.data;
                axios.delete(`${databaseRoot}/Bonus/it/${id}.json`)
                    .then(
                        () => {
                            callback()
                            // firebase.storage().ref().child(`BonusImages/${snakeCase(bonusName)}`).delete()
                            //     .then(() => callback())
                        }
                    )
            }
        )
};

export const deleteProducerWithId = (id, callback) => {
    axios.get(`${databaseRoot}/Producer/it/${id}/name.json`)
        .then(
            success => {
                const ProducerName = success.data;
                axios.delete(`${databaseRoot}/Producer/it/${id}.json`)
                    .then(
                        () => {
                            callback()
                            // firebase.storage().ref().child(`ProducerImages/${snakeCase(ProducerName)}`).delete()
                            //     .then(() => callback())
                        }
                    )
            }
        )
};