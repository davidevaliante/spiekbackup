import { Container } from 'semantic-ui-react-single/Container'
import { Grid } from 'semantic-ui-react-single/Grid'
import { Header } from 'semantic-ui-react-single/Header'
import { Image } from 'semantic-ui-react-single/Image'
import { List } from 'semantic-ui-react-single/List'
import { Segment } from 'semantic-ui-react-single/Segment'
import { Icon } from 'semantic-ui-react-single/Icon'
import { withRouter } from 'react-router'
import React from "react";
import { ROUTE } from "../enums/Constants";
import { connect } from 'react-redux'
import { PAGES } from '../enums/Constants'
const Footer = (props) => {

    const goToAboutPage = () => {
        props.history.push(ROUTE.ABOUT)
    }

    return (
        <div>
            <Segment inverted vertical style={{ padding: '5em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Header inverted as='h4' content='Spike' />
                                <List link inverted>
                                    <div onClick={() => goToAboutPage()}>
                                        {props.displaying === PAGES.ABOUT && window.scrollTo(0, 0)}
                                        <Image circular
                                            src="https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/FooterImage%2FKarloSpike.jpg?alt=media&token=a6e240b0-4a52-4525-9c9b-c3ecd6df77e2"
                                            size="tiny" />
                                    </div>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={6}>
                                <Header inverted as='h4' content='Social' />
                                <List link inverted>
                                    <List.Item>
                                        <a href="https://www.facebook.com/spikeslot/" >
                                            <Icon name="facebook official" size="large" inverted color='grey' />
                                            Facebook
                                        </a>
                                    </List.Item>
                                    <List.Item>
                                        <a href="https://youtube.com/spikeslot">
                                            <Icon name="youtube icon" size="large" inverted color='grey' />
                                            Youtube
                                        </a>
                                    </List.Item>
                                    <List.Item>
                                        <a href="https://www.instagram.com/spikeslot/">
                                            <Icon name="instagram icon" size="large" inverted color='grey' />
                                            Instagram
                                        </a>
                                    </List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={5}>
                                <p as='h4' inverted>Se il gioco diventa un problema</p>
                                <p>Numero verde di aiuto alla ludopatia</p>

                                <List.Item>
                                    <Icon name="phone" size="large" />
                                    800 135 903
                                </List.Item>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
            <Segment inverted vertical
                style={{ backgroundColor: '#3b3c3d', marginTop: '0', paddingTop: '1rem', paddingBottom: '1.5rem' }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row style={{ paddingTop: '2rem' }}>
                            <Grid.Column textAlign='center'>
                                <List link inverted>
                                    <List.Item>Copyright &copy; 2018 <a href={ROUTE.ROOT}>Spike</a>. All rights
                                        Reserved</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </div>
    )
}

const mapStateToProps = (state) => ({
    displaying: state.displaying
})

export default withRouter(connect(mapStateToProps)(Footer))