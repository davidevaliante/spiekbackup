import React from "react";
import { Radio } from "semantic-ui-react-single/Radio";
import { Button } from 'semantic-ui-react-single/Button';
import { Form } from 'semantic-ui-react-single/Form';
import { Input } from 'semantic-ui-react-single/Input';
import { Dropdown } from 'semantic-ui-react-single/Dropdown';
import { FormField } from 'semantic-ui-react-single/Form';
import SearchField from "../SearchField";
import SearchMultipleSelection from "../SearchMultipleSelection";
import ImagePicker from "../ImagePicker";
import { getSlotWithId } from "../../firebase/get";
import { ADMINPAGES, SLOT_TYPES } from '../../enums/Constants';
import { updateSlotWithId } from '../../firebase/update';
import { getBonusList } from '../../firebase/get';
import forEach from 'lodash/forEach'
import keys from 'lodash/keys'
import delay from 'lodash/delay'
import { TextArea } from "semantic-ui-react-single/TextArea";
import { replaceTextTips, replaceTextTec, getImageLinkFromName } from "../../utils/Utils";
import AdminNavbar from "../AdminNavbar";
import { Header } from "semantic-ui-react-single/Header";
import { Icon } from "semantic-ui-react-single/Icon";
import { Dimmer } from "semantic-ui-react-single/Dimmer";
import { Menu } from 'semantic-ui-react-single/Menu'
import RichEdit from "../Extra/RichEdit";
import upperCase from 'lodash/upperCase'


class EditSlot extends React.Component {
    state = {
        isInCopyPasteMode: false,
        currentSlot: {},
        ratingStateOptions: [
            { key: 'uno', value: '1', text: '1' },
            { key: 'due', value: '2', text: '2' },
            { key: 'tre', value: '3', text: '3' },
            { key: 'quattro', value: '4', text: '4' },
            { key: 'cinque', value: '5', text: '5' },
        ],
        isPopularOptions: [
            { key: 'uno', value: 'true', text: 'Vero' },
            { key: 'due', value: 'false', text: 'False' },
        ],
        slotTypeOptions: [
            { key: 'one', value: SLOT_TYPES.BAR, text: 'Slot da bar' },
            { key: 'two', value: SLOT_TYPES.GRATIS, text: 'Slot gratis' },
        ],
        shouldDisplayErrors: false,
        emptyFields: [],
        list: "",
        selectedBonus: {},
        active: false,
        isPopular: false
    };


    componentDidMount() {
        getSlotWithId(this.props.match.params.id, (slot) => {

            let options = [];
            getBonusList(list => {
                let counter = 1
                for (const key in list) {
                    options.push({ key: `${key}`, value: `${counter}`, text: `${list[key].name}` })
                    counter++
                }
                const k = keys(slot.bonus)

                let def = []
                // valori default per l'edit
                forEach(k, (element) => {
                    forEach(options, (e, i) => {
                        if (e.key === element) def.push((i + 1).toString())
                    })
                })


                this.setState({
                    currentSlotId: this.props.match.params.id,
                    currentSlot: slot,
                    defaultType: slot.type,
                    defaultRating: slot.rating,
                    defaultValuesForBonus: def,
                    optionList: options,
                    firebaseBonusObject: slot.bonus,
                    selectedBonus: slot.bonus,
                    currentDescription: slot.description,
                    isPopular: slot.isPopular
                })
            })


        })
    }

    onProducerSelected = (selectedProducer) => {
        this.setState({ selectedProducer: selectedProducer })
        console.log(selectedProducer);
    }
    onImageSelected = (image) => {
        this.setState({ image: image, imageName: image.name })
    }

    onTypeChanged = (data) => {
        this.setState({ type: data.value })
    }

    onRatingChanged = (data) => {
        this.setState({ rating: data.value })
    }

    onBonusSelected = (selectedBonus) => {
        console.log(selectedBonus);

        this.setState({ selectedBonus: selectedBonus })
    }

    switchCopyPasteMode = () => {
        this.setState({
            isInCopyPasteMode: !this.state.isInCopyPasteMode

        })
    }

