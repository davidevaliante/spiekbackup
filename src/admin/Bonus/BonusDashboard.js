import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react-single/Grid'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { getBonusList } from "../../firebase/get";
import AdminBonusCard from "./AdminBonusCard";
import AdminNavbar from "../../admin/AdminNavbar";
import { ADMINPAGES, RESPONSIVE_RESOLUTION } from "../../enums/Constants";
import delay from 'lodash/delay';
import { LoadingDimmer, InfoDimmer } from '../../utils/DimmerText';

function mapStateToProps(state) {
    return {};
}

class BonusDashboard extends Component {

    state = {
        loadingDimmer: true,
        active: false
    };

    onBonusListFetched = (bonusList) => {
        let list = []
        for (const key in bonusList) {
            const bonus = bonusList[key];
            bonus['id'] = key
            list.push(bonus)
        }

        this.setState({
            bonusList: list,
            loadingDimmer: false
        })
    };

    onBonusDeleted = (id) => {
        this.setState({ active: true })
        delay(() => {
            this.setState({ active: false })
        }, 1000);
        // TODO cercare nello state l'id cancellato ed eliminarlo evitando una chiamata al DB
        getBonusList(this.onBonusListFetched);
    };

    renderItem = () => {
        return this.state.bonusList.map((bonus) => (bonus &&
            <Grid.Column>
                <AdminBonusCard key={bonus.id} bonus={bonus} onDelete={this.onBonusDeleted} />
            </Grid.Column>))
    };

    componentDidMount() {
        getBonusList(this.onBonusListFetched);
    };

    render() {
        const { bonusList, active, loadingDimmer } = this.state
        return (
            <div>
                <InfoDimmer active={active} text='Bonus cancellato con successo' icon='check'/>
                <LoadingDimmer active={loadingDimmer}/>
                <AdminNavbar activeItem={ADMINPAGES.BONUS} />
                <div style={{marginTop: '5rem', padding: '2rem'}}>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.LARGE}>
                        <Grid stackable columns={4}>
                            {bonusList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM} maxWidth={RESPONSIVE_RESOLUTION.LARGE}>
                        <Grid stackable columns={3}>
                            {bonusList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.SMALL} maxWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                        <Grid stackable columns={2}>
                            {bonusList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive maxWidth={RESPONSIVE_RESOLUTION.SMALL}>
                        <Grid stackable columns={1}>
                            {bonusList && this.renderItem()}
                        </Grid>
                    </Responsive>
                </div>
            </div>

        );
    }
}

export default connect(mapStateToProps)(BonusDashboard);


