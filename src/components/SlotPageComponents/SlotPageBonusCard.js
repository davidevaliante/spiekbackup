import React from 'react'
// semantic
import { Image } from 'semantic-ui-react-single/Image'
import { Card } from 'semantic-ui-react-single/Card'
// mix
import { getImageLinkFromName } from '../../utils/Utils'

const SlotPageBonusCard = (props) => {

    const handleClick = () => {
        window.open(props.bonus.link)
    }

    const { bonus, rating, name } = props.bonus
    return (
        <div>
            <Card color='red' onClick={(event) => handleClick()}>
                <Card.Content>
                    <Card.Header style={{ marginBottom: '0.8rem' }}> 
                        <Image 
                            src={getImageLinkFromName('bonus', name, 'medium')} 
                            size='small' 
                            circular />
                    </Card.Header>
                    <Card.Meta style={{ marginBottom: '0.8rem' }}>Voto {rating}</Card.Meta>
                    <Card.Description>{bonus}</Card.Description>
                </Card.Content>
            </Card>

        </div>
    )
}

export default SlotPageBonusCard;