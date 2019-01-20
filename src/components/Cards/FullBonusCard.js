import React from 'react'
import { withRouter } from 'react-router-dom'
import { getImageLinkFromName } from '../../utils/Utils'
import { split } from 'lodash'
const FullBonusCard = (props) => {

    const imageStyle = {
        border: props.bonus.borderColor ? `3px solid ${props.bonus.borderColor}` : `3px solid #ffff`
    }

    const goToExternalLink = () => {
        window.open(props.bonus.link)
    }

    const goToGuide = () => {
        props.history.push(`/article/${props.bonus.guideId}`)
    }

    const firstTip = () => {
        return split(props.bonus.tips, '@')[1]
    }

    const secondTip = () => {
        return split(props.bonus.tips, '@')[2]
    }

    const thirdTip = () => {
        return split(props.bonus.tips, '@')[3]
    }

    return (
        <div className='card-container'>

            <div
                className='image-container'
                style={{ background: props.bonus.bonusImageBg ? props.bonus.bonusImageBg : 'red' }}>
                <img
                    style={imageStyle}
                    className='circular-image'
                    src={getImageLinkFromName('bonus_circular', props.bonus.name)}
                    alt="bonus" />
                <p className="image-text">{props.bonus.name}</p>
            </div>

            <div className='no-deposit-container'>
                <p className='no-deposit-text-header'>Senza Deposito</p>
                <p className='no-deposit-text'>{props.bonus.noDepositText}</p>
            </div>

            <div style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                <div style={{ background: 'grey', height: '2px', width: '100%' }} />
            </div>

            <div className='with-deposit-container'>
                <p className='no-deposit-text-header'>Con Deposito</p>
                <p className='no-deposit-text'>{props.bonus.withDepositText}</p>
            </div>

            <div className="bonusTipsList">
                <ul style={{ marginLeft: '15%' }}>
                    <li className='list-element'>
                        {firstTip()}
                    </li>

                    <li className='list-element'>
                        {secondTip()}
                    </li>

                    <li className='list-element'>
                        {thirdTip()}
                    </li>
                </ul>
            </div>


            <div className='bonus-buttons-container'>
                <p
                    onClick={() => goToGuide()}
                    className="guide-button">Leggi la guida</p>
                <div className={'divider-buttons'}>

                </div>
                <p
                    onClick={() => goToExternalLink()}
                    className="bonus-button">Vai al bonus</p>
            </div>
        </div>
    )
}

export default withRouter(FullBonusCard)