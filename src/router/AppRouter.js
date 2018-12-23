import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from '../components/HomeComponents/HomePage'

// import AdminDashboard from './../admin/AdminDashboard';
// import AddSlot from '../admin/Slots/AddSlot';
// import AddBonus from '../admin/Bonus/AddBonus';
// import AddProducer from '../admin/Producer/AddProducer';
// import AddArticle from '../admin/AddArticle';
// import SlotPreview from '../admin/Slots/SlotPreview'
// import SlotDashboard from "../admin/Slots/SlotDashboard";
// import EditSlot from "../admin/Slots/EditSlot";
// import BonusDashboard from "../admin/Bonus/BonusDashboard"
// import AddExtraFromHtml from '../admin/Extra/AddExtraFromHtml'
// import BonusArticle from '../components/Extra/BonusArticle'
// import ProducerDashboard from "../admin/Producer/ProducerDashboard";
// import ExtraDashBoard from '../admin/Extra/ExtraDashboard'

import Test from './Test'
import SlotPage from '../components/SlotPageComponents/SlotPage';
import { PAGES, ROUTE } from "../enums/Constants";
import NotFound from "../components/NotFound"
import AboutPage from '../components/AboutPage'
import ProducerPage from "../components/ProducerComponents/ProducerPage";

import Article from '../components/Extra/Article'

const AppRouter = () => {

    return (
        <div className='matchParentHeight'>
            <Router>

                <Switch>
                    console.log(props.location);

                    { /* entry points  */}
                    <Route path={ROUTE.ROOT} component={HomePage} exact={true} page='HOME' />
                    <Route path={ROUTE.ABOUT} component={AboutPage} page={PAGES.ABOUT} />
                    <Route path={ROUTE.SLOT} component={SlotPage} page={PAGES.SLOT} />


                    { /* HOME filtered */}
                    <Route path={ROUTE.SLOT_ONLINE} component={HomePage} exact={true} page={PAGES.SLOT_ONLINE} />
                    <Route path={ROUTE.SLOT_GRATIS} component={HomePage} exact={true} page={PAGES.SLOT_GRATIS} />
                    <Route path={ROUTE.SLOT_BAR} component={HomePage} exact={true} page={PAGES.SLOT_BAR} />
                    <Route path={ROUTE.ARTICLE} component={HomePage} exact={true} page={PAGES.ARTICLE} />
                    <Route path={ROUTE.PRODUCER} component={ProducerPage} exact={true} page={PAGES.PRODUCER} />

                    <Route path={ROUTE.EXTRA} component={Article} />

                    { /* HOME filtered by producers */}
                    <Route path={ROUTE.PRODUCER} component={HomePage} />


                    { /*                  <Route path={ROUTE.ADMIN} component={AdminDashboard} exact={true} />
                    <Route path={ROUTE.ADMINSLOT} component={SlotDashboard} />
                    <Route path={ROUTE.ADMINBONUS} component={BonusDashboard} />
                    <Route path={ROUTE.ADMINPRODUCER} component={ProducerDashboard} />
                    <Route path={ROUTE.ADMINEXTRA} component={ExtraDashBoard} />
                    <Route path={ROUTE.ADMINSLOTPREVIEW} component={SlotPreview} />

                    <Route path={ROUTE.ADDSLOT} component={AddSlot} />
                    <Route path={ROUTE.ADDBONUS} component={AddBonus} />
                    <Route path={ROUTE.ADDPRODUCER} component={AddProducer} />
                    <Route path={ROUTE.ADDEXTRAFROMHTML} component={AddExtraFromHtml} />

                    <Route path={ROUTE.ADDARTICLE} render={() => <AddArticle editable={true} />} />
                    <Route path={ROUTE.EDITSLOT} component={EditSlot} />
                    <Route path={ROUTE.EDITBONUS} component={AddBonus} />
                    <Route path={ROUTE.EDITPRODUCER} component={AddProducer} />
                    <Route path={ROUTE.EDITEXTRA} component={AddExtraFromHtml} />


                    <Route path='/test' component={Test} /> */}

                    {/* Error */}
                    <Route path={ROUTE.ERROR404} component={NotFound} />
                    <Route path='*' component={NotFound} />
                </Switch>

            </Router>
        </div>
    );
};

export default AppRouter;
