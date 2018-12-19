import React from 'react'
// semantic
import { Segment } from 'semantic-ui-react-single/Segment'
// components
import LazyLoad from 'react-lazyload'
import AamsBanner from "../AamsBanner"
import { connect } from 'react-redux';

const styles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        height: '100vh',
    }
}
const homeImage = "https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Fslot-header-img-min-min.jpg?alt=media&token=6648de0a-3cd6-402f-9ada-a961cf893c2a"
const slotGratis = "https://images.pexels.com/photos/203088/pexels-photo-203088.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
const slotDaBar = "https://images.pexels.com/photos/972990/pexels-photo-972990.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
const articleImage = "https://images.pexels.com/photos/1249214/pexels-photo-1249214.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

const currentoslotImage = (tiposlot) => {
    switch (tiposlot) {
        case "HOME":
            return homeImage

        case 'SLOT_GRATIS':

            return slotGratis
        case 'SLOT_BAR':

            return slotDaBar
        case 'ARTICLE':
            return articleImage
        default:
            return tiposlot

    }
}

const HomePageHeader = (props) => {
    const a = currentoslotImage(props.displaying)

    return (
        <div>
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: '100vh', padding: 0 }}
                vertical>
                <LazyLoad height={'100vh'}>
                    <header className='fade-in-header'
                        style={{
                            backgroundImage: `url(${a})`
                        }} >
                        <div style={styles.overlay}>
                            <div className='hero-text-box'>
                                <h1 className='header-spike-text' style={{ fontSize: '600%' }}>Spike Slot</h1>
                                <h1 className='slideRight'>Vinci soldi veri<br></br>I migliori consigli per vincere con le slot machine sul web.</h1>
                                <p>{this.a}</p>

                            </div>
                        </div>
                    </header>
                </LazyLoad>
            </Segment>
            <AamsBanner />

        </div>
    )
}



const mapStateToProps = (props) => ({
    displaying: props.displaying,
})


export default connect(mapStateToProps)(HomePageHeader)
