import React, { Component } from 'react'
import PropTypes from 'prop-types'
// semantic
import { Menu } from 'semantic-ui-react-single/Menu'
import { Visibility } from 'semantic-ui-react-single/Visibility'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { Sticky } from 'semantic-ui-react-single/Sticky'
// components
import NavbarSearchBar from './NavbarSearchBar'
import ProducersDropdown from './ProducersDropdown'
// router e redux
import { NavLink } from 'react-router-dom'
import { PAGES, ROUTE, RESPONSIVE_RESOLUTION } from '../../enums/Constants'
import {
    setHomePage,
    setBarPage,
    setGratisPage,
    setProducerPage,
    setArticlePage, setVltPage
} from '../../reducers/CurrentPageReducer'
import { connect } from 'react-redux'
// static files
import logo from '../../static/app_icon.svg';
// utils
import { smoothScrollTo } from '../../utils/Utils';
import { slide as BurgerMenu } from 'react-burger-menu'
import { burgerMenuStyle } from "../../style/BurgerMenu";


class Navbar extends Component {

    state = {
        menuOpen: false,
        producerDropdownOpen: false
    };

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    toggleMenuForMobile = () => {
        this.setState({ showMenu: true })
    }

    closeMobileMenu = () => {
        this.setState({ showMenu: false })
    }
    updateCurrentPage = (page, producerName) => {
        this.setState({
            menuOpen: false
        })
        switch (page) {
            case PAGES.HOME:
                document.getElementById('home-nav-link').click()
                this.props.dispatch(setHomePage())
                break;
            case PAGES.SLOT_BAR:
                document.getElementById('bar-nav-link').click()
                this.props.dispatch(setBarPage())
                break;
            case PAGES.SLOT_GRATIS:
                document.getElementById('gratis-nav-link').click()
                this.props.dispatch(setGratisPage())
                break;
            case PAGES.VLT:
                document.getElementById('vlt-nav-link').click()
                this.props.dispatch(setVltPage())
                break;
            case PAGES.ARTICLE:
                document.getElementById('article-nav-link').click()
                this.props.dispatch(setArticlePage())
                break;
            case PAGES.PRODUCER:
                this.props.dispatch(setProducerPage(producerName));
                break;
            default:
                // document.getElementById('home-nav-link').click()
                this.props.dispatch(setHomePage())
        }
        if (document.getElementById('descriptionBanner'))
            smoothScrollTo('descriptionBanner')
    }

    render() {
        const { contextRef } = this.props


        return (
            <div ref={this.props.handleContextRef}>
                {/* BURGER MENU */}
                <Responsive maxWidth={RESPONSIVE_RESOLUTION.MEDIUM - 1}>
                    {!this.state.showMenu &&
                        <div
                            onClick={this.toggleMenuForMobile}
                            className='sticky-pro'>
                            <div className='div-brutto'>Menu</div>
                        </div>
                    }

                    {this.state.showMenu &&
                        <div className='sticky-pro'>

                            <Menu
                                inverted
                                color='grey'
                                stackable
                                size='large'>
                                <Menu.Item
                                    as='a'
                                    className='navbarItemOne'
                                    onClick={(event, data) => this.updateCurrentPage(PAGES.HOME)}
                                    active={this.props.displaying === PAGES.HOME}>
                                    <NavLink id='home-nav-link' to='/'>Home</NavLink>
                                </Menu.Item>

                                <Menu.Item
                                    as='a'
                                    onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_GRATIS)}
                                    active={this.props.displaying === PAGES.SLOT_GRATIS}>
                                    <NavLink id='gratis-nav-link' to={ROUTE.SLOT_GRATIS}>Slot Gratis</NavLink>
                                </Menu.Item>

                                <Menu.Item
                                    as='a'
                                    onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_BAR)}
                                    active={this.props.displaying === PAGES.SLOT_BAR}>
                                    <NavLink id='bar-nav-link' to={ROUTE.SLOT_BAR}>Slot da bar</NavLink>
                                </Menu.Item>

                                <Menu.Item
                                    as='a'
                                    onClick={(event, data) => this.updateCurrentPage(PAGES.VLT)}
                                    active={this.props.displaying === PAGES.VLT}>
                                    <NavLink id='vlt-nav-link' to={ROUTE.VLT}>VLT</NavLink>
                                </Menu.Item>

                                <Menu.Item
                                    as="a">
                                    <ProducersDropdown callback={this.updateCurrentPage} />
                                </Menu.Item>

                                <Menu.Item
                                    as='a'
                                    onClick={(event, data) => this.updateCurrentPage(PAGES.ARTICLE)}
                                    active={this.props.displaying === PAGES.ARTICLE}>
                                    <NavLink id='article-nav-link' to={ROUTE.ARTICLE}>Articoli</NavLink>
                                </Menu.Item>

                                <Menu.Item borderless position='right'>
                                    <NavbarSearchBar displaying={this.props.displaying} slotId={this.props.slotId} />
                                </Menu.Item>
                                <Menu.Item style={{ 'textAlign': 'center' }} borderless position='right' onClick={this.closeMobileMenu}>
                                    <div className='close-mobile-menu'>Chiudi</div>
                                </Menu.Item>
                            </Menu>
                        </div>

                    }
                </Responsive>

                {/* ORIZONTAL MENU */}
                <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                    <Visibility
                        once={false}
                        onBottomPassed={this.showFixedMenu}
                        onBottomPassedReverse={this.hideFixedMenu}>
                        <Menu
                            color='#2c2c2c'
                            style={{ zIndex: 99, paddingRight: '12rem' }}
                            fixed='top'
                            inverted
                            // inverted={!this.state.fixed}
                            // secondary={!this.state.fixed}
                            size='large'>
                            <Menu.Item
                            // style={{ visibility: this.state.fixed ? 'visible' : 'hidden' }}
                            >
                                <img src={logo} alt='spike-logo' />
                            </Menu.Item>
                            <Menu.Item
                                as='a'
                                className='navbarItemOne'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.HOME)}
                                active={this.props.displaying === PAGES.HOME}>
                                <NavLink id='home-nav-link' to='/'>Home</NavLink>
                            </Menu.Item>

                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_GRATIS)}
                                active={this.props.displaying === PAGES.SLOT_GRATIS}>
                                <NavLink id='gratis-nav-link' to={ROUTE.SLOT_GRATIS}>Slot Gratis</NavLink>
                            </Menu.Item>

                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_BAR)}
                                active={this.props.displaying === PAGES.SLOT_BAR}>
                                <NavLink id='bar-nav-link' to={ROUTE.SLOT_BAR}>Slot da bar</NavLink>
                            </Menu.Item>

                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.VLT)}
                                active={this.props.displaying === PAGES.VLT}>
                                <NavLink id='vlt-nav-link' to={ROUTE.VLT}>VLT</NavLink>
                            </Menu.Item>

                            <Menu.Item
                                as="a"
                            >
                                <ProducersDropdown callback={this.updateCurrentPage} />
                            </Menu.Item>
                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.ARTICLE)}
                                active={this.props.displaying === PAGES.ARTICLE}>
                                <NavLink id='article-nav-link' to={ROUTE.ARTICLE}>Articoli</NavLink>
                            </Menu.Item>

                            <Menu.Item borderless position='right'>
                                <NavbarSearchBar displaying={this.props.displaying} slotId={this.props.slotId} />
                            </Menu.Item>
                        </Menu>
                    </Visibility>
                </Responsive>
            </div>
        )
    }
}

Navbar.propTypes = {
    fixed: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    displaying: state.displaying,
    fixed: state.menuFixed
})
export default connect(mapStateToProps)(Navbar);