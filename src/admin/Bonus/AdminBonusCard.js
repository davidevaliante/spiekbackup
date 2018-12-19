import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react-single/Button'
import { Icon } from 'semantic-ui-react-single/Icon'
import { Divider } from 'semantic-ui-react-single/Divider'
import { Grid } from 'semantic-ui-react-single/Grid'
import { List } from 'semantic-ui-react-single/List'
import { Image } from 'semantic-ui-react-single/Image'
import { NavLink } from 'react-router-dom'
import truncate from "lodash/truncate";
import { deleteBonusWithId } from "../../firebase/delete";
import { setToUpdate } from "../../reducers/ToUpdateReducer";
import { getImageLinkFromName } from "../../utils/Utils";
import Parser from "html-react-parser";
import { Container } from 'semantic-ui-react-single/Container'
import { height } from 'window-size';

function mapStateToProps(state) {
    return {};
}

class AdminBonusCard extends Component {
    state = {};

    deleteBonus = (id) => {
        deleteBonusWithId(id,
            () => {
                // callback alla dashboard per aggiornare la lista mostrata
                this.props.onDelete(id)
            })
    };

    render() {
        return (
            <Container style={{ marginTop: 35 }}>
                <List relaxed='very'   >
                    <List.Item key={this.props.key} style={{
                        border: '1px solid rgb(0, 0, 0, .2)',
                        borderRadius: '0.3rem',
                        padding: '0.3rem',
                        height: 520,



                    }}>
                        {/*<Image className='icon slot-card-image' src={this.props.slot.image} size='mini'/>*/}

                        <List.Content  >
                            <List.Header as='p'>{this.props.bonus.name}</List.Header>
                            <List.Description as='p' verticalAlign="midle" size="large" >

                                <List.Item style={{ height: 170 }} >
                                    {Parser(truncate(this.props.bonus.review, { 'length': 150 }))}
                                </List.Item>
                                {/*{truncate(Parser(`${this.props.bonus.review}`), { 'length': 175 })}*/}
                                <List> <List.Icon name='github' size='large' verticalAlign='middle' /></List>
                                <Divider style={{ marginTop: "0.3rem" }} />

                                <div style={{ height: 150 }}  >

                                    <Image style={{ objectFit: 'cover' }} src={getImageLinkFromName('bonus', this.props.bonus.name, 'medium')} />
                                </div>
                                <Divider />
                                <Icon name='star' />
                                {this.props.bonus.rating}
                            </List.Description>
                            <Divider />
                            <Grid stackable columns={1}>
                                <Grid.Column>
                                    <NavLink to={`/admin/editbonus/${this.props.bonus.id}`}>
                                        <Button icon labelPosition='left' size='mini'>
                                            <Icon name='edit outline' />Modifica
                                            </Button>
                                    </NavLink>
                                    <Button icon labelPosition='left' size='mini' floated='right' negative
                                        onClick={() => this.deleteBonus(this.props.bonus.id)}>
                                        <Icon name='delete' />Cancella
                                    </Button>
                                </Grid.Column>
                            </Grid>

                        </List.Content>
                    </List.Item>
                </List>
            </Container>

        )

    };
}

export default connect(mapStateToProps)(AdminBonusCard);