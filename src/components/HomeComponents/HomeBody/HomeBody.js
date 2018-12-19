import React from 'react'
import PropTypes from 'prop-types';
// semantic
import { Grid } from 'semantic-ui-react-single/Grid'
import { Sticky } from 'semantic-ui-react-single/Sticky'
import { Dropdown } from 'semantic-ui-react-single/Dropdown'
// components
import SlotList from './SlotList'
import BonusList from './BonusList'
// mix
import { SLOT_TYPES } from '../../../enums/Constants'
import { Responsive } from 'semantic-ui-react-single/Responsive';


const dropdownOptions = [
    { key: 1, text: 'Rating', value: 'rating' },
    { key: 2, text: 'Data', value: 'time' },
    { key: 3, text: 'Nome', value: 'name' }
];

const HomeBody = ({ orderHandler, slotorder, type, handleContextRef, stickyContextRef, isActive }) => (
    <Grid style={{ marginTop: '0rem', paddingBottom: '4rem' }} celled='internally' stackable className='row-centered-spaced'>
        <Grid.Row>
            <Grid.Column width={12} style={{ paddingLeft: '0' }}>
                <Dropdown
                    style={{ marginBottom: '2rem', marginLeft: '2.5rem' }}
                    onChange={orderHandler}
                    options={dropdownOptions}
                    placeholder='Ordina per'
                    selection
                    value={slotorder} />
                <div ref={handleContextRef}>

                    <Responsive maxWidth={600} >
                        <SlotList type={type} order={slotorder} cardPerRow="1" />
                    </Responsive>

                    <Responsive minWidth={600} >
                        <SlotList type={type} order={slotorder} cardPerRow="3" />
                    </Responsive>


                </div>

            </Grid.Column>



            <Grid.Column
                style={{ padding: '0 2rem' }}
                width={4}>
                <Sticky
                    context={stickyContextRef}
                    active={isActive}
                    offset={80}>

                    <Responsive minWidth={600} >

                        <BonusList maxNumber={15} maxbonusToShow={3} />

                    </Responsive>

                </Sticky>
                <Responsive maxWidth={600} >

                    <BonusList maxNumber={3} maxbonusToShow={3} />

                </Responsive>

            </Grid.Column>

        </Grid.Row>
    </Grid>
)

HomeBody.propTypes = {
    orderHandler: PropTypes.func,   // cosa fare quando viene selezionato qualcosa dal menu
    slotorder: PropTypes.oneOf(['rating', 'time', 'name']),
    type: PropTypes.oneOf([SLOT_TYPES.BAR, SLOT_TYPES.GRATIS]),
    handleContextRef: PropTypes.func,    // update del ref per lo sticky
    stickyContextRef: PropTypes.func,    // riferimento per sticky
    isActive: PropTypes.bool
}

export default HomeBody