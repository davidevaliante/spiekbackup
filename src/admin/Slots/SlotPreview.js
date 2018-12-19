import React, { Component } from 'react'
// semantic
import { Grid } from 'semantic-ui-react-single/Grid'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { Responsive } from 'semantic-ui-react-single/Responsive'
// components
import TipsList from '../../components/SlotPageComponents/TipsList'
import TecnicalsList from '../../components/SlotPageComponents/TecnicalsList'
import Description from '../../components/SlotPageComponents/Description'
import PlayDimmer from '../../components/SlotPageComponents/PlayDimmer'
import SlotPageBonusList from '../../components/SlotPageComponents/SlotPageBonusList'
import Footer from "../../components/Footer";
import YouTubeEmbed from '../../components/SlotPageComponents/YouTubeEmbed'
import SlotPageHeader from '../../components/SlotPageComponents/../Header/SlotPageHeader'
import Navbar from '../../components/SlotPageComponents/../Header/Navbar'
// data
import { getSlotWithId } from '../../firebase/get'
// router e redux
import { slotIsLoading, slotIsLoaded } from '../../reducers/SlotPageReducer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// mix
import split from 'lodash/split'
import Helmet from 'react-helmet'
import { ROUTE } from "../../enums/Constants";


class SlotPreview extends Component {

    state = {
        currentSlot: {},
        currentSlotId: ''
    }

    componentDidMount() {
        this.setState({
            currentSlot: this.props.slotPreview,
        })
    }

    getYoutubeEmbedSource = () => {
        const id = split(this.state.currentSlot.linkYoutube, '=').pop()
        return `https://www.youtube.com/embed/${id}`
    }

    render() {
        const { currentSlot } = this.state
        const { isPlaying, isLoading } = this.props
        return (
            <div>
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
                    <SlotPageBonusList bonusList={currentSlot.bonus} />

                    {currentSlot.linkYoutube &&
                        <YouTubeEmbed src={this.getYoutubeEmbedSource()} />
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
    isLoading: state.currentSlot.isLoading,
    slotPreview: state.slotPreview
})

export default connect(mapStateToProps)(SlotPreview)