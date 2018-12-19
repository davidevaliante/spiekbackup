import React, {Component} from 'react'
// components
import SlotCard from '../../Cards/SlotCard'
// mix
import chunk from 'lodash/chunk'
// router e redux
import {connect} from 'react-redux'
// semantic
import {Grid} from 'semantic-ui-react-single/Grid'

class PopularSlotList extends Component {
    state = {}

    slotListToRows = (slotList) => {
        let listOfSlots = []
        for (const key in slotList) {
            const element = slotList[key]
            listOfSlots.push(element)
        }

        const rows = chunk(listOfSlots, 4)

        return rows.map((row, index) => (
            <div className='horizontal-center' key={`slot_row_${index}`}>
                {row.map((element) =>
                    (element && <SlotCard slot={element} key={element.id} />))
                }
            </div>

        ))
    }

    slotListToCard = (slotList) => {
        let listOfSlots = []
        for (const key in slotList) {
            const element = slotList[key]
            listOfSlots.push(element)
        }

        return listOfSlots.map((element) => {
            return <SlotCard slot={element} key={element.id} />
        })
    }

    render() {
        console.log("POPULAR", this.props.popularSlots)

        return (
            <div>
                <div className='vertical-center' style={{ marginTop: '4rem' }}>
                    <h3 className='popular-slot-header'>Le slot più popolari</h3>
                    {/*this.props.popularSlots ? this.slotListToRows(this.props.popularSlots) : <div></div>*/}
                </div>
                <Grid style={{ marginTop: '0rem' }} celled='internally' stackable className='row-centered-spaced'>
                    <Grid.Row style={{ paddingBottom: '4rem' }} centered>
                        {this.props.popularSlots ? this.slotListToCard(this.props.popularSlots) : ''}
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

const mapStatetoProps = (state) => ({
    dispatch: state.dispatch,
    popularSlots: state.popularSlots
})

export default connect(mapStatetoProps)(PopularSlotList)