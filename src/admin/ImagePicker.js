import React, { Component } from 'react'
import split from 'lodash/split'
import { Grid } from 'semantic-ui-react-single/Grid'
import { doesFileExist } from "../utils/Utils";

class ImagePicker extends Component {
    state = {}

    componentDidMount() {
        if (this.props.imagePreview && doesFileExist(this.props.imagePreview)) {
            this.setState({ currentImageUrl: this.props.imagePreview })
        }
    }


    handleNewImage = () => {
        console.log('on change triggered');

        const selectedFile = document.getElementById('imagePicker').files[0];
        if (selectedFile && split(selectedFile.type, '/')[0] === 'image') {
            const url = URL.createObjectURL(selectedFile);
            this.props.onImageSelected(selectedFile)
            this.setState({ currentImage: selectedFile, currentImageUrl: url })
        } else {
            console.log('unsupported file type');
        }
    }

    handleInternalImage = () => {
        console.log('on change triggered');

        const selectedFile = document.getElementById('bonusInternalPicker').files[0];
        if (selectedFile && split(selectedFile.type, '/')[0] === 'image') {
            const url = URL.createObjectURL(selectedFile);
            this.props.onImageSelected(selectedFile)
            this.setState({ currentImage: selectedFile, currentImageUrl: url })
        } else {
            console.log('unsupported file type');
        }
    }

    render() {
        const { currentImageUrl } = this.state;

        return (
            <Grid stackable columns={1} >
                <Grid.Column>
                    <div className='upload-btn-wrapper'>
                        <button className="btn">{this.props.buttonMessage ? this.props.buttonMessage : 'Carica Immagine'}</button>
                        <input
                            id={this.props.bonusInternalImage ? 'bonusInternalPicker' : 'imagePicker'}
                            onChange={() => this.props.bonusInternalImage ? this.handleInternalImage() : this.handleNewImage()}
                            type="file"
                            name="myfile" />
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <img id={this.props.bonusInternalImage ? 'bonusInternalPreview' : 'imagePreview'}
                        alt='anteprima immagine'
                        src={currentImageUrl}
                        style={{ width: '150px' }} />
                </Grid.Column>
            </Grid>
        )
    }

};

export default ImagePicker;