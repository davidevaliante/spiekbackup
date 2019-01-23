/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from 'react'
import Navbar from '../Header/Navbar'
import { updateBonusesInGuideNode } from '../../firebase/update'
import { getGuideById, getProducerByName } from '../../firebase/get'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { Loader } from 'semantic-ui-react-single/Loader'
import { getImageLinkFromName } from '../../utils/Utils'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import Parser from 'html-react-parser'
import info from '../../static/info.svg'
import guideBg from '../../static/img_bg_full_scale.jpg'
import AamsBanner from '../AamsBanner'
import { Button } from 'semantic-ui-react-single/Button'
import { Icon } from 'semantic-ui-react-single/Icon'
import { withRouter } from 'react-router-dom'



const LoadingDimmer = () =>
    <div>
        <Dimmer active>
            <Loader />
        </Dimmer>
    </div>

const InternalImage = ({ imageLink, bonusLink, click }) =>
    <figure class="snip1563">
        <img src={imageLink} alt="bonus internal" />
        <figcaption>
            <h3>Vai al bonus</h3>
            <p>Prova a vincere subito soldi veri !</p>
            <a content='bonus' onClick={() => click()} />
        </figcaption>
    </figure>

const ParsedContent = ({ content }) =>
    <div className='parsed-content'>
        {content}
    </div>

const Tips = ({ tipsList }) =>
    <div className='tip-container'>
        {tipsList.map(tip => <TipCard text={tip} />)}
    </div>

const TipCard = ({ text }) =>
    <div className='tip-card'>
        <img
            alt='info'
            className='tip-card-img'
            src={info} />
        <p className='tip-card-text'>{text}</p>
    </div>

const PageFlex = (props) =>
    <div className='bonus-guide-page-flex'>
        {props.children}
    </div>

const Banner = ({ linkImage }) =>
    <div className='bonus-guide-banner'>
        <img src={linkImage}></img>
    </div>

const GuideContent = (props) =>
    <div className='guide-content'>
        {props.children}
    </div>

const GuideLine = (props) =>
    <div className='guide-line' />

const ButtonBack = (props) =>
    <div className='button-back'>
        <Button inverted animated size='large' onClick={() => props.click()}>
            <Button.Content visible>Torna Indietro</Button.Content>
            <Button.Content hidden inverted>
                <Icon name='arrow left' />
            </Button.Content>
        </Button>
    </div>

const ButtonGoToBonus = (props) =>
    <div className='button-go-to-bonus'>
        <Button inverted animated size='large' onClick={() => props.click()}>
            <Button.Content visible>Vai al bonus</Button.Content>
            <Button.Content hidden inverted>
                <Icon name='arrow right' />
            </Button.Content>
        </Button>
    </div>



class BonusGuide extends Component {

    state = {
        isLoading: true
    }

    // test link http://localhost:3000/test/-LMvG58Dv7krCSUwetcd

    componentDidMount() {
        const bonusId = this.props.match.params.guideId
        if (bonusId) {
            getGuideById(bonusId, (guide) => {
                console.log(guide);

                const internalImageLink = getImageLinkFromName('bonusInternal', guide.bonus.name)
                const tipsList = guide.bonus.tips.split('@').slice(1)

                this.setState({
                    guide: guide,
                    bonus: guide.bonus,
                    isLoading: false,
                    internalImageLink: internalImageLink,
                    parsedContent: Parser(`${guide.content}`),
                    tipsList: tipsList
                })
            })
        }
    }


    goBack = () => {
        this.props.history.goBack()
    }

    goToBonus = () => {
        const { link } = this.state.bonus
        console.log(link)
        link && window.open(link)
    }


    render() {
        const { guide, bonus, producer, internalImageLink, tipsList, parsedContent, isLoading } = this.state
        console.log(guide);
        console.log(bonus);
        console.log(tipsList);


        return (
            <div style={{ backgroundImage: `url(${guideBg})` }} className='bonus-guide-background'>
                <Navbar />
                <PageFlex>
                    <ButtonBack click={this.goBack} />
                    <Banner linkImage='https://www.slotgallinaonline.it/wp-content/uploads/2013/09/StarCasino-Book-Ra-160x945.gif' />
                    <GuideContent>
                        {isLoading ? <LoadingDimmer /> :
                            <React.Fragment>
                                <InternalImage imageLink={internalImageLink} click={this.goToBonus} />
                                <AamsBanner small={true} />
                                <Tips tipsList={tipsList} />
                                <ParsedContent content={parsedContent} />
                            </React.Fragment>
                        }
                    </GuideContent>
                    <Banner linkImage='https://www.slotgallinaonline.it/wp-content/uploads/2014/06/slotgallinaonline_side_banner_a.jpg' />
                    <ButtonGoToBonus click={this.goToBonus} />
                </PageFlex>
            </div>
        )
    }



}

export default withRouter(BonusGuide)