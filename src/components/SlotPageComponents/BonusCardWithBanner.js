import React, { Component } from 'react'
// semantic
import { Card } from 'semantic-ui-react-single/Card'
import { Image } from 'semantic-ui-react-single/Image'
// mix
import { getImageLinkFromName } from '../../utils/Utils'
import delay from 'lodash/delay'
import random from 'lodash/random'

class BonusCardWithBanner extends Component {

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

    render() {
        console.log(this.state);

        if (this.state.bonusList)
            delay(() => this.setState({ currentBonus: this.state.bonusList[this.pickRandom()] }), 30000)

        if (this.state.currentBonus) {
            return <Card color='red' onClick={(event) => this.handleClick()}>
                <Card.Content>
                    <Card.Meta></Card.Meta>
                    <Card.Header>
                        Gioca con soldi veri
                            </Card.Header>
                </Card.Content>

                <Card.Content extra>
                    <div className='vertical-center'>
                        <Image style={{ height: '5rem', objectFit: 'cover' }}
                            src={getImageLinkFromName('bonus', this.state.currentBonus.name)} />
                    </div>
                </Card.Content>

            </Card>
        } else return <div></div>
    }
}

export default BonusCardWithBanner