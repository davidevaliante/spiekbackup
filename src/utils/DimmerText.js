import React from 'react';
import {Header} from "semantic-ui-react-single/Header";
import {Icon} from "semantic-ui-react-single/Icon";
import {Dimmer} from "semantic-ui-react-single/Dimmer";
import {Loader} from "semantic-ui-react-single/Loader";

export const InfoDimmer = ({active, icon, text}) => {
    // props.icon = error || check
    return (
        <Dimmer blurring active={active} page>
            <Header as='h2' icon inverted>
                <Icon name={icon}/>
                {text}
            </Header>
        </Dimmer>
    )
};

export const LoadingDimmer = ({active}) => {
    return (
        <Dimmer blurring active={active} page>
            <Header as='h2' icon inverted>
                <Loader />
            </Header>
        </Dimmer>
    )
};