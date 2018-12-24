import React, { Component } from 'react'
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
import { MobileView } from 'react-device-detect'
import ClosableBonusCard from './ClosableBonusCard'
class PlayDimmer extends Component {

    componentDidMount() {
        this.resizeListener()
    }

    componentWillUnmount() {
        window.removeEventListener("resize")
    }

    state = {
        isHorizontal: false
    }

    resizeListener() {
        window.addEventListener("resize", () => {
            const width = document.body.clientWidth
            const height = document.body.clientHeight
            const isHorizontal = height < width
            isHorizontal ? this.setState({ isHorizontal: true }) : this.setState({ isHorizontal: false })

        })
    }

    horizontalLayout = () =>
        <div>
            <Responsive minWidth={600}>
                <Dimmer
                    active={this.props.isPlaying}
                    onClickOutside={() => this.props.dispatch(setUserNotPlaying())}
                    page>
                    <Container>
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
                    <Embed
                        active
                        url={this.props.url} />
                    <Container style={{ paddingLeft: "35%", paddingTop: "1%" }} >
                        <RandomBonus bonus={this.props.bonusList} />
                    </Container>
                </Responsive>
                <Responsive maxWidth={600}>
                    <Container style={{ paddingTop: "10%" }} >
                        <Embed
                            active
                            url={this.props.url} />
                        <RandomBonus bonus={this.props.bonusList} />
                    </Container>
                </Responsive>

                {<MobileView style={{ marginTop: "5%" }}>
                    Ruota lo schermo del telefono per un esperienza di gioco migliore
            </MobileView>}
            </Container>
        </Dimmer>


    render() {
        console.log(this.state);
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