import React from 'react'
// components
import SlotPageSlotCard from '../Cards/BonusCard'
// semantic
import { Grid } from 'semantic-ui-react-single/Grid'
// mix

const SlotPageBonusList = (props) => {

    const bonusList = () => {
        const formattedList = []
        for (const key in props.bonusList) {
            const current = props.bonusList[key]
            formattedList.push(current)
        }
        return formattedList.map((bonus, index) =>
            <SlotPageSlotCard bonus={bonus} />
        )
    }

    return (
        <div id='slot-page-bonus' style={{ paddingTop: '8rem', marginBottom: '8rem', textAlign: 'center' }}>

            <div className='home-page-intro-container' style={{ width: '100%', marginBottom: '8rem' }}>
                <div className='home-page-intro-outer' style={{ width: '100%' }}>
                    <div className='home-page-intro-bg' style={{ width: '100%' }}>
                        <div className='home-page-intro' style={{ width: '100%' }}>
                            <h1>I migliori Bonus</h1>
                            <p>Passa dalla teoria alla pratica</p>
                            <p>Utilizza questi bonus ed inizia a vincere soldi veri su siti certificati e sicuri</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 0' }}>
                <Grid stackable columns={4} style={{ margin: '0' }}>
                    <Grid.Row centered>
                        {bonusList()}
                    </Grid.Row>
                </Grid>
            </div>

        </div>

    )
}

export default SlotPageBonusList;