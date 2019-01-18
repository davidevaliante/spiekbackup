import React from 'react'
import PropTypes from 'prop-types'
// semantic
import { Visibility } from 'semantic-ui-react-single/Visibility'
// components
import SlotCard from './../Cards/SlotCard';
// mix
import chunk from 'lodash/chunk'
import orderBy from 'lodash/orderBy'
import last from 'lodash/last'
// data
import { loadNextChunk } from './../../firebase/get'
// router e redux
import { connect } from 'react-redux';


const RelatedSlotList = (props) => {

    // di base renderizza props.maxSlot elementi ma scrollando ne deve carica altre
    const slotListToRows = (slotList) => {
        let listOfSlots = []
        for (const key in slotList) {
            const element = slotList[key]
            element['id'] = key
            listOfSlots.push(element)
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
            {props.type === 'GRATIS' && slotListToRows}
            {props.slotList && slotListToRows(props.slotList)}
        </div>
    )
}
export default RelatedSlotList