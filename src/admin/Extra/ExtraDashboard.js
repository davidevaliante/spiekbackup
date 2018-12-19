import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react-single/Grid'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { getExtraList } from "../../firebase/get";
import AdminNavbar from "../../admin/AdminNavbar";
import { ADMINPAGES, RESPONSIVE_RESOLUTION } from "../../enums/Constants";
import { Header } from "semantic-ui-react-single/Header";
import { Icon } from "semantic-ui-react-single/Icon";
import { Dimmer } from "semantic-ui-react-single/Dimmer";
import delay from 'lodash/delay';
import orderBy from 'lodash/orderBy';
import truncate from 'lodash/truncate'
import filter from 'lodash/filter'
import { LoadingDimmer } from '../../utils/DimmerText';
import { removeHtmlFrom } from '../../utils/Utils'
import ArticleCard from '../../components/Cards/ArticleCard'
import { Item } from 'semantic-ui-react-single/Item'

class ExtraDashboard extends Component {

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
            loadingDimmer: false
        })
    };

    onExtraDeleted = (id) => {
        this.setState({ active: true })
        delay(() => {
            this.setState({ active: false })
        }, 1000);
        // TODO cercare nello state l'id cancellato ed eliminarlo evitando una chiamata al DB
        getExtraList(this.onListFetched);
    };

    onItemDeleted = (id) => {
        // update della lista
        const updatedList = filter(this.state.extraList, extra => extra.id !== id)
        this.setState({ extraList: updatedList })
    }

    renderItem = () => {
        return this.state.extraList.map((current) =>
            <ArticleCard inAdmin={true} item={current} onItemDeleted={this.onItemDeleted} />
        )
    };

    ExtraCard = ({ item }) => {
        let description
        if (item.title)
            description = item.title
        else
            description = truncate(removeHtmlFrom(item.content), { 'length': 60, 'omission': '...' })
        return <h2>{description}</h2>
    }

    componentDidMount() {
        getExtraList(this.onListFetched);
    }

    render() {
        const { active, loadingDimmer, extraList } = this.state
        console.log(this.state);

        return (
            <div>
                <Dimmer blurring active={active} page>
                    <Header as='h2' icon inverted>
                        <Icon name='check' />
                        Produttore cancellato con successo
                    </Header>
                </Dimmer>
                <LoadingDimmer active={loadingDimmer} />
                <AdminNavbar activeItem={ADMINPAGES.EXTRA} />
                <h2>Lista degli articoli</h2>
                <div style={{ marginTop: '5rem', padding: '2rem' }}>
                    <Item.Group>
                        {extraList && this.renderItem()}
                    </Item.Group>
                </div>
            </div>

        );
    }
}

export default ExtraDashboard;