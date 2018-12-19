import React from 'react'
// semantic
import { Container } from 'semantic-ui-react-single/Container'
import { Segment } from 'semantic-ui-react-single/Segment'
import { Image } from 'semantic-ui-react-single/Image'
// router e redux
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <Container fluid>
            <Container style={{ paddingTop: 10 }}>
                <Container textAlign="center" fluid>

                    <Segment>
                        <Image

                            src='https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Ferror404.jpg?alt=media&token=66ab4c3d-3e21-4c22-8137-e0c92d3c8ec0' fluid />
                    </Segment>


                    <Segment>
                        <center><Link to="/">Ritorna Sulla Pagina Principale</Link></center>
                    </Segment>
                </Container>
            </Container>
        </Container >
    )
}


export default NotFound;



