import React from 'react'
import PropTypes from 'prop-types'
// components
import SlotCard from './Cards/SlotCard';
// mix
import chunk from 'lodash/chunk'
import orderBy from 'lodash/orderBy'



const FixedSlotList = (props) => {

    // di base renderizza props.maxSlot elementi ma scrollando ne deve carica altre 
    const slotListToRows = (slotList, ordering) => {
        let listOfSlots = []
        for (const key in slotList) {
            const element = slotList[key]
            if (element['id'] === undefined)
                element['id'] = key
            listOfSlots.push(element)
        }

        switch (ordering) {
            case 'time':
                listOfSlots = orderBy(listOfSlots, ['time'], ['desc'])
                break
            case 'rating':
                listOfSlots = orderBy(listOfSlots, ['rating'], ['desc'])
                break
            case 'name':
                listOfSlots = orderBy(listOfSlots, ['name'], ['asc'])
                break
            default:
                listOfSlots = orderBy(listOfSlots, ['time'], ['desc'])
        }

        const rows = chunk(listOfSlots, props.cardPerRow)

        return rows.map((row, index) => (
            <div className='horizontal-center' key={`slot_row_${index}`}>
                {row.map((element) =>
                    (element && <SlotCard slot={element} key={element.id} />))
                }
            </div>
        ))
    }


    return (
        <div className='vertical-center'>
            {props.slotList && slotListToRows(props.slotList, props.order)}
        </div>
    )
}

FixedSlotList.propTypes = {
    cardPerRow: PropTypes.number,
    maxSlot: PropTypes.number,
    isFixed: PropTypes.bool
}


export default FixedSlotList