import React, { Component } from 'react'
// semantic
import { Segment } from 'semantic-ui-react-single/Segment'
// components
import Footer from "../Footer";
import ListDescriptionBanner from './ListDescriptionBanner'
import HomePageHeader from '../Header/HomePageHeader'
import SiteDescription from './HomeBody/SiteDescription'
import HomeBody from './HomeBody/HomeBody'
import Navbar from '../Header/Navbar'
import PopularSlotList from './HomeBody/PopularSlotList'
// router e redux
import { connect } from 'react-redux';
import { ROUTE, SLOT_TYPES, PAGES } from "../../enums/Constants";
import { Responsive } from 'semantic-ui-react-single/Responsive';

import {
    setHomePage,
    setGratisPage,
    setBarPage,
    setAboutPage,
    setProducerPage,
    setArticlePage,
    setVltPage
} from '../../reducers/CurrentPageReducer'
// data
import { getSlotsCardBasedOnTime, getAllByType, getBanners } from '../../firebase/get'
import ArticleList from "../HomeComponents/HomeBody/ArticleList"
import ArticleDescription from '../HomeComponents/HomeBody/ArticleDescription'
import Article from '../Extra/Article';

class HomePage extends Component {
    state = {
        firstBannerIsVisible: true

    };

    componentDidMount() {
        getBanners(bannersObject => {
            this.setState({
                banners: bannersObject,
                bannerSlotList: {
                    secondBannerImage: bannersObject.secondBanner,
                    secondBannerLink: bannersObject.secondBannerLink,
                    isVisible: true
                },
                bannerBonusList: {
                    thirdBannerImage: bannersObject.thirdBanner,
                    thirdBannerLink: bannersObject.thirdBannerLink,
                    isVisible: true
                }
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.displaying !== this.props.displaying) {
            switch (this.props.displaying) {
                case PAGES.HOME:
                    getSlotsCardBasedOnTime(12);
                    break;
                case PAGES.SLOT_BAR:
                    getAllByType('BAR');
                    break;
                case PAGES.SLOT_GRATIS:
                    getAllByType('GRATIS');
                    break;
                case PAGES.VLT:
                    getAllByType('VLT');
                    break;
                default:
            }
        }
    }

    handleContextRef = contextRef => this.setState({ contextRef })
    handleChange = (e, { value }) => this.setState({ order: value })

    hideFirstBanner = () => this.setState({ firstBannerIsVisible: false })
    hideSecondBanner = () => this.setState({ bannerSlotList: { ...this.state.bannerSlotList, isVisible: false } })
    hideThirdBanner = () => this.setState({ bannerBonusList: { ...this.state.bannerBonusList, isVisible: false } })


    handleFirstBannerClick = () => {
        window.open(this.state.banners.firstBannerLink)
    }

    handleSecondBannerClick = () => {
        window.open(this.state.bannerSlotList.secondBannerLink)
    }

    handleThirdBannerClick = () => {
        window.open(this.state.bannerSlotList.thirdBannerLink)
    }

    articlePage = () => {
        const { contextRef } = this.state
        return (
            <div>
                <Navbar
                    displaying='HOME'
                    handleContextRef={this.handleContextRef}
                    stickyContextRef={contextRef} />
                <HomePageHeader style={{ position: 'absolute', zIndex: 1 }} ref={this.handleContextRef} />
                <ArticleDescription />
                <Segment vertical style={{ 'marginTop': '6rem', 'marginBottom': '6rem', paddingLeft: '2.2rem' }}>

                    <ArticleList>

                    </ArticleList>
                </Segment>
                <Footer />
            </div>)
    }
    listSlot = () => {
        console.log(this.state)

        const { contextRef, order } = this.state
        const type = this.getType(this.props.match.path)
        return (
            <div>
                <Navbar displaying='HOME' />
                <HomePageHeader style={{ position: 'absolute', zIndex: 1 }} />
                <SiteDescription />
                <Responsive {...Responsive.onlyComputer}>

                    {(this.state.banners && this.state.firstBannerIsVisible) &&
                        <div style={{ marginTop: '3rem', }}>
                            <img
                                width={970}
                                height={90}
                                style={{ marginTop: '3rem', display: 'block', margin: 'auto' }}
                                src={this.state.banners.firstBanner}
                                onClick={this.handleFirstBannerClick}
                                onError={this.hideFirstBanner}
                            />
                        </div>
                    }
                </Responsive>


                <Responsive {...Responsive.onlyTablet}>

                    {(this.state.banners && this.state.firstBannerIsVisible) &&
                        <div style={{ marginTop: '3rem', }}>
                            <img
                                width={768}
                                height={72}
                                style={{ marginTop: '3rem', display: 'block', margin: 'auto' }}
                                src={this.state.banners.firstBanner}
                                onClick={this.handleFirstBannerClick}
                                onError={this.hideFirstBanner}
                            />
                        </div>
                    }
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>

                    {(this.state.banners && this.state.firstBannerIsVisible) &&
                        <div style={{ marginTop: '3rem', }}>
                            <img
                                width={375}
                                height={45}
                                style={{ marginTop: '3rem', display: 'block', margin: 'auto' }}
                                src={this.state.banners.firstBanner}
                                onClick={this.handleFirstBannerClick}
                                onError={this.hideFirstBanner}
                            />
                        </div>
                    }
                </Responsive>
                <Segment vertical>
                    <PopularSlotList />

                    <ListDescriptionBanner />
                    <HomeBody
                        bannerBonusList={this.state.bannerBonusList}
                        thirdBannerClick={this.handleThirdBannerClick}
                        thirdBannerError={this.hideThirdBanner}
                        bannerSlotList={this.state.bannerSlotList}
                        secondBannerClick={this.handleSecondBannerClick}
                        secondBannerError={this.hideSecondBanner}
                        orderHandler={this.handleChange}
                        slotorder={order}
                        type={type}
                        handleContextRef={this.handleContextRef}
                        stickyContextRef={contextRef}
                        isActive={true} />
                </Segment>
                <Footer />
            </div>)
    }

    getType(path) {
        switch (path) {
            case ROUTE.SLOT_BAR:
                this.title = 'Slot da Bar'
                this.props.dispatch(setBarPage())
                return SLOT_TYPES.BAR;
            case ROUTE.SLOT_GRATIS:
                this.title = 'Slot Gratis'
                this.props.dispatch(setGratisPage())
                return SLOT_TYPES.GRATIS;
            case ROUTE.ABOUT:
                this.props.dispatch(setAboutPage())
                return 'ABOUT'
            case ROUTE.VLT:
                this.props.dispatch(setVltPage())
                return 'VLT'
            case ROUTE.ARTICLE:
                this.props.dispatch(setArticlePage())
                return 'ARTICLE'
            case ROUTE.PRODUCER:
                this.title = this.props.match.params.name
                this.props.dispatch(setProducerPage(this.props.match.params.name))
                return SLOT_TYPES.PRODUCER_FILTERED


            default:
                this.title = 'Le Slot del giorno'
                this.props.dispatch(setHomePage())
                return undefined
        }
    }


    render() {

        const type = this.getType(this.props.match.path)

        const { contextRef } = this.state

        return (
            <div>
                {type === "ARTICLE" ? this.articlePage() : this.listSlot()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    displaying: state.displaying,
    slotList: state.slotList,
    bonusList: state.bonusList,
    contextRef: state.contextRef
})

export default connect(mapStateToProps)(HomePage)



