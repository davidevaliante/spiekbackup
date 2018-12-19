import React, { Component } from 'react';
// semantic
import { Dropdown } from 'semantic-ui-react-single/Dropdown';
// mix
import { setProducerPage } from "../../reducers/CurrentPageReducer";
import { PAGES, ROUTE } from '../../enums/Constants';
// router e redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// lodash
import orderBy from 'lodash/orderBy';

class ProducersDropdown extends Component {
    state = {};

    formatProducerForDropdown = (list) => {
        let formattedList = [];
        for (const key in list) {
            const prod = list[key];
            formattedList.push({
                id: key,
                text: prod.name,
                value: prod.name,
                // image: {
                //     avatar: true,
                //     rounded: true,
                //     size: 'mini',
                //     src: getImageLinkFromName('producer', prod.name)
                // },

            })
        }
        formattedList = orderBy(formattedList, ['value'], ['asc']);
        return formattedList
    };

    dropdownChoiceHandler = (producerName) => {
        producerName = encodeURIComponent(producerName);
        this.props.callback(PAGES.PRODUCER, producerName);
        this.props.history.push(`${ROUTE.PRODUCERS}/${producerName}`);
        this.props.dispatch(setProducerPage(producerName));
    };


    render() {
        return (
            <Dropdown
                text='Produttori'
                scrolling
                closeOnBlur
                closeOnChange
                onChange={(event, data) => this.dropdownChoiceHandler(data.value)}
                options={this.formatProducerForDropdown(this.props.producerList)} />
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    producerList: state.producerList
});

export default withRouter(connect(mapStateToProps)(ProducersDropdown))