    handleTipsCopyMode = data => {

        const textIn = data.value

        const b = replaceTextTips(textIn)
        this.setState({ currentSlot: { ...this.state.currentSlot, tips: b } })
    }
    handleTecnicalsCopyMode = data => {
        const textIn = data.value
        const b = replaceTextTec(textIn)
        this.setState({ currentSlot: { ...this.state.currentSlot, tecnicals: b } })
    }


    handleTipsChange = newValue => {


        this.setState({ currentSlot: { ...this.state.currentSlot, tips: newValue.value } })
    }
    handleTecnicalsChange = data => {

        this.setState({ currentSlot: { ...this.state.currentSlot, tecnicals: data.value } })
    }
    handleDescriptionChange = (data) => {
        this.setState({ currentSlot: { ...this.state.currentSlot, description: data.value } })
    }

    onPopularSelected = value => {
        if (value.value === "true") {
            this.setState({ isPopular: true })
        } else {
            this.setState({ isPopular: false })
        }
    }

    submitEditSlot = () => {
        const name = upperCase(document.getElementById('nameField').value.trim());
        if (!name) {
            let errorList = this.state.emptyFields;
            errorList.push('name');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const linkYoutube = document.getElementById('linkYoutube').value.trim();
        if (!linkYoutube) {
            let errorList = this.state.emptyFields;
            errorList.push('linkYoutube');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const linkPlay = document.getElementById('linkPlay').value.trim();
        if (!linkPlay) {
            let errorList = this.state.emptyFields;
            errorList.push('linkPlay');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const description = document.getElementById('htmlText').value.trim();
        if (!description) {
            let errorList = this.state.emptyFields;
            errorList.push('description');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }


        const tipsField = document.getElementById('tipsField').value.trim();
        if (!tipsField) {
            let errorList = this.state.emptyFields;
            errorList.push('tips');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const tecnicalsField = document.getElementById('tecnicalsField').value.trim();
        if (!tecnicalsField) {
            let errorList = this.state.emptyFields;
            errorList.push('tecnicals');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        let BONUS = this.state.selectedBonus

        let producer = this.state.selectedProducer
        if (!producer) {
            producer = this.state.currentSlot.producer
        }
        let rating = this.state.rating;
        if (!rating) {
            rating = this.state.currentSlot.rating
        }
        let type = this.state.type;
        if (!type) {
            type = this.state.currentSlot.type
        }

        const updatedSlot = {
            name: name,
            producer: producer,
            linkYoutube: linkYoutube,
            linkPlay: linkPlay,
            bonus: BONUS,
            description: description,
            rating: rating,
            tips: tipsField,
            tecnicals: tecnicalsField,
            type: type,
            isPopular: this.state.isPopular ? this.state.isPopular : false
        }

        const image = this.state.image
        const slotId = this.props.match.params.id

        console.log(updatedSlot);

        if (name && producer && linkYoutube && linkPlay && BONUS && description && rating && tipsField && tecnicalsField && updatedSlot.type) {
            updateSlotWithId(slotId, updatedSlot, image, this.onSuccess)
        }

    };

    onSuccess = () => {
        this.setState({ active: true })
        delay(() => {
            this.setState({ active: false })
        }, 800)
    };

    handleOpen = () => this.setState({ active: true });
    handleClose = () => this.setState({ active: false });

    render() {

        const { currentSlot, active, isPopularOptions } = this.state
        const { producer } = this.state.currentSlot
        console.log(currentSlot.description)

        return (
            <div>
                <AdminNavbar activeItem={ADMINPAGES.SLOT} />
                <div
                    style={{ padding: '4rem' }}>
                    <Dimmer active={active} onClickOutside={this.handleClose} page>
                        <Header as='h2' icon inverted>
                            <Icon name='check' />
                            Modificato con successo
                        </Header>
                    </Dimmer>
                    <h1
                        style={{
                            color: 'black',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                        Modifica Slot
                    </h1>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                id='nameField'
                                defaultValue={currentSlot.name}
                                control={Input}
                                label='Nome'
                                placeholder='Nome slot...'>
                            </Form.Field>

                            <Form.Field>
                                <label>Produttore</label>
                                <SearchField
                                    id='producerField'
                                    onSelected={this.onProducerSelected}
                                    nodename='Produttore'
                                    placeholder={producer ? producer.name : 'Nome produttore...'}
                                />
                            </Form.Field>
                        </Form.Group>

                        <Form.Group
                            widths='equal'>
                            <Form.Field
                                id='linkYoutube'
                                defaultValue={currentSlot.linkYoutube}
                                control={Input}
                                label='YouTube Link'
                                placeholder='YouTube Link...' />
                            <Form.Field
                                id='linkPlay'
                                defaultValue={currentSlot.linkPlay}
                                control={Input}
                                label='Slot Link'
                                placeholder='Slot Play Link...' />
                        </Form.Group>

                        <h1
                            style={{
                                color: 'black',
                                marginBottom: '2rem',
                                textAlign: 'center'
                            }}>
                            Liste
                        </h1>


                        <Form.Group>
                            <Radio
                                label="CopyMode"
                                id='copyPasteMode'
                                onChange={this.switchCopyPasteMode}
                                style={{ marginLeft: '1rem' }}
                                toggle />
                        </Form.Group>
                        <Form.Group
                            widths='equal'>

                            <Form.Field
                                id='tipsField'
                                value={currentSlot.tips}

                                onChange={(event, data) => this.state.isInCopyPasteMode ? this.handleTipsCopyMode(data) : this.handleTipsChange(data)}


                                rows={10}
                                control={TextArea}
                                label='Consigli'
                                placeholder='Consigli...'

                            />
                            <Form.Field
                                id='tecnicalsField'
                                value={currentSlot.tecnicals}

                                onChange={(event, data) => this.state.isInCopyPasteMode ? this.handleTecnicalsCopyMode(data) : this.handleTecnicalsChange(data)}

                                rows={10}
                                control={TextArea}
                                label='Scheda Tecnica'
                                placeholder='Scheda Tecnica...' />
                        </Form.Group>

                        <Form.Field>
                            <label>Descrizione</label>
                            {currentSlot.description &&
                                <RichEdit defaultContent={currentSlot.description} />}
                        </Form.Field>

                        <Form.Group widths='equal'>
                            <FormField>
                                {this.state.defaultType &&
                                    <Dropdown
                                        id='typeField'
                                        placeholder='Gratis / Da Bar'
                                        onChange={(event, data) => this.onTypeChanged(data)}
                                        defaultValue={this.state.defaultType}
                                        options={this.state.slotTypeOptions}
                                        search
                                        selection />
                                }
                            </FormField>
                            <FormField>
                                <Menu compact>
                                    <Dropdown text='Popolare' onChange={(event, data) => this.onPopularSelected(data)} options={isPopularOptions} simple item />
                                </Menu>
                            </FormField>

                            <FormField>
                                {this.state.defaultRating &&
                                    <Dropdown
                                        id='ratingField'
                                        style={{ marginBottom: '1rem' }}
                                        placeholder='Rating'
                                        onChange={(event, data) => this.onRatingChanged(data)}
                                        options={this.state.ratingStateOptions}
                                        search
                                        defaultValue={this.state.defaultRating}
                                        selection />
                                }
                            </FormField>
                            <FormField>
                                {this.state.defaultValuesForBonus &&
                                    <SearchMultipleSelection
                                        defaults={this.state.defaultValuesForBonus}
                                        onListUpdate={this.onBonusSelected} />
                                }
                            </FormField>
                            <Form.Field>
                                {this.state.currentSlot.name &&
                                    <ImagePicker
                                        onImageSelected={this.onImageSelected}
                                        imagePreview={getImageLinkFromName('slot', this.state.currentSlot.name, 'medium')} />}
                            </Form.Field>

                        </Form.Group>

                        <Form.Field
                            style={{ width: '100%' }}
                            onClick={this.submitEditSlot}
                            control={Button}>
                            Modifica
                        </Form.Field>

                    </Form>
                </div>
            </div>

        )
    }
}


export default EditSlot;