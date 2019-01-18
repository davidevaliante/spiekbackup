import React, { Component } from 'react'
// semantic
import { Grid } from 'semantic-ui-react-single/Grid'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { Responsive } from 'semantic-ui-react-single/Responsive'
// components
import TipsList from './TipsList'
import TecnicalsList from './TecnicalsList'
import Description from './Description'
import PlayDimmer from './PlayDimmer'
import SlotPageBonusList from './SlotPageBonusList'
import Footer from "../Footer";
import YouTubeEmbed from './YouTubeEmbed'
import SlotPageHeader from '../Header/SlotPageHeader'
import Navbar from '../Header/Navbar'
// data
import { getSlotWithId } from '../../firebase/get'
// router e redux
import { slotIsLoading, slotIsLoaded, updateCurrentSlot } from '../../reducers/SlotPageReducer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// mix
import split from 'lodash/split'
import Helmet from 'react-helmet'
import { ROUTE } from "../../enums/Constants";


class SlotPage extends Component {

    state = {
        currentSlot: {},
        currentSlotId: ''
    }

    componentDidMount() {
        console.log('mounting')
        getSlotWithId(this.props.match.params.id, (slot) => {
            if (!slot) {
                this.props.history.push(ROUTE.ERROR404)
            }
            this.props.dispatch(slotIsLoaded())
            this.props.dispatch(updateCurrentSlot(slot))
            this.setState({
                currentSlot: slot,
                currentSlotId: this.props.match.params.id
            })
        })
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            console.log('firebase query');
            this.props.dispatch(slotIsLoading())
            getSlotWithId(this.props.match.params.id, (slot) => {
                this.props.dispatch(slotIsLoaded())
                this.props.dispatch(updateCurrentSlot(slot))

                this.setState({
                    currentSlot: slot,
                    currentSlotId: this.props.match.params.id
                })
            })
        }
        /* 
                if (prevState.currentSlot.linkYoutube) {
                    this.setState({ currentSlot: { ...this.state.currentSlot, linkYoutube: undefined } })
                } */
    }

    componentWillUnmount() {
        this.props.dispatch(slotIsLoading())
    }

    getYoutubeEmbedSource = () => {
        const id = split(this.state.currentSlot.linkYoutube, '=').pop()
        return `https://www.youtube.com/embed/${id}`
    }

    render() {
        const { currentSlot } = this.state
        const { isPlaying, isLoading } = this.props
        console.log(currentSlot.linkYoutube);

        return (
            <div>
                <Helmet>
                    <title>{currentSlot.name}</title>
                    <meta charSet="utf-8" />
                    <link rel="canonical" href="http://mysite.com/example" />
                    <meta property="og:locale" content='it' />
                    <meta property="article:tag" content="slot" />
                    <meta property="article:tag" content={`slot ${currentSlot.name}`} />
                    <meta property="article:published_time" content={currentSlot.time} />

                </Helmet>

                <Dimmer.Dimmable dimmed={isPlaying}>
                    {window.scrollTo(0, 0)}

                    <PlayDimmer url={currentSlot.linkPlay} bonusList={currentSlot.bonus} />

                    <div>

                        <Responsive maxWidth={600}>
                            <Navbar displaying={'SLOT'}
                                isResponsive={true} />
                        </Responsive>

                        <Responsive minWidth={600}>
                            <Navbar displaying={'SLOT'}
                                isResponsive={false} />
                        </Responsive>

                        <SlotPageHeader
                            style={{ position: 'absolute', zIndex: 1 }}
                            displaying='SLOT'
                            loading={isLoading}
                            currentSlot={currentSlot} />
                    </div>

                    <Description
                        slotName={currentSlot.name}
                        text={currentSlot.description} />

                    <Grid
                        celled='internally'
                        columns='equal'
                        stackable
                        style={{ paddingTop: '0rem', paddingBottom: '0rem' }}>
                        <Grid.Row
                            textAlign='center'
                            id='slot-page-lists'>
                            <TipsList tipList={currentSlot.tips} />
                            <TecnicalsList
                                tecList={currentSlot.tecnicals}
                                producerName={(currentSlot.producer && currentSlot.producer.name)} />
                        </Grid.Row>
                    </Grid>
                    <SlotPageBonusList
                        specialBonusList={currentSlot.bonusSpecial}
                        bonusList={currentSlot.bonus} />

                    {currentSlot.linkYoutube &&
                        <YouTubeEmbed
                            desc={currentSlot.linkYoutubeDescription}
                            src={this.getYoutubeEmbedSource()} />
                    }
                    <Footer />
                </Dimmer.Dimmable>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    isPlaying: state.isPlaying,
    isLoading: state.currentSlot.isLoading
})

export default withRouter(connect(mapStateToProps)(SlotPage))
