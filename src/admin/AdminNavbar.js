import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { slide as BurgerMenu } from "react-burger-menu";
import { Menu } from 'semantic-ui-react-single/Menu'
import { Dropdown } from 'semantic-ui-react-single/Dropdown'
import { Icon } from 'semantic-ui-react-single/Icon'
import { Search } from 'semantic-ui-react-single/Search'
import { Responsive } from "semantic-ui-react-single/Responsive";
import { ADMINPAGES, RESPONSIVE_RESOLUTION, ROUTE } from "../enums/Constants";
import { burgerMenuStyle } from "../style/BurgerMenu";




class AdminNavbar extends Component {
    state = {
        redirect: {
            path: undefined
        }
    };
    activeItem = ADMINPAGES.ADMIN;

    iconMenu = () => {
        return (
            <NavLink to={ROUTE.ADMIN}>
                <Icon name='cogs' />
            </NavLink>
        )
    };



    slotMenu = () => {
        return (
            <Dropdown item simple text='Slot'>
                <Dropdown.Menu simple>
                    <Dropdown.Item onClick={() => this.handleClick('admin-nav-add-slot')}>
                        <NavLink id='admin-nav-add-slot' to={ROUTE.ADDSLOT}>
                            <Icon name='add' /> Aggiungi Slot
                        </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleClick('admin-nav-slot')}>
                        <NavLink id='admin-nav-slot' to={ROUTE.ADMINSLOT}>
                            <Icon name='game' /> Gestione Slot
                        </NavLink>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    };

    bonusMenu = () => {
        return (
            <Dropdown item simple text='Bonus'>
                <Dropdown.Menu simple>
                    <Dropdown.Item onClick={() => this.handleClick('admin-nav-add-bonus')}>
                        <NavLink id='admin-nav-add-bonus' to={ROUTE.ADDBONUS}><Icon
                            name='add' /> Aggiungi Bonus</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleClick('admin-nav-bonus')}>
                        <NavLink id='admin-nav-bonus' to={ROUTE.ADMINBONUS}>
                            <Icon name='plus circle' /> Gestione Bonus
                        </NavLink>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    };

    producerMenu = () => {
        return (
            <Dropdown item simple text='Produttori'>
                <Dropdown.Menu simple>
                    <Dropdown.Item onClick={() => this.handleClick('admin-nav-add-producer')}>
                        <NavLink id='admin-nav-add-producer' to={ROUTE.ADDPRODUCER}><Icon
                            name='add' /> Aggiungi Produttore</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleClick('admin-nav-producer')}>
                        <NavLink id='admin-nav-producer' to={ROUTE.ADMINPRODUCER}>
                            <Icon name='lab' /> Gestione Produttori
                        </NavLink>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    };

    extraMenu = () => {
        return (
            <Dropdown item simple text='Extra'>
                <Dropdown.Menu simple>
                    <Dropdown.Item onClick={() => this.handleClick('admin-nav-add-extra')}>
                        <NavLink id='admin-nav-add-extra' to={ROUTE.ADDEXTRAFROMHTML}>
                            <Icon name='add' /> Aggiungi Articoli
                        </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleClick('admin-nav-extra')}>
                        <NavLink id='admin-nav-extra' to={ROUTE.ADMINEXTRA}>
                            <Icon name='lab' /> Gestione Articoli
                        </NavLink>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    };

    searchItem = () => {
        return (
            <Search
                color='red'
                size='mini'
                category
                noResultsMessage='TODO!!1'
            // loading={isLoading}
            // onResultSelect={this.handleResultSelect}
            // onSearchChange={_.debounce(this.handleSearchChange, 400, { leading: true })}
            // results={results}
            // value={value} >
            />
        )
    };

    handleClick = (id) => {
        document.getElementById(id).click()
    };


    render() {
        const activeItem = this.props.activeItem;
        return (
            <div>
                {/* BURGER MENU */}
                <Responsive maxWidth={RESPONSIVE_RESOLUTION.MEDIUM - 1}>
                    <BurgerMenu isOpen={this.state.menuOpen} styles={burgerMenuStyle}>
                        <Menu
                            stackable
                            size='large'>
                            <Menu.Item>
                                {this.iconMenu()}
                            </Menu.Item>

                            <Menu.Item style={{ padding: '0', margin: '0' }} active={activeItem === ADMINPAGES.SLOT}>
                                {this.slotMenu()}
                            </Menu.Item>

                            <Menu.Item style={{ padding: '0rem' }} active={activeItem === ADMINPAGES.BONUS}>
                                {this.bonusMenu()}
                            </Menu.Item>

                            <Menu.Item style={{ padding: '0rem' }} active={activeItem === ADMINPAGES.PRODUCER}>
                                {this.producerMenu()}
                            </Menu.Item>

                            <Menu.Item style={{ padding: '0rem' }} active={activeItem === ADMINPAGES.EXTRA}>
                                {this.extraMenu()}
                            </Menu.Item>

                            <Menu.Item position='right' style={{ marginRight: '4rem' }}>
                                {this.searchItem()}
                            </Menu.Item>

                        </Menu>
                    </BurgerMenu>
                </Responsive>

                {/* ORIZONTAL MENU */}
                <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                    <Menu stackable fixed='top'>
                        <Menu.Item>
                            {this.iconMenu()}
                        </Menu.Item>

                        <Menu.Item style={{ padding: '0rem' }} active={activeItem === ADMINPAGES.SLOT}>
                            {this.slotMenu()}
                        </Menu.Item>

                        <Menu.Item style={{ padding: '0rem' }} active={activeItem === ADMINPAGES.BONUS}>
                            {this.bonusMenu()}
                        </Menu.Item>

                        <Menu.Item style={{ padding: '0rem' }} active={activeItem === ADMINPAGES.PRODUCER}>
                            {this.producerMenu()}
                        </Menu.Item>

                        <Menu.Item style={{ padding: '0rem' }} active={activeItem === ADMINPAGES.EXTRA}>
                            {this.extraMenu()}
                        </Menu.Item>

                        <Menu.Item position='right' style={{ marginRight: '4rem' }}>
                            {this.searchItem()}
                        </Menu.Item>
                    </Menu>
                </Responsive>
            </div>
        );
    }
}

AdminNavbar.propTypes = {};

export default AdminNavbar;

