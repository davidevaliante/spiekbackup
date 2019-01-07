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

const SlotCard = (props) => {

    const formatTitle = (title) => truncate(capitalize(lowerCase(props.slot.name)), { length: 30, omission: '...' })
    const handleClick = () => (props.history.push(`${ROUTE.SLOTS}/${props.slot.id}`))

    return (
        <div className='slot-card-shadow-animation' onClick={() => handleClick()}>
            <Card key={props.slot.id}>
                {props.slot.type === 'GRATIS' && <h4 style={{ background: 'red', textAlign: "center", color: 'white', marginBottom: '0', padding: '1%' }}>Slot Online</h4>}
                {props.slot.type === 'BAR' && <h4 style={{ background: 'blue', textAlign: "center", color: 'white', marginBottom: '0', padding: '1%' }}>Slot da bar</h4>}
                {props.slot.type === 'VLT' && <h4>Slot VLT</h4>}
                <Image src={getImageLinkFromName('slot', props.slot.name, 'medium')} style={{ height: '14rem', objectFit: 'cover' }} />
                <Card.Content >
                    <Card.Header>{formatTitle(props.slot.name)}</Card.Header>
                    <Card.Meta >
                        <span className='date'>Aggiornato il {moment(props.slot.time).format("DD-MM-YYYY")}</span>
                    </Card.Meta>
                    <Card.Description>{truncate(removeHtmlFrom(props.slot.description), { 'length': 150 })}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='star' />
                    {props.slot.rating}
                </Card.Content>
            </Card>
        </div>
    );
}

export default withRouter(SlotCard);