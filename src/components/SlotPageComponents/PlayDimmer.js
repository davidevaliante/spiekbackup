import React from 'react'
// semantic
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
// components
import RandomBonus from './RandomBonus'
// router e redux
import { connect } from 'react-redux'
import { setUserNotPlaying } from '../../reducers/PlayModeReducer'
import { Embed } from 'semantic-ui-react-single/Embed'
import { Container } from 'semantic-ui-react-single/Container'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import {MobileView} from 'react-device-detect'

const PlayDimmer = (props) => {

    return (
        <Dimmer
            active={props.isPlaying}
            onClickOutside={() => props.dispatch(setUserNotPlaying())}
            page>
            <Container>

               
                
                <Embed
                    active
                    url={props.url} />
                <Responsive minWidth={600}>
                    <Container style={{ paddingLeft: "35%", paddingTop: "1%" }} >
                        <RandomBonus bonus={props.bonusList} />
                    </Container>
                </Responsive>
                <Responsive maxWidth={600}>
                    <Container style={{ paddingTop: "10%" }} >
                        <RandomBonus bonus={props.bonusList} />
                    </Container>
                </Responsive>

                {<MobileView style={{marginTop:"5%"}}>
                        Ruota lo schermo del telefono per un esperienza di gioco migliore
                </MobileView>}
            </Container>
        </Dimmer>

    )
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    isPlaying: state.isPlaying
})

export default connect(mapStateToProps)(PlayDimmer)