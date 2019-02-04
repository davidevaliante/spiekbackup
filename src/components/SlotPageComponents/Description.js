import React, { Component } from 'react';
// semantic
import { Segment } from 'semantic-ui-react-single/Segment'
import { Container } from 'semantic-ui-react-single/Container'
import { Header } from 'semantic-ui-react-single/Header'
import { Button } from 'semantic-ui-react-single/Button'
import { Icon } from 'semantic-ui-react-single/Icon'
import { removeHtmlFrom } from '../../utils/Utils'

// router e redux
import { connect } from 'react-redux'
import { setUserPlaying } from '../../reducers/PlayModeReducer'
// mix
import Parser from 'html-react-parser'
import truncate from 'lodash/truncate'

class Description extends Component {

    state = {
        textShouldCollapse: false,
        textIsCollpased: false,
        showUncollapseButton: false
    }



    render() {
        let content = Parser(`${this.props.text}`)


        return (
            <Segment style={{ padding: '3em 0em', borderBottom: '0px' }} vertical id='slot-page-description' >
                <Container text>

                    <Header as='h3' style={{ fontSize: '2em', fontFamily: 'Raleway' }}>
                        {this.props.slotName}
                    </Header>

                    <div className='slot-page-parsed-content'>
                        {content}
                    </div>


                    {!this.props.hidePlayButton &&
                        <div className='slot-playbutton'>
                            <Button animated color='red' size='huge' onClick={() => this.props.dispatch(setUserPlaying())}>
                                <Button.Content visible>Provala Subito !</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='gamepad' size='large' />
                                </Button.Content>
                            </Button>
                        </div>
                    }
                </Container>
            </Segment>
        )
    }

}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch
})

export default connect(mapStateToProps)(Description);