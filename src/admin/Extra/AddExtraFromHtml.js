import React, { Component } from 'react'
import { Button } from 'semantic-ui-react-single/Button'
import { Form } from 'semantic-ui-react-single/Form'
import { Input } from 'semantic-ui-react-single/Input'
import { submitExtraFromHtml } from '../../firebase/post'
import RichEdit from './RichEdit'
import { Container } from 'semantic-ui-react-single/Container'
import { Checkbox } from 'semantic-ui-react-single/Checkbox'
import PastedHtml from './PastedHtml'
import { getExtraById } from '../../firebase/get'
import { updateExtraWithId } from '../../firebase/update'
import ImagePicker from "../ImagePicker";
import { getImageLinkFromName } from "../../utils/Utils";

class AddExtraFromHtml extends Component {



    state = {
        currentArticle: {},
        pushedLink: "",
        pushedId: "",
        articleInputMode: "manualInput",
        isInEditMode: false,
        extraToEdit: {}
    }

    onImageSelected = (image) => {
        this.setState({ image: image, imageName: image.name })
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            getExtraById(this.props.match.params.id, extra => {
                this.setState({
                    isInEditMode: true,
                    extraToEdit: extra.data,
                    articleInputMode: "pastedInput",
                })
            })
        }
    }

    submit = () => {
        let rawhtml = ""
        let title = document.getElementById('extraTitle').value.trim()
        if (this.state.articleInputMode === "manualInput")
            rawhtml = document.getElementById('htmlText').value.trim()
        if (this.state.articleInputMode === "pastedInput")
            rawhtml = document.getElementById('pastedHtml').value.trim()

        if (rawhtml.length > 0 && !this.state.isInEditMode) {
            const newExtra = { content: rawhtml, title: title, image: this.state.image, imageName: `${title}_article_image` }
            submitExtraFromHtml(newExtra, success => {
                this.setState({
                    pushedId: success.data.name
                })
            })
        }

        if (rawhtml.length > 0 && this.state.isInEditMode) {
            const editedExtra = { content: rawhtml, title: title, image: this.state.image, imageName: `${title}_article_image` }
            updateExtraWithId(this.props.match.params.id, editedExtra, success => {
                console.log(success)
            })
        }
    }

    handleInputMode = (e, { value }) => {
        this.setState({ articleInputMode: value })
    }

    render() {
        const { pushedLink, pushedId, articleInputMode, isInEditMode, extraToEdit } = this.state
        let manual
        if (articleInputMode === "manualInput") manual = true
        if (articleInputMode === "pastedInput") manual = false
        console.log(this.state);

        if (isInEditMode) {
            return (
                <div>
                    <Form>
                        <Container>
                            <h2 className='extra-header'>{"Modifica Articolo articolo"}</h2>
                            <Form.Group inline style={{ marginBottom: '2rem' }}>
                                <Checkbox
                                    style={{ marginRight: '3rem' }}
                                    radio
                                    label='Inserisci guida manualmente'
                                    name='checkboxRadioGroup'
                                    value='manualInput'
                                    checked={manual}
                                    onChange={this.handleInputMode}
                                />
                                <Checkbox
                                    radio
                                    label='Copia e incolla html'
                                    name='checkboxRadioGroup'
                                    value='pastedInput'
                                    checked={!manual}
                                    onChange={this.handleInputMode}
                                />


                            </Form.Group>
                            <h3 style={{ 'textAlign': 'center' }}>Titolo (opzionale ma consigliato)</h3>
                            <Input
                                fluid
                                className='extra-title-input'
                                id='extraTitle'
                                defaultValue={extraToEdit.title && extraToEdit.title}
                            />
                            <h3 style={{ 'textAlign': 'center' }}>Contenuto dell'articolo</h3>
                            {manual && <RichEdit />}
                            {!manual && <PastedHtml defaultValue={extraToEdit.content} />}




                            <Form.Field>

                                <ImagePicker
                                    onImageSelected={this.onImageSelected}
                                    imagePreview={getImageLinkFromName('article', this.state.extraToEdit.title)} />
                            </Form.Field>
                            <Button
                                fluid
                                onClick={this.submit}>
                                Conferma
                        </Button>

                            {pushedId && (
                                <div>
                                    <h3>Id nuovo Articolo :   {pushedId}</h3>
                                    <h3>link in produzione : localhost:3000/article/{pushedId}</h3>
                                    <h3>link reale : https://spike-2481d.firebaseapp.com/article/{pushedId}</h3>
                                </div>
                            )}
                        </Container>

                    </Form>
                </div>
            )
        }

        return (
            <div>
                <Form>
                    <Container>
                        <h2 className='extra-header'>{"Aggiungi nuovo articolo"}</h2>
                        <Form.Group inline style={{ marginBottom: '2rem' }}>
                            <Checkbox
                                style={{ marginRight: '3rem' }}
                                radio
                                label='Inserisci guida manualmente'
                                name='checkboxRadioGroup'
                                value='manualInput'
                                checked={manual}
                                onChange={this.handleInputMode}
                            />
                            <Checkbox
                                radio
                                label='Copia e incolla html'
                                name='checkboxRadioGroup'
                                value='pastedInput'
                                checked={!manual}
                                onChange={this.handleInputMode}
                            />
                        </Form.Group>
                        <h3 style={{ 'textAlign': 'center' }}>Titolo (opzionale ma consigliato)</h3>
                        <Input
                            fluid
                            className='extra-title-input'
                            id='extraTitle'
                        />
                        <h3 style={{ 'textAlign': 'center' }}>Contenuto dell'articolo</h3>
                        {manual && <RichEdit />}
                        {!manual && <PastedHtml />}


                        <Form.Field>

                            <ImagePicker
                                onImageSelected={this.onImageSelected}
                                imagePreview={getImageLinkFromName('article', this.state.currentArticle.name, 'medium')} />
                        </Form.Field>

                        <Button
                            fluid
                            onClick={this.submit}>
                            Conferma
                        </Button>



                        {pushedId && (
                            <div>
                                <h3>Id nuovo Articolo :   {pushedId}</h3>
                                <h3>link in produzione : localhost:3000/article/{pushedId}</h3>
                                <h3>link reale : https://spike-2481d.firebaseapp.com/article/{pushedId}</h3>
                            </div>
                        )}
                    </Container>
                </Form>
            </div>
        )
    }
}

export default AddExtraFromHtml