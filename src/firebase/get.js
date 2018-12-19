import axios from 'axios'
import { COUNTRY, DATABASE_REFERENCE } from '../enums/Constants'
import { databaseRoot } from './firebaseConfig'
import store from '../store/store'
import { addSlotList, replaceSlotList } from '../reducers/SlotListReducer'
import { updateSlotMenuList } from '../reducers/SlotsMenuReducer'
import { addPopularSlot } from '../reducers/PopularSlotreducer'
import map from 'lodash/map'

export const getExtraById = async (id, callback) => {
    const extra = await axios.get(`${databaseRoot}/Extra/it/${id}.json`)
    callback && callback(extra)
}

export const getExtraList = async (callback) => {
    const extraList = await axios.get(`${databaseRoot}/Extra/it.json?orderBy="time"`)
    callback(extraList.data)
}

export const getProducerByName = async (producerName, callback) => {
    const producerData = await axios.get(`${databaseRoot}/Producer/it.json?orderBy="name"&equalTo="${producerName}"`)
    callback(producerData.data)
}

export const getGuideById = async (guideId, callback) => {
    axios.get(`${databaseRoot}/BonusGuides/it/${guideId}.json`)
        .then(value => {
            callback && callback(value.data)
        })
        .catch(
            fail => {
                axios.get(`${databaseRoot}/Extra/it/${guideId}.json`)
                    .then(value => {
                        callback && callback(value.data)
                    })
            }
        )
};

export const getPopularSlots = () => {
    const idListToFetch = ['-LMTB6IRITXsmWGp4e-s', '-LLt3eNw41nayvVTDtSC',
        '-LMTDa-DXBM08cj454s5', '-LLtKLvdUfpgpLPJU_5x',
        '-LLVjwJsBoMYGlYTQmzE', '-LLtVumsNX92o6518exz',
        '-LMJ7Hu1ifdhKmRB4lDo', '-LMIsiZ_b3kF9UtnJ9bC'];
    const queries = map(idListToFetch, id => axios.get(`${databaseRoot}/SlotsCard/it/${id}.json`));
    axios.all(queries).then(axios.spread(
        (one, two, three, four, five, six, seven, eight) => {
            const One = { ...one.data, id: '-LMTB6IRITXsmWGp4e-s' };
            const Two = { ...two.data, id: '-LLt3eNw41nayvVTDtSC' };
            const Three = { ...three.data, id: '-LMTDa-DXBM08cj454s5' };
            const Four = { ...four.data, id: '-LLtKLvdUfpgpLPJU_5x' };
            const Five = { ...five.data, id: '-LLVjwJsBoMYGlYTQmzE' };
            const Six = { ...six.data, id: '-LLtVumsNX92o6518exz' };
            const Seven = { ...seven.data, id: '-LMJ7Hu1ifdhKmRB4lDo' };
            const Eight = { ...eight.data, id: '-LMIsiZ_b3kF9UtnJ9bC' };
            store.dispatch(addPopularSlot(One));
            store.dispatch(addPopularSlot(Two));
            store.dispatch(addPopularSlot(Three));
            store.dispatch(addPopularSlot(Four));
            store.dispatch(addPopularSlot(Five));
            store.dispatch(addPopularSlot(Six));
            store.dispatch(addPopularSlot(Seven));
            store.dispatch(addPopularSlot(Eight));
        }
    ))
};

export const getBonusWithId = (id, country, callback) => {
    let c = COUNTRY.ITALY;
    axios.get(`${databaseRoot}/Bonus/it/${id}.json`)
        .then(
            success => callback(success.data)
        )
};

export const getBonusWithGuide = async (id, country, callback) => {
    let c = COUNTRY.ITALY;
    const bonusData = await axios.get(`${databaseRoot}/Bonus/it/${id}.json`)
    const guideData = await axios.get(`${databaseRoot}/BonusGuides/it/${bonusData.data.guideId}.json`)
    callback(bonusData, guideData)
};

export const getSlotsForMenu = (callback) => {
    let c = COUNTRY.ITALY;
    axios.get(`${databaseRoot}/SlotsMenu/it.json`)
        .then(
            response => {
                store.dispatch(updateSlotMenuList(response.data))
            }
        )
};

export const getSlotBasedOnProducer = (producerName, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="name"&startAt="${producerName}"`)
        .then(
            list => {
                store.dispatch(addSlotList(list.data))
            }
        ).catch(err => console.log(err)
        )
};

export const getSlotsCardBasedOnTime = (limit, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="time"&limitToLast=${limit}`)
        .then(
            list => {
                // console.log(list)
                store.dispatch(replaceSlotList(list.data))
            }
        ).catch(err => console.log(err)
        )
};

export const loadNextChunk = (limit, end, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="time"&endAt=${end}&limitToLast=${limit}`)
        .then(
            list => {
                store.dispatch(addSlotList(list.data))
            }
        )
};

export const getAllByType = (type, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="type"&equalTo="${type}"`)
        .then(
            list => {
                console.log(list.data);

                store.dispatch(replaceSlotList(list.data))
            }
        )
};

export const getSlotListByProducerName = (producerName, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="producer"&equalTo="${producerName}"`)
        .then(
            list => {
                console.log(list);
                callback(list.data)
            }
        ).catch(
            err => console.log(err)
        )
};

export const getSlotsCardBasedOnName = (text, limit, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="name"&startAt="${text}"&endAt="${text}\uf8ff"`)
        .then(
            list => console.log(list.data)
        )
};

export const getSlotsCardBasedOnRating = (limit, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="rating"&limitToLast=${limit}`)
        .then(
            list => console.log(list.data)
        )
};

export const getBonusList = (callback, country) => {
    let c = COUNTRY.ITALY;
    axios.get(`${databaseRoot}/Bonus/${c}.json`)
        .then(
            success => callback(success.data)
        )
};

export const getProducerList = (callback, country) => {
    let c = COUNTRY.ITALY;
    axios.get(`${databaseRoot}/Producer/${c}.json`)
        .then(
            success => callback(success.data)
        )
};

export const getSlotList = (callback, country) => {
    let c = COUNTRY.ITALY;
    axios.get(`${databaseRoot}/SlotsCard/${c}.json`)
        .then(
            success => callback(success.data)
        )
};

export const getSlotWithId = (id, callback, country) => {
    let c = COUNTRY.ITALY;
    axios.get(`${databaseRoot}/Slots/${c}/${id}.json`)
        .then(
            success => callback(success.data)
        )
};

export const getProducerWithId = (id, callback, country) => {
    let c = COUNTRY.ITALY;
    axios.get(`${databaseRoot}/${DATABASE_REFERENCE.PRODUCER}/${c}/${id}.json`)
        .then(
            success => callback(success.data)
        )
};