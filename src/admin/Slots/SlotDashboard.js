import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid} from 'semantic-ui-react-single/Grid'
import {Responsive} from 'semantic-ui-react-single/Responsive'
import {getSlotCardList} from "../../firebase/get";
import AdminSlotCard from "./AdminSlotCard";
import AdminNavbar from "../AdminNavbar";
import {ADMINPAGES, RESPONSIVE_RESOLUTION} from "../../enums/Constants";
import delay from 'lodash/delay';
import {Header} from "semantic-ui-react-single/Header";
import {Icon} from "semantic-ui-react-single/Icon";
import {Dimmer} from "semantic-ui-react-single/Dimmer";
import { LoadingDimmer } from '../../utils/DimmerText';

function mapStateToProps(state) {
    return {};
}

class SlotDashboard extends Component {

    state = {
        loadingDimmer: true,
        active: false
    };

    onSlotListFetched = (slotList) => {
        let list = []
        for (const key in slotList) {
            const slot = slotList[key];
            slot['id'] = key
            list.push(slot)
        }

        this.setState({
            slotList: list,
            loadingDimmer: false
        })
    };

    onSlotDeleted = (id) => {
        this.setState({ active: true })
        delay(() => {
            this.setState({ active: false })
        }, 1000);
        // TODO cercare nello state l'id cancellato ed eliminarlo evitando una chiamata al DB
        getSlotCardList(this.onSlotListFetched);
    };

    renderSlot = () => {
        return this.state.slotList.map((slot) => (slot &&
            <Grid.Column>
                <AdminSlotCard slot={slot} key={slot.id} onDelete={this.onSlotDeleted}/>
            </Grid.Column>))
    };

    componentDidMount() {
        getSlotCardList(this.onSlotListFetched);
    }

    render() {
        const { slotList, active, loadingDimmer } = this.state;
        return (
            <div>
                <Dimmer blurring active={active} page>
                    <Header as='h2' icon inverted>
                        <Icon name='check' />
                        Slot cancellata con successo
                    </Header>
                </Dimmer>
                <LoadingDimmer active={loadingDimmer} />
                <AdminNavbar activeItem={ADMINPAGES.SLOT}/>
                <div style={{marginTop: '5rem', padding: '2rem'}}>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.LARGE}>
                        <Grid stackable columns={4}>
                            {slotList && this.renderSlot()}
                        </Grid>
                    </Responsive>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM} maxWidth={RESPONSIVE_RESOLUTION.LARGE}>
                        <Grid stackable columns={3}>
                            {slotList && this.renderSlot()}
                        </Grid>
                    </Responsive>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.SMALL} maxWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                        <Grid stackable columns={2}>
                            {slotList && this.renderSlot()}
                        </Grid>
                    </Responsive>
                    <Responsive maxWidth={RESPONSIVE_RESOLUTION.SMALL}>
                        <Grid stackable columns={1}>
                            {slotList && this.renderSlot()}
                        </Grid>
                    </Responsive>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SlotDashboard);
