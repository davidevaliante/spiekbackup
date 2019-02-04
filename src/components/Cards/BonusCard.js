import React from 'react'
// semantic
import { Card } from 'semantic-ui-react-single/Card'
import { Image } from 'semantic-ui-react-single/Image'
import { Button } from 'semantic-ui-react-single/Button'
// data
import { getImageLinkFromName } from '../../utils/Utils'
// mix
import lowerCase from 'lodash/lowerCase'
// router e redux
import { withRouter } from 'react-router-dom'

const BonusCard = (props) => {

    const goToExternalLink = () => {
        window.open(props.bonus.link)
    }

    const goToGuide = () => {
        props.history.push(`/article/${props.bonus.guideId}`)
    }

    return (

        <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
            <div className="flipper">
                <div className="front">
                    <Card color='red'>
                        <Card.Content>
                            <Card.Header>
                                <div className='vertical-center'>
                                    <Image style={{ height: '4.3rem', objectFit: 'cover' }} src={getImageLinkFromName('bonus', props.bonus && props.bonus.name)} />
                                </div>
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>

                            <Card.Content >
                                <div className={'align-text-bonus-card'} style={{ height: '35px', textAlign: 'center' }}>{props.bonus && props.bonus.bonus}</div>
                            </Card.Content>
                        </Card.Content>

                    </Card>
                </div>

                <div className="back">
                    <Card style={{ background: '#454545', height: '88%' }}>
                        <Card.Content>
                            <div className='bonus-back-buttons-container'>
                                <Button onClick={(event) => goToExternalLink()} fluid color='red'>Provalo subito</Button>
                                {props.bonus && props.bonus.guideId &&
                                    <Button onClick={(event) => goToGuide()} fluid color='green'>Leggi la guida</Button>
                                }
                            </div>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default withRouter(BonusCard);