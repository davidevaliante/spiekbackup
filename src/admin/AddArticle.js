import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react-single/Icon'
import { Button } from 'semantic-ui-react-single/Button'
import { Input } from 'semantic-ui-react-single/Input'

import filter from 'lodash/filter'


// -------PROPS---------------------
// onItemAdded -> callback
// rowRenderer
class AddArticle extends Component {

    state = {
        rows: [

        ],
        inputPosition: 0
    }

    /* 
        RICEVE ->
                position : la posizione in {this.state.rows} dell'elemento da renderizzare
                content  : contenuto (testo) da renderizzare
        DESCRIZIONE ->   
                restituisce un component di testo per ogni elemento in state.rows
                quando viene cliccato dve permettere di editare il contenuto mantenendo 
                la giusta posizione nell'array e spostando l'input nella posizione giusta
        FUNZIONI CORRELATE ->
                editItemOnPosition()
                handleDelete()
        NOTE ->
                la notazione { position, content } estrae direttamente i valori dai props
                che hanno lo stesso nome
    */
    TextComponentRenderer = ({ position, content }) => {
        return (
            <div style={{ width: '100%', marginBottom: '2rem' }}>
                <div className='row-container'>
                    <h3
                        style={{ width: '100%', margin: '0rem' }}
                        fluid
                        action='Elimina'
                        onClick={() => this.editItemOnPosition(position, { content })}>
                        {content}
                    </h3>
                    <Button onClick={(event) => this.handleDelete(position)} animated='vertical' color='red' size='mini'>
                        <Button.Content hidden>Cancellla</Button.Content>
                        <Button.Content visible>
                            <Icon name='delete' />
                        </Button.Content>
                    </Button>

                </div>
            </div>
        );
    }

    /*
        RICEVE ->
                position     : la posizione dell'elemento nell'array da modificare
                currentValue : il valore attuale che si sta modificando
        DESCRIZIONE ->
                facendo l'update dello state tutto il componente viene renderizzato di nuovo.
                tramite {position} stabiliamo dove far comparire l'input nella lista e tramite
                currentValue settiamo l'input di default con il valore da modificare
        FUNZIONI CORRELATE ->
                render()
    */
    editItemOnPosition = (position, currentValue) => {
        this.setState({ inputPosition: position, editValue: currentValue })
    }

    /*
        RICEVE ->
                positionToRemove : la posizione dell'elemento nell'array da rimuovere
        DESCRIZIONE ->
                rimuove attraverso _.filter() l'elemento da eliminare e aggiorna lo state.
                di base setta {inputPosition} pari alla lunghezza della lista (già filtrata)
                questo fa comparire l'input come ultima riga dopo ogni "delete" (vedi rowsRenderer)
        FUNZIONI CORRELATE ->
                rowsRenderer()
                render()
    */
    handleDelete = (positionToRemove) => {
        console.log(`removing ${positionToRemove}`);
        this.setState(prevState => {
            const updatedRowList = filter(prevState.rows, (value, index, collection) => index !== positionToRemove)
            return {
                rows: updatedRowList,
                inputPosition: updatedRowList.length
            }
        }
        )
    }

