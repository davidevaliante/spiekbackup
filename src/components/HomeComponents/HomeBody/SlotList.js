import React from 'react'
import PropTypes from 'prop-types'
// semantic
import { Visibility } from 'semantic-ui-react-single/Visibility'
// components
import SlotCard from '../../Cards/SlotCard';
// mix
import chunk from 'lodash/chunk'
import orderBy from 'lodash/orderBy'
import last from 'lodash/last'
// data
import { loadNextChunk } from '../../../firebase/get'
// router e redux
import { connect } from 'react-redux';


const SlotList = (props) => {

    // di base renderizza props.maxSlot elementi ma scrollando ne deve carica altre 
    const slotListToRows = (slotList, ordering) => {
        let listOfSlots = []
        for (const key in slotList) {
            const element = slotList[key]
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
                {(index === rows.length - 2 &&
                    props.type !== 'VLT' &&
                    props.type !== 'BAR' &&
                    props.type !== 'GRATIS')
                    && <Visibility once={false} onTopVisible={() => loadMoreSlots(listOfSlots)} />}
                {row.map((element) =>
                    (element && <SlotCard slot={element} key={element.id} />))
                }
            </div>
        ))
    }



    const loadMoreSlots = (listOfSlots) => {
        loadNextChunk(12, last(listOfSlots).time)
    }

    return (
        <div className='vertical-center'>
            {props.type === 'GRATIS' && slotListToRows}
            {props.slotList && slotListToRows(props.slotList, props.order)}
        </div>
    )
}

SlotList.propTypes = {
    cardPerRow: PropTypes.number,
    maxSlot: PropTypes.number,
    isFixed: PropTypes.bool
}

const mapStateToProps = (state) => ({
    slotList: state.slotList,
    displaying: state.displaying
})

export default connect(mapStateToProps)(SlotList)