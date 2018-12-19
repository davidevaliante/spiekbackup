import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react-single/Dropdown'
import { getBonusList } from '../firebase/get';
import pick from 'lodash/pick';
import map from 'lodash/map'

class SearchMultipleSelection extends Component {

    state = {
    }

    componentDidMount() {
        getBonusList(this.onBonusListFectched)
    }


    formatObjectIntoList = (list) => {
        let formattedList = [];
        let counter = 1
        for (const key in list) {
            formattedList.push({ key: `${key}`, value: `${counter}`, text: `${list[key].name}` })
            counter++
        }
        return formattedList;
    }

    onBonusListFectched = (list) => {

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
                id='bonusField'
                placeholder='Bonus'
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



export default SearchMultipleSelection