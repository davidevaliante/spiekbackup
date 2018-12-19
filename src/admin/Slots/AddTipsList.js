import React, { Component } from 'react'
import AddArticle from '../AddArticle'
import TipsList from '../../components/SlotPageComponents/TipsList'
import forEach from 'lodash/forEach'

class AddTipsList extends Component {

    state = {
        listToPreview: '@'
    }

    onRowsUpdate = (rowsList) => {

        let s = '@'
        forEach(rowsList, (value, index, collection) => {
            if (index !== rowsList.length - 1) {
                s += value.content + '@'
            } else {
                s += value.content
            }
        })

        this.setState(prevState => {
            if (prevState.listToPreview !== s)
                return { listToPreview: s }
        })
    }

    render() {

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '3rem',
                padding: '4rem'
            }}>
                <AddArticle style={{ marginRight: '3rem', marginTop: '4rem' }} onRowsUpdate={(list) => this.onRowsUpdate(list)} />
                <div style={{ width: '3px', background: 'grey', height: '100vh' }}></div>
                <TipsList title='Preview' noStyle={true} style={{ width: '100%', paddingLeft: '3rem' }} tipList={this.state.listToPreview} />
            </div>
        )
    }
}

export default AddTipsList;