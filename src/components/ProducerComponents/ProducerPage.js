import React, { Component } from 'react';
// router e redux
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
// semantic
import { Responsive } from "semantic-ui-react-single/Responsive";
import { Segment } from "semantic-ui-react-single/Segment";
// lodash
import delay from 'lodash/delay'
// mix
import { PAGES, RESPONSIVE_RESOLUTION, ROUTE } from "../../enums/Constants";
import { getProducerByName, getSlotListByProducerName } from "../../firebase/get";
import { onListFetched } from "../../utils/Callbacks";
// Components
import Navbar from "../Header/Navbar";
import ProducerHeader from "../Header/ProducerHeader";
import Description from "../SlotPageComponents/Description";
import Footer from "../Footer";
import FixedSlotList from '../FixedSlotList';
import { smoothScrollTo } from "../../utils/Utils";
import SlotPageBonusList from "../SlotPageComponents/SlotPageBonusList";

class ProducerPage extends Component {
    state = {
        displaying: PAGES.PRODUCER,
        loading: true
    };

    componentDidMount() {
        this.gettingPageData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.producerName !== this.props.match.params.producerName) {
            this.setState({
                loading: true
            });
            window.scrollTo(0, 0);
            this.gettingPageData()
        }
    }

    gettingPageData = () => {
        console.log(`nome dal link : ${this.props.match.params.producerName}`);

        getProducerByName(this.props.match.params.producerName,
            // callback 
            (producerDataResponse) => {
                const producer = onListFetched(producerDataResponse);

                if (producer.length === 0) {
                    this.props.history.push(ROUTE.ERROR404)
                } else {
                    getSlotListByProducerName(this.props.match.params.producerName,
                        // callback 
                        slotListObject => {
                            this.setState({
                                currentProducer: onListFetched(producerDataResponse)[0],
                                slotProducerList: onListFetched(slotListObject),
                                loading: false,
                                bonusList: onListFetched(producerDataResponse)[0].bonusList
                            })
                        }
                    )
                }
            }
        )
    };

    handleChange = (e, { value }) => this.setState({ order: value });
    handleContextRef = contextRef => this.setState({ contextRef });

    render() {
        const { currentProducer, slotProducerList, bonusList } = this.state;
        const slotLength = (slotProducerList) ? slotProducerList.length : 0;
        console.log(this.state);


        return (
            <div>
                <Navbar displaying={PAGES.PRODUCER} />

                <ProducerHeader
                    style={{ position: 'absolute', zIndex: 1 }}
                    currentProducer={currentProducer}
                    loading={this.state.loading}
                />

                <Description
                    id='producerName'
                    slotName={(currentProducer && currentProducer.name)}
                    text={currentProducer && currentProducer.description}
                    hidePlayButton={true}
                />

                {!(slotLength === 0) &&
                    <div>
                        <div className='description-banner-container'>
                            <Responsive minWidth={766}>
                                <div className='description-banner-red'>
                                    <div className='white-line scale-in-hor-right' />
                                    <div>
                                        <h2 className="tracking-in-contract"
                                            style={{ fontFamily: 'Raleway, sans-serif' }}>&nbsp;</h2>
                                    </div>
                                </div>
                            </Responsive>

                            <div className='description-banner-black'>
                                <h2 className="tracking-in-contract"
                                    style={{ fontFamily: 'Raleway, sans-serif' }}>Slot del produttore</h2>
                                <div className='white-line scale-in-hor-left' />
                            </div>
                        </div>

                        <Segment vertical>
                            <Responsive
                                minWidth={RESPONSIVE_RESOLUTION.LARGE}
                                as={FixedSlotList}
                                cardPerRow={4}
                                order='name'
                                slotList={this.state.slotProducerList} />
                            <Responsive
                                minWidth={RESPONSIVE_RESOLUTION.MEDIUM}
                                maxWidth={RESPONSIVE_RESOLUTION.LARGE}
                                as={FixedSlotList}
                                cardPerRow={2}
                                order='name'
                                slotList={this.state.slotProducerList} />
                            <Responsive
                                maxWidth={RESPONSIVE_RESOLUTION.MEDIUM}
                                as={FixedSlotList}
                                cardPerRow={1}
                                order='name'
                                slotList={this.state.slotProducerList} />
                        </Segment>
                    </div>
                }

                {bonusList &&
                    <Segment vertical>
                        <SlotPageBonusList bonusList={bonusList}/>
                    </Segment>
                }
                <Footer />
            </div>
        );
    }
}

                const mapStateToProps = (state) => ({
                dispatch: state.dispatch,
                displaying: state.displaying
            });

export default withRouter(connect(mapStateToProps)(ProducerPage))