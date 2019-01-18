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
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";


const RelatedSlotList = (props) => {

    // di base renderizza props.maxSlot elementi ma scrollando ne deve carica altre
    const slotListToRows = () => {
        let listOfSlots = []
        for (const key in props.slotList) {
            const element = props.slotList[key]
            element['id'] = key
            listOfSlots.push(element)
        }


        return listOfSlots.map(element => <SlotCard slot={element} key={element.id} />)

    }



    return (
        <div style={{ padding: '0 0' , marginBottom:'7%'}}>
            <div style={{marginBottom : '7%'}}>
                <div id='slot-page-bonus' style={{ paddingTop: '8rem', marginBottom: '8rem', textAlign: 'center' }}>
                    <div className='home-page-intro-container' style={{ width: '100%', marginBottom: '8rem' }}>
                        <div className='home-page-intro-outer' style={{ width: '100%' }}>
                            <div className='home-page-intro-bg' style={{ width: '100%' }}>
                                <div className='home-page-intro' style={{ width: '100%' }}>
                                    <h1>Slot Simili</h1>
                                    <p>Queste slot sono simili a quella che stai provando, dacci un' occhiata</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Grid stackable columns={4} style={{ margin: '0' }}>
                <Grid.Row centered>
                    {slotListToRows()}
                </Grid.Row>
            </Grid>
        </div>
    )
}
export default RelatedSlotList