import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminNavbar from "./AdminNavbar";
import { ADMINPAGES } from "../enums/Constants";
import { Responsive } from 'semantic-ui-react-single/Responsive';
import AddTipsList from './Slots/AddTipsList'


class AdminDashboard extends Component {
    state = {};

    handleClick = (childComponent) => {

    };

    render() {
        return (
            <Responsive>
                <AdminNavbar activeItem={ADMINPAGES.ADMIN} />
            </Responsive>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(AdminDashboard);
