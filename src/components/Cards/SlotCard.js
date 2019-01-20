import React from 'react'
// semantic
import { Icon } from 'semantic-ui-react-single/Icon'
import { Image } from 'semantic-ui-react-single/Image'
import { Card } from 'semantic-ui-react-single/Card'
// data
import { removeHtmlFrom } from '../../utils/Utils'
import { getImageLinkFromName } from '../../utils/Utils'
// mix
import truncate from 'lodash/truncate'
import lowerCase from 'lodash/lowerCase'
import capitalize from 'lodash/capitalize'
import moment from 'moment'
import { ROUTE } from '../../enums/Constants';
// router e redux
import { withRouter } from 'react-router'
import BonusCard from "./BonusCard";
import { Button } from 'semantic-ui-react-single/Button'

const SlotCard = (props) => {

    const formatTitle = (title) => truncate(capitalize(lowerCase(props.slot.name)), { length: 30, omission: '...' })
    const handleClick = () => {
        console.log('pushing new props')
        props.history.push(`${ROUTE.SLOTS}/${props.slot.id}`)
    }

    const goToFavBonus = () => {
        const { specialBonusLink, bonus } = props.slot
        if (specialBonusLink) {
            console.log(`going to ${specialBonusLink}`)
            props.history.push(`${specialBonusLink}`)
        }
        //  else {
        //     let bonusList = []
        //     for (const key in bonus) {
        //         bonusList.push(bonus[key])
        //     }
        //     console.log(bonusList)
        //     const randomLinkToOpen = bonusList[Math.floor(Math.random() * bonusList.length)]
        //     console.log(`going to ${randomLinkToOpen}`)
        //     props.history.push(`${randomLinkToOpen}`)
        // }
    }

    const PopularSlotCard = () =>
        <div className='slot-card-shadow-animation' onClick={() => handleClick()}>
            <Card key={props.slot.id}>
                {props.slot.type === 'GRATIS' && <h4 style={{ background: 'red', textAlign: "center", color: 'white', marginBottom: '0', padding: '1%' }}>Slot Online</h4>}
                {props.slot.type === 'BAR' && <h4 style={{ background: 'blue', textAlign: "center", color: 'white', marginBottom: '0', padding: '1%' }}>Slot da bar</h4>}
                {props.slot.type === 'VLT' && <h4 style={{ background: '#ffa90a', textAlign: "center", color: 'white', marginBottom: '0', padding: '1%' }}>Slot VLT</h4>}
                <Image src={getImageLinkFromName('slot', props.slot.name, 'medium')} style={{ height: '165px', objectFit: 'cover' }} />
                <Card.Content >
                    <Card.Header>{formatTitle(props.slot.name)}</Card.Header>
                    <Card.Meta >
                        <span className='date'>Aggiornato il {moment(props.slot.time).format("DD-MM-YYYY")}</span>
                    </Card.Meta>
                    <Card.Description>{truncate(removeHtmlFrom(props.slot.description), { 'length': 150 })}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    Voto {props.slot.rating}
                </Card.Content>
            </Card>
        </div>

    const NormalSlotCard = () =>
        <div className='slot-card-shadow-animation' onClick={() => handleClick()}>
            <Card key={props.slot.id}>
                {props.slot.type === 'GRATIS' && <h4 style={{ background: 'red', textAlign: "center", color: 'white', marginBottom: '0', padding: '1%' }}>Slot Online</h4>}
                {props.slot.type === 'BAR' && <h4 style={{ background: 'blue', textAlign: "center", color: 'white', marginBottom: '0', padding: '1%' }}>Slot da bar</h4>}
                {props.slot.type === 'VLT' && <h4 style={{ background: '#ffa90a', textAlign: "center", color: 'white', marginBottom: '0', padding: '1%' }}>Slot VLT</h4>}
                <Image src={getImageLinkFromName('slot', props.slot.name, 'medium')} style={{ height: '165px', objectFit: 'cover' }} />
                <Card.Content >
                    <Card.Header>{formatTitle(props.slot.name)}</Card.Header>
                    <Card.Meta >
                        <span className='date'>Aggiornato il {moment(props.slot.time).format("DD-MM-YYYY")}</span>
                    </Card.Meta>
                    <div className='buttons-container'>
                        <Button
                            style={{ width: '50%' }}
                            color='red'
                            onClick={() => handleClick()}
                            content='Leggi' />
                        <Button
                            style={{ width: '50%' }}
                            color='green'
                            onClick={() => goToFavBonus()}
                            content='Bonus' />
                    </div>
                </Card.Content>
                <Card.Content extra>
                    Voto {props.slot.rating}
                </Card.Content>
            </Card>
        </div>

    return (
        props.popularSlotLayout ? <PopularSlotCard /> : <NormalSlotCard />
    );
}

export default withRouter(SlotCard);