import React from 'react'
// semantic
import { Button } from 'semantic-ui-react-single/Button'
import { Icon } from 'semantic-ui-react-single/Icon'
import { List } from 'semantic-ui-react-single/List'
import { Responsive } from 'semantic-ui-react-single/Responsive'
// router e redux
import { connect } from 'react-redux'
import { setUserPlaying } from '../../reducers/PlayModeReducer'
import { RESPONSIVE_RESOLUTION } from '../../enums/Constants'
import { withRouter } from 'react-router-dom'


const ShortHandMenu = (props) => {

    const smoothScrollTo = (elementId) => {
        document.getElementById(elementId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    const buttonsStyle = {
        width: '165px',
        height: '40px',
        margin: '0 1.6rem'
    }

    const playButtonMethod = () => {
        const link = props.currentSlot.linkPlay
        if (link.includes('spike')) {
            const l = link.split('slot/')[1]
            props.history.push(`/slot/${l}`)
        } else {
            props.dispatch(setUserPlaying())
        }
    }

    const goToOnLineVersion = (onlineVersionObject) => {
        const id =  Object.keys(onlineVersionObject).length !== 0 && Object.keys(onlineVersionObject)[0]
        props.history.push(`/slot/${id}`)
    }

    const PlayButton = () => {
        if(props.currentSlot.onlineVersion !== undefined) {
            return <Button style={{width: '45%'}}
                           animated
                           size='huge'
                           color='white'
                           onClick={() => goToOnLineVersion(props.currentSlot.onlineVersion)}>
                <Button.Content visible>Vai alla versione online</Button.Content>
                <Button.Content hidden>
                    <Icon name='gamepad'/>
                </Button.Content>
            </Button>
        } else {

            return <Button style={{ width: '45%' }}
                    animated
                    size='huge'
                    color='white'
                    onClick={() => playButtonMethod()}>
                <Button.Content visible>{(props.currentSlot !== undefined && props.currentSlot.type === 'GRATIS') ? 'Provala Subito' : 'Vai alla versione online'}</Button.Content>
                <Button.Content hidden>
                    <Icon name='gamepad' />
                </Button.Content>
            </Button>
        }
    }

    return (
        <div className='shorthand-container-style'>
            <Responsive maxWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                <div className='small-buttons-container'>
                    <List style={{ margin: '0 auto' }}>
                        <List.Item>
                            <Button
                                id='descShortHand'
                                style={buttonsStyle}
                                inverted
                                color='red'
                                onClick={() => {
                                    smoothScrollTo('slot-page-description')
                                    document.getElementById('descShortHand').blur()
                                }}>
                                Descrizione
                            </Button>
                        </List.Item>

                        <List.Item>
                            <Button
                                id='tipsShortHand'
                                style={buttonsStyle}
                                inverted
                                color='red'
                                active={false}
                                onClick={() => {
                                    smoothScrollTo('slot-page-lists')
                                    document.getElementById('tipsShortHand').blur()

                                }}>
                                Consigli di gioco
                            </Button>
                        </List.Item>
                        <List.Item>
                            <Button
                                id='techShortHand'
                                style={buttonsStyle}
                                inverted
                                color={'red'}
                                active={false}
                                onClick={() => {
                                    smoothScrollTo('slot-page-lists')
                                    document.getElementById('techShortHand').blur()
                                }}>
                                Scheda tecnica
                            </Button>
                        </List.Item>
                    </List>
                </div>
            </Responsive>

            <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                <div className='small-buttons-container'>
                    <Button
                        id='descShortHand'
                        style={buttonsStyle}
                        color='red'
                        inverted
                        onClick={() => {
                            smoothScrollTo('slot-page-description')
                            document.getElementById('descShortHand').blur()
                        }}>
                        Descrizione
                    </Button>
                    <Button
                        id='tipsShortHand'
                        style={buttonsStyle}
                        inverted
                        color='red'
                        active={false}
                        onClick={() => {
                            smoothScrollTo('slot-page-lists')
                            document.getElementById('tipsShortHand').blur()

                        }}>
                        Consigli di gioco
                    </Button>
                    <Button
                        id='techShortHand'
                        style={buttonsStyle}
                        inverted
                        color={'red'}
                        active={false}
                        onClick={() => {
                            smoothScrollTo('slot-page-lists')
                            document.getElementById('techShortHand').blur()
                        }}>
                        Scheda tecnica
                    </Button>
                </div>
            </Responsive>

            <div className='big-buttons-container'>
                {props.currentSlot && PlayButton()}

                <Button
                    id='bonusShortHand'
                    style={{ width: '45%' }}
                    size='huge'
                    color='red'
                    active={false}
                    onClick={() => {
                        smoothScrollTo('slot-page-bonus')
                        document.getElementById('bonusShortHand').blur()
                    }}>
                    Bonus Offerti
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    currentSlot: state.currentSlot.currentSlot
})

export default withRouter(connect(mapStateToProps)(ShortHandMenu))