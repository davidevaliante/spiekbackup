import React, { Component } from 'react'
// semantic
import { Card } from 'semantic-ui-react-single/Card'
import { Image } from 'semantic-ui-react-single/Image'
// mix
import { getImageLinkFromName } from '../../utils/Utils'
import delay from 'lodash/delay'
import random from 'lodash/random'

class ClosableBonusCard extends Component {

    state = {}

    componentDidMount() {
        const bonusList = this.props.bonus
        let placeholder = []
        for (const key in bonusList) {
            const current = bonusList[key]
            placeholder.push(current)
        }
        this.setState({ bonusList: placeholder, currentBonus: placeholder[0] })

    }

    handleClick = () => {
        window.open(this.state.currentBonus.link)
    }

    pickRandom = () => {
        const lowerBound = 0
        const upperBound = this.state.bonusList.length - 1
        return random(lowerBound, upperBound)
    }

    closableBonus = () =>
        <div
            style={{ position: 'absolute', zIndex: 10, top: 0, left: 0 }}>
            <Image
                onClick={(event) => this.handleClick()}
                style={{ height: '5rem', objectFit: 'cover' }}
                src={getImageLinkFromName('bonus', this.state.currentBonus.name)} />
        </div>

    render() {
        console.log(this.state);

        if (this.state.bonusList)
            delay(() => this.setState({ currentBonus: this.state.bonusList[this.pickRandom()] }), 30000)

        if (this.state.currentBonus) {
            return this.closableBonus()
        } else return <div></div>
    }
}

export default ClosableBonusCard