import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid} from 'semantic-ui-react-single/Grid'
import {Responsive} from 'semantic-ui-react-single/Responsive'
import {getProducerList} from "../../firebase/get";
import AdminNavbar from "../../admin/AdminNavbar";
import {ADMINPAGES, RESPONSIVE_RESOLUTION} from "../../enums/Constants";
import AdminProducerCard from "./AdminProducerCard";
import {Header} from "semantic-ui-react-single/Header";
import {Icon} from "semantic-ui-react-single/Icon";
import {Dimmer} from "semantic-ui-react-single/Dimmer";
import delay from 'lodash/delay';
import orderBy from 'lodash/orderBy';
import { LoadingDimmer } from '../../utils/DimmerText';

function mapStateToProps(state) {
    return {};
}

class ProducerDashboard extends Component {

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
        
        list = orderBy(list, ['name'], ['asc'])

        this.setState({
            producerList: list,
            loadingDimmer: false
        })
    };

    onProducerDeleted = (id) => {
        this.setState({ active: true })
        delay(() => {
            this.setState({ active: false })
        }, 1000);
        // TODO cercare nello state l'id cancellato ed eliminarlo evitando una chiamata al DB
        getProducerList(this.onListFetched);
    };

    renderItem = () => {
        return this.state.producerList.map((producer) => (producer &&
            <Grid.Column>
                <AdminProducerCard key={producer.id} producer={producer} onDelete={this.onProducerDeleted}/>
            </Grid.Column>))
    };

    componentDidMount() {
        getProducerList(this.onListFetched);
    }

    render() {
        const {producerList, active, loadingDimmer} = this.state;

        return (
            <div>
                <Dimmer blurring active={active} page>
                    <Header as='h2' icon inverted>
                        <Icon name='check' />
                        Produttore cancellato con successo
                    </Header>
                </Dimmer>
                <LoadingDimmer active={loadingDimmer} />
                <AdminNavbar activeItem={ADMINPAGES.PRODUCER}/>
                <div style={{marginTop: '5rem', padding: '2rem'}}>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.LARGE}>
                        <Grid stackable columns={4}>
                            {producerList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM} maxWidth={RESPONSIVE_RESOLUTION.LARGE}>
                        <Grid stackable columns={3}>
                            {producerList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.SMALL} maxWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                        <Grid stackable columns={2}>
                            {producerList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive maxWidth={RESPONSIVE_RESOLUTION.SMALL}>
                        <Grid stackable columns={1}>
                            {producerList && this.renderItem()}
                        </Grid>
                    </Responsive>
                </div>
            </div>

        );
    }
}

export default connect(mapStateToProps)(ProducerDashboard);
