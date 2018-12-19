import React from 'react'
import PropTypes from 'prop-types';
// semantic
import { Grid } from 'semantic-ui-react-single/Grid'
// components
import BonusCard from '../../Cards/BonusCard'
// mix
import slice from 'lodash/slice'
import shuffle from 'lodash/shuffle'
// router e redux
import { connect } from 'react-redux'

export const BonusList = (props) => {

    const bonusNumber = (props.maxbonusToShow) ? props.maxbonusToShow : 3;

    const bonusListToColumn = bonusList => {

        const listOfBonus = []

        for (const key in bonusList) {
            const element = bonusList[key]
            element['id'] = key
            listOfBonus.push(element)
        }

        // const column = slice(shuffle(listOfBonus), 0, props.maxNumber)
        return slice(shuffle(listOfBonus), 0, bonusNumber).map(bonus => <BonusCard bonus={bonus} key={bonus.id} />)
    }

    return (
        <Grid centered>
            <Grid.Row style={{ paddingBottom: '4rem' }} centered>
                {bonusListToColumn(props.bonusList)}
            </Grid.Row>
        </Grid>
    )
}

BonusList.propTypes = {
    maxNumber: PropTypes.number
}

const mapStateToProps = (state) => ({
    bonusList: state.bonusList,
    contextRef: state.contextRef

})

export default connect(mapStateToProps)(BonusList)