    /* 
        RICEVE ->
                defaultValue : il valore di default dell' Input. E' presente solo se si sta
                               editando una riga, altrimenti comapare il placeholder 
        DESCRIZIONE ->   
                restituisce un component di Input che ha un valore di default SOLO se si sta
                editando una riga. 
        FUNZIONI CORRELATE ->
                onKeyDown()
    */
    InputComponentRenderer = ({ position, defaultValue }) => {
        return (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '.5rem' }}>
                    <Input
                        id='input'
                        autoFocus
                        onKeyDown={(event) => this.onKeyDown(event, position)}
                        style={{ width: '100%' }}
                        fluid
                        transparent
                        defaultValue={defaultValue}
                        placeholder='Inserisci' />
                </div>
                <div style={{ background: 'red', width: '100%', height: '1px' }}></div>
            </div>
        )
    }

    /* 
        RICEVE ->
                event   : passato da Semantic (che a sua volta passa quello di base di React)
                currentInputPosition : serve a stabilire contemporaneamente se e cosa si sta editando
        DESCRIZIONE ->   
               aggiorna lo state. Aggiunge una nuova riga alla fine dell'array o aggiorna una riga esistente
        FUNZIONI CORRELATE ->
                _.map()
                render()
    */
    onKeyDown = (event, currentInputPosition) => {

        // solo per invio, altrimenti intercetta tutti i tasti e solo con contenuto valido
        if (event.key === 'Enter' && document.getElementById('input').value.trim()) {

            // rappresentazione in JSON di una nuova riga
            const objectToAdd = {
                type: 'text',
                editable: true,
                content: document.getElementById('input').value.trim()
            }

            // se la posizione attuale dell'input è l'ultima si sta aggiungendo una nuova riga
            if (currentInputPosition === this.state.rows.length) {
                // la nuova riga va aggiunta alla fine dell'array {rows: [...prevState.rows, objectToAdd]}
                this.setState(prevState => (
                    {
                        rows: [...prevState.rows, objectToAdd],
                        inputPosition: prevState.inputPosition + 1,
                        editValue: undefined
                    }))
                // resetta il valore dell'input
                document.getElementById('input').value = ''
            }
            // altrimenti vuol dire che si sta editando e il nuovo oggetto va inserito nella posizione giusta
            else {
                this.setState(prevState => (
                    {
                        rows: prevState.rows.map((row, index) => index === currentInputPosition ? objectToAdd : row),
                        inputPosition: prevState.rows.length,
                        editValue: undefined
                    }))
            }

        }
    }


    /* 
        RICEVE ->
                inputPosition   : in che riga far comparire l'Input
                editValue       : se presete viene passata all'input come default value
        DESCRIZIONE ->   
               restituisce una lista di righe, cosa renderizzare va in base a state.rows[index].type
        FUNZIONI CORRELATE ->
                _.map()
        NOTE -> 
                ampliabile facilmente per mostrare qualunque tipo di contenuto
    */
    rowsRenderer = (inputPosition, editValue) => {
        // cicla l'array di righe presenti nello state
        const formattedRows = this.state.rows.map((row, index) => {
            // se l'elemento corrente ha un {index} pari alla posizione dell'input {inputPosition} che ci dice lo state
            // allora in quella posizione dell'array dobbiamo mettere l'input
            if (index === inputPosition) {
                // editValue.content contiene il defaultValue (se presente)
                return <this.InputComponentRenderer position={index} defaultValue={editValue.content} />
            }
            // in tutti gli altri casi è una riga già confermata e si renderizza il component in base al suo {type}
            else {
                switch (row.type) {
                    case 'text':
                        return <this.TextComponentRenderer position={index} content={this.state.rows[index].content} />
                    // ESEMPI DI MIGLIORAMENTO ->
                    /*
                    case 'image':
                        return <ImageRendererComponent />
                    case 'youtube':
                        return <YoutubeEmbedRendererComponent />
                    case 'link':
                        return <LinkComponent />
                    */
                    default:
                    // pass
                }
            }
            return undefined
        });

        /* 
            IMPORTANTE :
            Se la funzione finisse qui dopo la prima riga scritta l'input spariirebbe, quindi
            prendiamo {formattedRow} e gli pushiamo un InputComponent come ultimo elemento :

            -> formattedRows.push(<this.InputComponentRenderer position={inputPosition} />)

            facendo così però verrebbe aggiunto di base anche al primo render, quindi mettiamo la condizione:

            -> if(inputPosition !== 0) formattedRows.push(<this.InputComponentRenderer position={inputPosition} />)

            facendo così però verrebbe aggiunto un Input anche quando si sta editando un qualunque elemento tranne il primo
            mentre vogliamo che sia presente solo un input alla volta, quindi
            -> 
             if (inputPosition !== 0 && inputPosition === formattedRows.length) formattedRows.push(<this.InputComponentRenderer position={inputPosition} />)

        */
        if (inputPosition !== 0 && inputPosition === formattedRows.length)
            formattedRows.push(<this.InputComponentRenderer position={inputPosition} />)

        return formattedRows
    }

    render() {
        const { inputPosition, editValue } = this.state
        if (editValue) document.getElementById('input').value = editValue
        this.props.onRowsUpdate(this.state.rows)
        return (
            <div className='main-column' {...this.props}>
                {this.rowsRenderer(inputPosition, editValue)}
                {(inputPosition === 0 && editValue === undefined) && <this.InputComponentRenderer position={0} />}
            </div>
        )
    }
}

export default AddArticle