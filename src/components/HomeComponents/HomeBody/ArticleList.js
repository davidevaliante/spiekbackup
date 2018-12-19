import React, { Component } from 'react';
import { getExtraList } from "../../../firebase/get"
import { Grid } from 'semantic-ui-react-single/Grid'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { Header } from "semantic-ui-react-single/Header";
import { Icon } from "semantic-ui-react-single/Icon";
import { Dimmer } from "semantic-ui-react-single/Dimmer";
import delay from 'lodash/delay';
import orderBy from 'lodash/orderBy';
import truncate from 'lodash/truncate'
import filter from 'lodash/filter'
import { Item } from 'semantic-ui-react-single/Item'
import ArticleCard from '../../../components/Cards/ArticleCard'
import { Card } from 'semantic-ui-react'

class ArticleList extends Component {

    state = {
        active: false,
        loadingDimmer: true
    };

    onListFetched = (rawList) => {
        let list = []
        for (const key in rawList) {
            const item = rawList[key];
            item['id'] = key
            list.push(item)
        }

        list = orderBy(list, ['time'], ['desc'])

        this.setState({
            extraList: list,

        })
    };


    componentDidMount() {
        getExtraList(this.onListFetched);
    }
    renderItem = () => {
        return this.state.extraList.map((current) =>
            <ArticleCard inAdmin={false} item={current} onItemDeleted={this.onItemDeleted} />
        )
    };

    render() {
        const { extraList } = this.state
        console.log(this.state);

        return (
            <Card.Group>
                {extraList && this.renderItem()}
            </Card.Group>
        );
    }
}

export default ArticleList;

