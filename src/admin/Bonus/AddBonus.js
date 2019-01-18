import React, { Component } from 'react';
import filter from 'lodash/filter';
import delay from 'lodash/delay'
import { Button } from 'semantic-ui-react-single/Button'
import { Form } from 'semantic-ui-react-single/Form'
import { Input } from 'semantic-ui-react-single/Input'
import { Dropdown } from 'semantic-ui-react-single/Dropdown'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { Header } from 'semantic-ui-react-single/Header'
import { Icon } from 'semantic-ui-react-single/Icon'
import { Checkbox } from 'semantic-ui-react-single/Checkbox'
import PastedHtml from '../Extra/PastedHtml'
import ImagePicker from '../ImagePicker';
import { updateBonusWithId } from '../../firebase/update'
import { ADMINPAGES } from "../../enums/Constants";
import { getBonusWithGuide } from '../../firebase/get'
import AdminNavbar from "../AdminNavbar";
import RichEdit from "../Extra/RichEdit";
import { getImageLinkFromName } from "../../utils/Utils";
import { pushNewBonuswithGuide } from '../../firebase/post'
import { Divider } from 'semantic-ui-react-single/Divider'
import { SketchPicker } from 'react-color';

class AddBonus extends Component {

    state = {
        isInEditMode: false,
        shouldDisplayErrors: false,
        emptyFields: [],
        submitBtn: 'Aggiungi',
        guideInputMode: 'manualGuideInput'
    };

    ratingStateOptions = [
        { key: 'uno', value: '1', text: '1' },
        { key: 'due', value: '2', text: '2' },
        { key: 'tre', value: '3', text: '3' },
        { key: 'quattro', value: '4', text: '4' },
        { key: 'cinque', value: '5', text: '5' },

    ];

    componentDidMount() {
        if (this.props.match.params.bonusid) {
            getBonusWithGuide(this.props.match.params.bonusid, 'it',
                // callback
                (bonus, guide) => {
                    console.log(bonus.data)
                    console.log(guide.data)



                    this.setState({
                        isInEditMode: true,
                        bonusToEdit: bonus.data,
                        defaultRating: bonus.data.rating,
                        currentGuideValue: guide.data && guide.data.content,
                        guideInputMode: 'pastedGuideInput',
                        bonusGuideId: bonus.data.guideId,
                        submitBtn: 'Modifica',
                        noDepositText : bonus.data.noDepositText,
                        withDepositText : bonus.data.withDepositText,
                        tips : bonus.data.tips,
                        borderColor : bonus.data.borderColor,
                        bonusImageBg : bonus.data.bonusImageBg

                    })

                    console.log(this.state.bonusToEdit)
                    document.getElementById('pastedHtml').value = guide.data ? guide.data.content : ''
                }
            )
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.bonusid !== this.props.match.params.bonusid) {
            this.setState({
                bonusToEdit: undefined,
                isInEditMode: false,
                shouldDisplayErrors: false,
                submitBtn: 'Aggiungi',
            })
        }
    }

    onDropDownChange = (data) => {
        this.setState({
            ...this.state,
            rating: data.value
        })
    };

    buildFakeSlot = () => {
        document.getElementById('nameField').value = `Bonus Esempio numero ${Math.floor(Math.random() * 100)}`;
        document.getElementById('welcomeBonusField').value = `${Math.floor(Math.random() * 4) * 10} SENZA DEPOSITO + 30 FREE SPIN + 300€`;
        document.getElementById('linkField').value = "https://youtu.be/G4VAdWJXyFk?list=RDG4VAdWJXyFk";

        this.setState({
            ...this.state,
            rating: Math.floor(Math.random() * 6)
        });
    };

