import React from 'react'
// semantic
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { Container } from 'semantic-ui-react-single/Container'
import { RESPONSIVE_RESOLUTION } from '../../../enums/Constants'

const url = 'https://www.adm.gov.it/portale/documents/20182/1103856/art110TULPS.pdf/e205cb30-2a0f-41b1-8578-b66d6103a38b'

const SiteDescription = (props) => (
    <div>
        <Responsive as={Container} minWidth={RESPONSIVE_RESOLUTION.MEDIUM} fluid>
            <div className='home-page-intro-container' style={{ marginTop: '6rem' }}>
                <div className='home-page-intro-outer'>
                    <div className='home-page-intro-bg'>
                        <div className='home-page-intro'>
                            <h2>Sono giochi di fortuna o anche di abilità?</h2>
                            <p>La <a href={url}>legge</a> che regolamenta le <strong>awp</strong> stabilisce 
                            che oltre al fattore aleatorio, in minima parte l’esito di una partità può dover
                            dipendere anche dall’abilità del giocatore.</p>
                            <p>Ovviamente ci sono slot machine in cui questa componente di abilità <strong>conta 
                            in misura maggiore</strong>, altre dove è irrilevante.</p>
                            <p style={{ width: '100%' }}>In questo sito troverai i migliori consigli ed i bonus 
                            più convenienti per trasformare la tua passione in <strong>guadagno</strong></p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </Responsive>
    </div>
)

export default SiteDescription