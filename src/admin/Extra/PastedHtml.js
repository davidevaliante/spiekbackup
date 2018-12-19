import React, { Component } from 'react'
import { Input } from 'semantic-ui-react-single/Input'
import { Form } from 'semantic-ui-react-single/Form'
import { TextArea } from 'semantic-ui-react-single/TextArea'
import { Button } from 'semantic-ui-react-single/Button'
import { submitExtraFromHtml } from '../../firebase/post'

class PastedHtml extends Component {

    render() {
        return (
            <div>
                <Form.Field
                    id='pastedHtml'
                    style={{ width: '100%', height: '60%' }}
                    fluid
                    rows={15}
                    defaultValue={this.props.defaultValue}
                    control={TextArea}
                    placeholder='Copia e incolla html qui' />
            </div>
        )
    }
}

export default PastedHtml