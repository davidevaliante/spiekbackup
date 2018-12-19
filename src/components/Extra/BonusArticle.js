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
import { getGuideById } from '../../firebase/get'
// mix
import Parser from 'html-react-parser'
import truncate from 'lodash/truncate'
// router e redux
import { withRouter } from 'react-router-dom'

class BonusArticle extends Component {

    state = {
        isLoading: true
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            getGuideById(this.props.match.params.id, data => {
                console.log(data.content);

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

    buttonAnimation = () => {

        const x = truncate(this.state.bonus.name, {
            'length': 15,
        })
        console.log(x);
        return x

    }


    render() {
        const { content, showBottomButtons, parsedContent, isLoading } = this.state
        const { bonus } = this.state

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
                        <Button onClick={() => this.goBack()} size='large' animated inverted>
                            <Button.Content visible>Torna Indietro</Button.Content>
                            <Button.Content hidden inverted>
                                <Icon name='arrow left' />
                            </Button.Content>
                        </Button>
                    </div>
                </Visibility>
                <div className='extra-button-right'>
                    <Button onClick={() => this.goToBonus()} size='large' animated='fade' inverted>
                        <Button.Content visible>Provalo Subito</Button.Content>
                        <Button.Content hidden>{bonus && this.buttonAnimation()}</Button.Content>
                    </Button>
                </div>
                <div className='extra-content'>
                    <Container text className='extra'>
                        {parsedContent}
                    </Container>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(BonusArticle)

