import React, { Component } from 'react'
// semantic
import { Container } from 'semantic-ui-react-single/Container'
import { Button } from 'semantic-ui-react-single/Button'
import { Icon } from 'semantic-ui-react-single/Icon'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { Loader } from 'semantic-ui-react-single/Loader'
import { Visibility } from 'semantic-ui-react-single/Visibility'
// components
import Navbar from '../Header/Navbar'
import Footer from '../Footer'
// data
import { getGuideById, getBonusWithId } from '../../firebase/get'
// mix
import Parser from 'html-react-parser'
import truncate from 'lodash/truncate'
// router e redux
import { withRouter } from 'react-router-dom'
import { getImageLinkFromName } from "../../utils/Utils";
import { Image } from 'semantic-ui-react-single/Image'
import axios from 'axios'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { RESPONSIVE_RESOLUTION } from "../../enums/Constants"
import { ButtonGroup } from 'semantic-ui-react';


class Article extends Component {

    state = {
        isLoading: true,
        hasInternalImage: true
    }

    componentDidMount() {


        if (this.props.match.params.id) {
            getGuideById(this.props.match.params.id, data => {
                this.setState({
                    isLoading: false,
                    content: data,
                    parsedContent: Parser(`${data.content}`),
                    bonus: data.bonus
                })

            })


        }

    }

    showBottomButtons = () => this.setState({ showBottomButtons: true })
    hideBottomButtons = () => this.setState({ showBottomButtons: false })

    BottomButtonGroup = () => {
        return (
            <div></div>
        )
    }

    goBack = () => {
        this.props.history.goBack()
    }

    goToBonus = () => {
        const { link } = this.state.bonus
        console.log(link)
        link && window.open(link)
    }

    imageArticle = () => {
        console.log(this.state)
        if (this.state.bonus) return getImageLinkFromName('bonusInternal', this.state.bonus.name)
        else return getImageLinkFromName('article', this.state.content.title)

    }

    handleInternalImageError = () => {
        this.setState({ hasInternalImage: false })
    }

    buttonAnimation = () => {

        const x = truncate(this.state.bonus.name, {
            'length': 15,
        })
        console.log(x);
        return x

    }

    getScarlett(event) {
        event.target.src = 'https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/soluzione_pro?alt=media&token=26ccfc9c-8a47-4a31-b341-b4e12c0db166'
    }


    render() {
        const { content, showBottomButtons, parsedContent, isLoading } = this.state
        console.log(this.state);



        if (isLoading) return (
            <div className='extra-bg'>
                {window.scrollTo(0, 0)}
                <Navbar fixColor={true} />
                <Dimmer active>
                    <Loader />
                </Dimmer>
                <Visibility
                    once={false}
                    onBottomVisible={this.showBottomButtons}
                    onBottomVisibleReverse={this.hideBottomButtons}>
                </Visibility>
            </div>
        )

        else return (
            <div className='extra-bg'>
                {window.scrollTo(0, 0)}
                <Navbar fixColor={true} />
                <Visibility
                    once={false}
                    offset={500}
                    onBottomVisible={this.showBottomButtons}
                    onBottomVisibleReverse={this.hideBottomButtons}>
                    <div className='extra-button-left'>
                        <Responsive as={Button} minWidth={1037} onClick={() => this.goBack()} size='large' animated inverted>
                            <Button.Content visible>Torna Indietro</Button.Content>
                            <Button.Content hidden inverted>
                                <Icon name='arrow left' />
                            </Button.Content>
                        </Responsive>
                    </div>

                    {this.state.bonus &&
                        <div className='extra-button-right'>
                            <Responsive as={Button} minWidth={1037} onClick={() => this.goToBonus()} size='large' animated inverted>
                                <Button.Content visible>Vai al bonus</Button.Content>
                                <Button.Content hidden inverted>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Responsive>
                        </div>
                    }
                </Visibility>

                <div className='extra-content'>
                    <Container text className='extra'>

                        <Image src={this.imageArticle()} onError={this.getScarlett} />

                        {parsedContent}

                        <Container className="marginTop">
                            <ButtonGroup widths="5">

                                <Responsive 
                                    as={Button} 
                                    maxWidth={1037} 
                                    onClick={() => this.goBack()} 
                                    size='large' 
                                    animated 
                                    className="extra-button-left-bottom"  >
                                    <Button.Content visible>Torna Indietro</Button.Content>
                                    <Button.Content hidden inverted>
                                        <Icon name='arrow left' />
                                    </Button.Content>
                                </Responsive>

                                {this.state.bonus &&
                                    <Responsive 
                                        as={Button} 
                                        maxWidth={1037} 
                                        nClick={() => this.goToBonus()} 
                                        size='large' 
                                        animated 
                                        className=".extra-button-right-bottom"  >
                                        <Button.Content visible>Vai al bonus</Button.Content>
                                        <Button.Content hidden inverted>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Responsive>

                                }
                            </ButtonGroup>
                        </Container>
                    </Container>

                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(Article)
