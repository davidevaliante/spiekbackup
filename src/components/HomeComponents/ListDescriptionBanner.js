import React, { Component } from 'react'
// semantic
import { Visibility } from 'semantic-ui-react-single/Visibility'
import { Responsive } from 'semantic-ui-react-single/Responsive'
// mix 
import { PAGES, RESPONSIVE_RESOLUTION } from '../../enums/Constants'
// router e redux
import { connect } from 'react-redux'

class ListDescriptionBanner extends Component {

    state = {
        bottomPassed: false,
        stateDisplaying: PAGES.HOME
    }

    fireAnimation = () => {
        !this.state.bottomPassed && this.setState({ bottomPassed: true })
    }

    renderHeader = () => {
        let text = ''
        switch (this.props.displaying) {
            case PAGES.HOME:
                text = 'Le Slot del giorno'
                break
            case PAGES.SLOT_GRATIS:
                text = 'Slot Gratis'
                break
            case PAGES.SLOT_ONLINE:
                text = 'Slot Online'
                break
            case PAGES.SLOT_BAR:
                text = 'Slot da Bar'
                break
            default:
                text = 'Slot del giorno'
        }
        return (
            <div id='descriptionBanner' className='description-banner-container'>
                <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                    <div className='description-banner-red'>
                        <div className='white-line scale-in-hor-right'/>
                        <div>
                            <h2 className="tracking-in-contract"
                                style={{ fontFamily: 'Raleway, sans-serif' }}>I migliori bonus</h2>
                        </div>
                    </div>
                </Responsive>

                <div className='description-banner-black'>
                    <h2 className="tracking-in-contract"
                        style={{ fontFamily: 'Raleway, sans-serif' }}>{text}</h2>
                    <div className='white-line scale-in-hor-left'/>
                </div>
            </div>
        )
    }

    render() {

        if (this.state.stateDisplaying !== this.props.displaying) {
            this.setState({ stateDisplaying: this.props.displaying })
        }

        return (
            <Visibility
                once={this.state.stateDisplaying === this.props.displaying}
                onBottomVisible={this.fireAnimation}>
                {this.state.bottomPassed ? this.renderHeader() : <div></div>}
            </Visibility>
        )
    }
}

const mapStateToProps = (state) => ({
    displaying: state.displaying
})

export default connect(mapStateToProps)(ListDescriptionBanner)