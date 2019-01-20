import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react-single/Dropdown'
import { getSlotCardList } from '../firebase/get';
import pick from 'lodash/pick';
import map from 'lodash/map'

class SearchMultipleSelectionSlot extends Component {

    state = {
    }

    componentDidMount() {
        getSlotCardList(this.onSlotListFectched)
    }


    formatObjectIntoList = (list) => {
        let formattedList = [];
        let counter = 1
        for (const key in list) {
            formattedList.push({ key: `${key}`, value: `${counter}`, text: `${list[key].name} - ${list[key].type}` })
            counter++
        }
        return formattedList;
    }

    onSlotListFectched = (list) => {

        this.setState({
            optionList: this.formatObjectIntoList(list),
            firebaseBonusObject: list,
        });
    }

    handleClick = (data) => {
        console.log('clicked');
        console.log(data);
    }

    handleItemAdded = (event, data) => {

        this.setState({ pickedList: data.value })
        this.props.onListUpdate(pick(this.state.firebaseBonusObject, map(data.value, option =>
            this.state.optionList[parseInt(option, 10) - 1].key)
        )
        )
    }


    state = {
        optionList: [],
        firebaseBonusObject: {}
    }



    render() {
        // console.log(this.state);

        return (
            <Dropdown
                id='relatedSlotField'
                placeholder={this.props.placeholder ? this.props.placeholder : 'Bonus'}
                fluid
                multiple
                search
                selection
                defaultValue={this.props.defaults}
                onChange={(event, data) => this.handleItemAdded(event, data)}
                options={this.state.optionList} />
        );
    }
}



export default SearchMultipleSelectionSlot