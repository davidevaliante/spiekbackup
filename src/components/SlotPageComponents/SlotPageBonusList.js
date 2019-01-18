import React from 'react'
// components
import SlotPageBonusCard from '../Cards/BonusCard'
// semantic
import { Grid } from 'semantic-ui-react-single/Grid'
import FullBonusCard from "../Cards/FullBonusCard";
// mix

const SlotPageBonusList = (props) => {

    const specialBonus = () => {
        const formattedList = []
        for (const key in props.specialBonusList) {
            const current = props.specialBonusList[key]
            formattedList.push(current)

        }
        return formattedList.map((bonus, index) => <FullBonusCard bonus={bonus} />)
    }

    const bonusList = () => {
        const formattedList = []
        for (const key in props.bonusList) {
            const current = props.bonusList[key]
            formattedList.push(current)

        }
        return formattedList.map((bonus, index) =>
            <SlotPageBonusCard
                imgContainerHeight={'40%'}
                bonus={bonus} />
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
                {props.specialBonusList &&
                    <Grid stackable columns={4} style={{ margin: '0' }}>
                        <Grid.Row centered>
                           { specialBonus()}
                        </Grid.Row>
                    </Grid>
                }
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