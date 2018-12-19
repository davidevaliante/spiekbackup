import React from 'react'
// semantic
import { Segment } from 'semantic-ui-react-single/Segment'
import { Visibility } from 'semantic-ui-react-single/Visibility'
// components
import ShortHandMenu from '../SlotPageComponents/ShortHandMenu'
import AamsBanner from "../AamsBanner";
// mix
import { getImageLinkFromName } from '../../utils/Utils'
import LazyLoad from 'react-lazyload';
import { LoadingDimmer } from "../../utils/DimmerText";

const styles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        height: '100vh',
    }
}

const SlotPageHeader = ({ currentSlot, showFixedMenu, hideFixedMenu, fixmenu, loading }) => {

    return (
        <Visibility
            once={false}
            onBottomPassed={showFixedMenu}
            onBottomPassedReverse={hideFixedMenu}>
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: '100vh', padding: 0 }}
                vertical>
                <LazyLoad height={'100vh'}>
                    <LoadingDimmer active={loading} />
                    <header
                        id='slotHeader'
                        className='fade-in-header'
                        style={{ backgroundImage: `url(${getImageLinkFromName('slot', currentSlot.name, 'big')})` }}>
                        <div
                            style={styles.overlay}>
                            <div className='description-alignment' >
                                <div className='align-center' style={{ marginTop: '10rem' }}>
                                    <h1 className='text-type'>{currentSlot.type === 'BAR' ? 'Slot Bar' : 'Slot Online'}</h1>
                                    <h1 className='header-slot-text'>{currentSlot.name}</h1>
                                    <h1 className='slideRight'>{(currentSlot && currentSlot.producer) && currentSlot.producer.name}</h1>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <ShortHandMenu />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </LazyLoad>
            </Segment>
            <AamsBanner />
        </Visibility>
    )
}

export default SlotPageHeader