    submitNewBonus = () => {
        const { isInEditMode } = this.state
        // resetta quali sono i field vuoti errori
        this.setState({ shouldDisplayErrors: false, emptyFields: [] });

        const name = document.getElementById('nameField').value.trim();
        if (!name) {
            let errorList = this.state.emptyFields;
            errorList.push('name');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }

        const bonus = document.getElementById('welcomeBonusField').value.trim();
        if (!bonus) {
            let errorList = this.state.emptyFields;
            errorList.push('bonus');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }

        const link = document.getElementById('linkField').value.trim();
        if (!link) {
            let errorList = this.state.emptyFields;
            errorList.push('link');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }

        let rating = this.state.rating;
        if (!rating && !this.state.isInEditMode) {
            let errorList = this.state.emptyFields;
            errorList.push('rating');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        } else {
            if (this.state.isInEditMode)
                rating = this.state.bonusToEdit.rating
            else
                rating = this.state.rating
        }

        let htmlTextString = ''
        if (this.state.guideInputMode === 'manualGuideInput')
            htmlTextString = document.getElementById('htmlText').value.trim()
        if (this.state.guideInputMode === 'pastedGuideInput')
            htmlTextString = document.getElementById('pastedHtml').value.trim()

        const noDepositText = document.getElementById('noDepositText').value.trim()
        const withDepositText = document.getElementById('withDepositText').value.trim()
        const tips = document.getElementById('tips').value.trim()
        if (name && bonus && link && rating) {
            const newBonus = {
                name: name,
                bonus: bonus,
                rating: rating,
                link: link,
                guideId: this.state.bonusGuideId,
                noDepositText : noDepositText,
                withDepositText : withDepositText,
                tips : tips,
                borderColor : this.state.borderColor,
                bonusImageBg : this.state.bonusImageBg
            }

            const imageData = this.state.pickedImage;
            const internalImageData = this.state.internalPickedImage;
            const circularImageData = this.state.circularImage

            console.log(imageData);
            console.log(internalImageData);


            if (!isInEditMode)
                pushNewBonuswithGuide(newBonus, imageData, htmlTextString, internalImageData, circularImageData, 'it', this.onBonusPushSuccess)
            else
                updateBonusWithId(this.props.match.params.bonusid, newBonus, imageData, htmlTextString, internalImageData,circularImageData, this.onBonusPushSuccess)
        }
    };

    colorBackGroundPicked = (color) => {
        this.setState({bonusImageBg : color.hex})
    }

    colorBorderPicked = (color) => {
        this.setState({borderColor : color.hex})
    }

    resetErrorOn = (fieldName) => {
        const updated = filter(this.state.emptyFields, (field) => field !== fieldName);
        this.setState({ emptyFields: updated });
    };

    onBonusPushSuccess = () => {
        this.setState({ active: true })
        delay(() => {
            this.setState({ active: false })
        }, 800)
    };

    onProducerSelected = (producer) => {
        this.setState({ producer: producer })
    };

    onImageSelected = (image) => {
        this.setState({
            // variabile per l'immagine esterna
            pickedImage: image
        })
    };

    onInternalImageSelected = (image) => {
        console.log('internal picked');

        this.setState({
            // variabile per l'immagine esterna
            internalPickedImage: image
        })
    };

    onCircularImageSelected = (image) => {
        console.log('circular picked');

        this.setState({
            // variabile per l'immagine esterna
            circularImage: image
        })
    };

    handleOpen = () => this.setState({ active: true });
    handleClose = () => this.setState({ active: false });
    handleGuideInputMode = (e, { value }) => this.setState({ guideInputMode: value })

