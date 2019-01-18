import React, { Component } from 'react'
// semantic
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
// components
import RandomBonus from './RandomBonus'
import BonusCardWithBanner from './BonusCardWithBanner'
// router e redux
import { connect } from 'react-redux'
import { setUserNotPlaying } from '../../reducers/PlayModeReducer'
import { Embed } from 'semantic-ui-react-single/Embed'
import { Container } from 'semantic-ui-react-single/Container'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { MobileView } from 'react-device-detect'
import ClosableBonusCard from './ClosableBonusCard'

class PlayDimmer extends Component {

    componentDidMount() {
        this.addResizeListener()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeListener)
    }

    state = {
        isHorizontal: false
    }

    addResizeListener() {
        window.addEventListener("resize", this.resizeListener)
    }

    resizeListener = () => {
        const width = document.body.clientWidth
        const height = document.body.clientHeight
        const isHorizontal = height < width
        isHorizontal ? this.setState({ isHorizontal: true }) : this.setState({ isHorizontal: false })
    }

    horizontalLayout = () =>
        <div>
            <Responsive minWidth={600}>
                <Dimmer
                    active={this.props.isPlaying}
                    onClickOutside={() => this.props.dispatch(setUserNotPlaying())}
                    page>
                    <Container>
                        <div style={{ background: 'black', width: '100%', height: '100%' }} onClick={() => this.props.dispatch(setUserNotPlaying())}>
                            <Embed
                                iframe={{
                                    style: {
                                        paddingBottom: 30,
                                        backgroundColor: "#000000",
                                    },
                                }}
                                active
                                url={this.props.url} />
                            <ClosableBonusCard
                                bonus={this.props.bonusList} />
                        </div>
                    </Container>
                </Dimmer>
            </Responsive>
        </div>


    verticalLayout = () =>
        <Dimmer
            active={this.props.isPlaying}
            onClickOutside={() => this.props.dispatch(setUserNotPlaying())}
            page>

            <Container>
                <Responsive minWidth={600}>
                    <div className='centered-play-embed'>
                        <Embed
                            active
                            url={this.props.url} />
                    </div>


                    <div className='floating-top-right'>
                        <div className='left-sidebar'>
                            <BonusCardWithBanner bonus={this.props.bonusList} />
                        </div>
                    </div>

                </Responsive>

                <Responsive maxWidth={600}>
                    <Container style={{ paddingTop: "10%" }} >
                        <Embed
                            active
                            url={this.props.url} />
                        <RandomBonus bonus={this.props.bonusList} />
                    </Container>
                </Responsive>

                <MobileView style={{ marginTop: "5%" }}>
                    Ruota lo schermo del telefono per un' esperienza di gioco migliore
                </MobileView>
            </Container>
        </Dimmer>


    render() {

        const browserIsHorizontal = this.state.isHorizontal

        return (
            browserIsHorizontal ? this.horizontalLayout() : this.verticalLayout()
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    isPlaying: state.isPlaying
})

export default connect(mapStateToProps)(PlayDimmer)