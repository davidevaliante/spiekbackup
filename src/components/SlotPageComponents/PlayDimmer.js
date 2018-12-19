import React from 'react'
// semantic
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
// components
import RandomBonus from './RandomBonus'
// router e redux
import { connect } from 'react-redux'
import { setUserNotPlaying } from '../../reducers/PlayModeReducer'

const PlayDimmer = (props) => {

    return (
        <div>
            <Dimmer
                page
                active={props.isPlaying}
                onClickOutside={() => props.dispatch(setUserNotPlaying())} >
                <div>
                    <iframe
                        style={{ position: 'absolute', right: '25%', top: '11%' }}
                        title='test'
                        width='900'
                        height='500'
                        src={props.url}/>
                    <div style={{ position: 'absolute', left: '77%', top: '39%' }}>
                        <RandomBonus bonus={props.bonusList} />
                    </div>
                </div>
            </Dimmer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    isPlaying: state.isPlaying
})

export default connect(mapStateToProps)(PlayDimmer)