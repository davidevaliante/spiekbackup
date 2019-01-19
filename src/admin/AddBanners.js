import React , {Component} from 'react'
import AdminNavbar from './AdminNavbar'
import {ADMINPAGES} from "../enums/Constants";
import { Button } from 'semantic-ui-react-single/Button'
import { Form } from 'semantic-ui-react-single/Form'
import { Input } from 'semantic-ui-react-single/Input'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { Header } from 'semantic-ui-react-single/Header'
import { Icon } from 'semantic-ui-react-single/Icon'
import {Divider} from 'semantic-ui-react-single/Divider'
import {Grid} from 'semantic-ui-react-single/Grid'
import {updateBanners} from "../firebase/post";
import {getBanners} from "../firebase/get";

class AddBanners extends Component {

    // http://www.starvegasaffiliate.it/affiliate/banner/64/Italian/Special Sizes/SVit_bookofradeluxe_fdb_db_240x360.gif

    state = {
        dimmerIsActive : false
    };

    componentDidMount() {
        getBanners(banners => {
            console.log(banners);


            if (banners.firstBanner.length !== 0) document.getElementById('firstBanner').value = banners.firstBanner;
            if (banners.secondBanner.length !== 0) document.getElementById('secondBanner').value = banners.secondBanner;
            if (banners.thirdBanner.length !== 0)document.getElementById('thirdBanner').value = banners.thirdBanner;
            if(banners.firstBannerLink.length !== 0) document.getElementById('firstBannerClick').value = banners.firstBannerLink;
            if(banners.secondBannerLink.length !== 0) document.getElementById('secondBannerClick').value = banners.secondBannerLink;
            if(banners.thirdBannerLink.length !== 0) document.getElementById('thirdBannerClick').value = banners.thirdBannerLink
        })
    }

    updateBanners = () => {
        const firstBanner = document.getElementById('firstBanner').value.trim();
        const secondBanner = document.getElementById('secondBanner').value.trim();
        const thirdBanner = document.getElementById('thirdBanner').value.trim();
        const firstBannerLink = document.getElementById('firstBannerClick').value.trim();
        const secondBannerLink = document.getElementById('secondBannerClick').value.trim();
        const thirdBannerLink = document.getElementById('thirdBannerClick').value.trim();

        const banners = {
            firstBanner : firstBanner,
            secondBanner : secondBanner,
            thirdBanner : thirdBanner,
            firstBannerLink : firstBannerLink,
            secondBannerLink : secondBannerLink,
            thirdBannerLink : thirdBannerLink
        };

        this.setState({dimmerIsActive : true});
        updateBanners(banners, success => {
            this.setState({dimmerIsActive : false})
        }, error => {
            console.log(error)
        })

    };


    render(){
        const {dimmerIsActive} = this.state;
        return (
            <div>
            <AdminNavbar activeItem={ADMINPAGES.BANNERS} />
                <div style={{ padding: '5.5rem' }}>
                    <Form>
                        <this.SuccessDimmer isActive={dimmerIsActive}/>
                        <this.Header />
                        <this.BannerInput />
                        <Form.Field
                            color={'blue'}
                            style={{ width: '100%' }}
                            onClick={this.updateBanners}
                            control={Button}>
                            Conferma
                        </Form.Field>
                    </Form>
                </div>
            </div>
        )
    }

    Header = () =>
        <h2
            style={{
                color: 'black',
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
            Gestisci i banner
        </h2>;


    SuccessDimmer = (props) =>
        <Dimmer blurring active={props.isActive} onClickOutside={this.handleClose} page>
            <Header as='h2' icon inverted>
                <Icon name='check' />
                Banner Aggiornati con successo
            </Header>
        </Dimmer>;

    BannerInput = (props) =>
        <div style={{marginBottom : '3rem'}}>
            <div>
                <h3
                    style={{
                        color: 'black',
                        marginTop : '3rem',
                        marginBottom: '3rem',
                        textAlign: 'center'
                    }}>
                    Banner sopra slot popolari
                </h3>
                <Form.Group widths={'equal'}>
                    <Form.Field
                        id='firstBanner'
                        control={Input}
                        label='Link Immagine Banner sopra Slot Popolari'
                        placeholder='Inserisci Link del banner'>
                    </Form.Field>
                    <Form.Field
                        id='firstBannerClick'
                        control={Input}
                        label='Link per il click Banner slot popolari'
                        placeholder='Inserisci Link del click'>
                    </Form.Field>
                </Form.Group>
                <Divider />
            </div>

            <div>
                <h3
                    style={{
                        color: 'black',
                        marginTop : '3rem',
                        marginBottom: '3rem',
                        textAlign: 'center'
                    }}>
                    Banner sopra lista slot
                </h3>
                <Form.Group widths={'equal'}>
                    <Form.Field
                        id='secondBanner'
                        control={Input}
                        label='Link Immagine Banner sopra lista Slot'
                        placeholder='Inserisci Link del banner'>
                    </Form.Field>
                    <Form.Field
                        id='secondBannerClick'
                        control={Input}
                        label='Link per il click Banner lista slot'
                        placeholder='Inserisci Link del click'>
                    </Form.Field>
                </Form.Group>
                <Divider />
            </div>

            <div>
                <h3
                    style={{
                        color: 'black',
                        marginTop : '3rem',
                        marginBottom: '3rem',
                        textAlign: 'center'
                    }}>
                    Banner sotto ai bonus
                </h3>
                <Form.Group widths={'equal'}>
                    <Form.Field
                        id='thirdBanner'
                        control={Input}
                        label='Link Immagine Banner sotto ai bonus'
                        placeholder='Inserisci Link del banner'>
                    </Form.Field>
                    <Form.Field
                        id='thirdBannerClick'
                        control={Input}
                        label='Link per il click Banner sotto ai bonus'
                        placeholder='Inserisci Link del click'>
                    </Form.Field>
                </Form.Group>
                <Divider />
            </div>
        </div>



}

export default AddBanners