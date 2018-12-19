import React from 'react'
// semantic
import { Segment } from 'semantic-ui-react-single/Segment'
import { Visibility } from 'semantic-ui-react-single/Visibility'
// components
import AamsBanner from "../AamsBanner";
// mix
import LazyLoad from 'react-lazyload';
import {getImageLinkFromName} from "../../utils/Utils";
import {LoadingDimmer} from "../../utils/DimmerText";

const styles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        height: '100vh',
    }
};

const ProducerHeader = ({ loading, currentProducer}) => {
    return (
        <Visibility
            once={false}
            >
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: '100vh', padding: 0 }}
                vertical>
                <LazyLoad height={'100vh'}>
                    <LoadingDimmer active={loading}/>
                    <header
                        id='producerHeader'
                        className='fade-in-header'
                        style={{ backgroundImage: `url(${getImageLinkFromName('producer', (currentProducer && currentProducer.name))})` }}
                    >
                        <div
                            style={styles.overlay}>
                            <div className='description-alignment' >
                                <div className='align-center' style={{ marginTop: '15rem' }}>
                                    <h1 className='header-spike-text'>{(currentProducer && currentProducer.name)}</h1>
                                    {/*<h1 className='slideRight'>{currentProducer.name}</h1>*/}
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
};

export default ProducerHeader