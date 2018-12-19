import React from 'react'
// semantic
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { Container } from 'semantic-ui-react-single/Container'
import { RESPONSIVE_RESOLUTION } from '../../../enums/Constants'

const url = 'https://www.adm.gov.it/portale/documents/20182/1103856/art110TULPS.pdf/e205cb30-2a0f-41b1-8578-b66d6103a38b'

const ArticleDescription = (props) => (
    <div>
        <Responsive as={Container} minWidth={RESPONSIVE_RESOLUTION.MEDIUM} fluid>
            <div className='home-page-intro-container' style={{ marginTop: '6rem' }}>
                <div className='home-page-intro-outer'>
                    <div className='home-page-intro-bg'>
                        <div className='home-page-intro'>
                            <h2>Articoli e Guide</h2>
                            <p>In questa pagina troverai guide ed approfondimenti per utilizzare i migliori bonus e le migliori slot</p>

                        </div>
                    </div>
                </div>
            </div>
        </Responsive>
    </div>
)

export default ArticleDescription