    render() {
        const { active } = this.state;
        const { bonusToEdit, isInEditMode } = this.state;
        let guideInputisManual = true
        if (this.state.guideInputMode === 'manualGuideInput')
            guideInputisManual = true
        if (this.state.guideInputMode === 'pastedGuideInput')
            guideInputisManual = false
        console.log(this.state);

        return (
            <div>
                <AdminNavbar activeItem={ADMINPAGES.BONUS} />
                <div
                    style={{ padding: '5.5rem' }}>
                    <Dimmer active={active} onClickOutside={this.handleClose} page>
                        <Header as='h2' icon inverted>
                            <Icon name='check' />
                            {isInEditMode ? 'Modificato' : 'Aggiunto'} con successo
                        </Header>
                    </Dimmer>

                    <h1
                        style={{
                            color: 'black',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                        Nuovo Bonus
                    </h1>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                id='nameField'
                                error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('name')}
                                control={Input}
                                defaultValue={bonusToEdit && bonusToEdit.name}
                                onChange={() => this.resetErrorOn('name')}
                                label='Nome Bonus'
                                placeholder='Nome Bonus'>
                            </Form.Field>

                        </Form.Group>

                        <Form.Group
                            widths='equal'>
                            <Form.Field
                                id='welcomeBonusField'
                                error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('bonus')}
                                control={Input}
                                onChange={() => this.resetErrorOn('bonus')}
                                defaultValue={bonusToEdit && bonusToEdit.bonus}
                                label='Testo genera'
                                placeholder='Esempio : Bonus di benvenuto' />

                            <Form.Field
                                id='linkField'
                                error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('link')}
                                control={Input}
                                onChange={() => this.resetErrorOn('link')}
                                label='Link del bonus'
                                defaultValue={bonusToEdit && bonusToEdit.link}
                                placeholder='Copia ed incolla qui' />
                        </Form.Group>

                        <Divider style={{marginTop :'2%', marginBottom : '2%'}}/>

                        <h2
                            style={{
                                color: 'black',
                                marginBottom: '2rem',
                                textAlign: 'center'
                            }}>
                            Campi Aggiuntivi
                        </h2>


                        <Form.Group
                            widths='equal'>
                            <Form.Field
                                id='withDepositText'
                                control={Input}
                                label='Con Deposito'
                                defaultValue={bonusToEdit && bonusToEdit.withDepositText}
                                placeholder='Inserisci testo'
                            />
                            <Form.Field
                                id='noDepositText'
                                control={Input}
                                label='Senza Deposito'
                                defaultValue={bonusToEdit && bonusToEdit.noDepositText}
                                placeholder='Inserisci testo'
                            />

                            <Form.Field
                                id='tips'
                                control={Input}
                                label='Consigli (max 3) con suffisso @'
                                defaultValue={bonusToEdit && bonusToEdit.tips}
                                placeholder='@info 1 @info 2 @info 3'
                            />

                        </Form.Group>

                        <Divider style={{marginTop :'2%', marginBottom : '2%'}}/>


                        <h2
                            style={{
                                color: 'black',
                                marginBottom: '2rem',
                                textAlign: 'center'
                            }}>
                            Guida (opzionale)
                        </h2>

                        <Form.Group inline style={{ marginBottom: '2rem' }}>
                            <Checkbox
                                style={{ marginRight: '3rem' }}
                                radio
                                label='Inserisci guida manualmente'
                                name='checkboxRadioGroup'
                                value='manualGuideInput'
                                checked={guideInputisManual}
                                onChange={this.handleGuideInputMode}
                            />
                            <Checkbox
                                radio
                                label='Copia e incolla html'
                                name='checkboxRadioGroup'
                                value='pastedGuideInput'
                                checked={!guideInputisManual}
                                onChange={this.handleGuideInputMode}
                            />
                        </Form.Group>
                        {(!isInEditMode && guideInputisManual) && <RichEdit />}
                        {(isInEditMode && guideInputisManual) && <RichEdit defaultContent={this.state.defaultReview} />}
                        {((!isInEditMode && !guideInputisManual) && <PastedHtml />)}
                        {((isInEditMode && !guideInputisManual) && <PastedHtml defaultValue={this.state.currentGuideValue} />)}

                        <Divider style={{marginTop :'2%', marginBottom : '2%'}}/>


                        <h2
                            style={{
                                color: 'black',
                                marginBottom: '2rem',
                                textAlign: 'center'
                            }}>
                           Rating
                        </h2>
                            <Form.Field style={{width : '33%', marginTop : '2%'}}>
                                {(this.state.defaultRating && isInEditMode) &&
                                <Dropdown
                                    id='ratingField'
                                    error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('rating')}
                                    style={{ marginBottom: '1rem' }}
                                    placeholder='Ok'
                                    onChange={(event, data) => this.onDropDownChange(data)}
                                    selection
                                    defaultValue={this.state.defaultRating}
                                    options={this.ratingStateOptions} />
                                }
                                {!isInEditMode &&
                                <Dropdown
                                    id='ratingField'
                                    error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('rating')}
                                    style={{ marginBottom: '1rem' }}
                                    placeholder='Rating'
                                    onChange={(event, data) => this.onDropDownChange(data)}
                                    selection
                                    options={this.ratingStateOptions} />
                                }
                            </Form.Field>


                        <Divider style={{marginTop :'2%', marginBottom : '2%'}}/>


                        {/* EDIT EDIT EDIT EDIT EDIT EDIT EDIT EDITEDIT EDIT EDIT EDITEDIT EDIT EDIT EDIT */}

                        <h2
                            style={{
                                color: 'black',
                                marginBottom: '2rem',
                                textAlign: 'center'
                            }}>
                            Immagini
                        </h2>
                            {(this.state.bonusToEdit && isInEditMode) &&
                            <Form.Group
                                style={{ marginTop: '2rem' }}
                                widths='equal'>

                                <Form.Field>
                                    {/* edit bonus */}
                                    <ImagePicker
                                        imageType = 'imagePicker'
                                        buttonMessage={'Aggiungi foto esterna'}
                                        onImageSelected={this.onImageSelected}
                                        style={{ width: '100%', marginLeft: '2rem' }}
                                        imagePreview={getImageLinkFromName('bonus', this.state.bonusToEdit.name)} />
                                </Form.Field>

                                <Form.Field>
                                    <ImagePicker
                                        imageType = 'bonusInternalPicker'
                                        buttonMessage={'Aggiungi foto interna'}
                                        onImageSelected={this.onInternalImageSelected}
                                        style={{ width: '100%', marginLeft: '2rem' }}
                                        imagePreview={getImageLinkFromName('bonusInternal', this.state.bonusToEdit.name)} />
                                </Form.Field>
                                <Form.Field>
                                    <ImagePicker
                                        imageType = 'circularImage'
                                        buttonMessage={'Aggiungi foto per immagine circolare'}
                                        onImageSelected={this.onCircularImageSelected}
                                        style={{ width: '100%', marginLeft: '2rem' }}
                                        imagePreview={getImageLinkFromName('bonus_circular', this.state.bonusToEdit.name)} />
                                </Form.Field>
                            </Form.Group>}

                            {!isInEditMode &&
                            <Form.Group widths='equal'>
                                {/* add bonus normale */}
                                <Form.Field>
                                    <ImagePicker
                                        imageType = 'imagePicker'
                                        buttonMessage={'Aggiungi foto esterna'}
                                        onImageSelected={this.onImageSelected}
                                        style={{ width: '100%', marginLeft: '2rem' }} />
                                </Form.Field>

                                <Form.Field>
                                    <ImagePicker
                                        imageType = 'bonusInternalPicker'
                                        // bonusInternalImage={true}
                                        buttonMessage={'Aggiungi foto interna'}
                                        onImageSelected={this.onInternalImageSelected}
                                        style={{ width: '100%', marginLeft: '2rem' }}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <ImagePicker
                                        imageType = 'circularImage'
                                        buttonMessage={'Aggiungi foto per immagine circolare'}
                                        onImageSelected={this.onCircularImageSelected}
                                        style={{ width: '100%', marginLeft: '2rem' }}
                                    />
                                </Form.Field>
                            </Form.Group>}


                        <Divider style={{marginTop :'2%', marginBottom : '2%'}}/>


                        <h2
                            style={{
                                color: 'black',
                                marginBottom: '2rem',
                                textAlign: 'center'
                            }}>
                            Links
                        </h2>
                        <Form.Field
                            id='linkField'
                            error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('link')}
                            control={Input}
                            onChange={() => this.resetErrorOn('link')}
                            label='Link del bonus'
                            defaultValue={bonusToEdit && bonusToEdit.link}
                            placeholder='Copia ed incolla qui' />


                        <Divider style={{marginTop :'2%', marginBottom : '2%'}}/>
                        <h2
                            style={{
                                color: 'black',
                                marginBottom: '2rem',
                                textAlign: 'center'
                            }}>
                            Colori
                        </h2>
                        <Form.Group>
                            <Form.Field
                                color={this.state.bonusImageBg}
                                style={{marginLeft : '2%'}}
                                control={SketchPicker}
                                onChangeComplete={ this.colorBackGroundPicked }
                                label='Colore sfondo Bonus Speciale'>
                            </Form.Field>

                            <Form.Field
                                color={this.state.borderColor}
                                control={SketchPicker}
                                onChangeComplete={ this.colorBorderPicked }
                                label='Colore Cerchio immagine del bonus speciale'>
                            </Form.Field>
                        </Form.Group>



                        <Form.Field
                            style={{ width: '100%' }}
                            onClick={this.submitNewBonus}
                            control={Button}>
                            {this.state.submitBtn}
                        </Form.Field>



                        {/* <Form.Field
                            onClick={this.buildFakeSlot}
                            control={Button}>
                            Aggiungi Bonus Finto
                        </Form.Field> */}
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddBonus;
