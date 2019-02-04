import snakeCase from 'lodash';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react-single/Button';
import ImagePicker from '../admin/ImagePicker';
import { deleteImages, updateSlotImage } from '../firebase/firebase'
import FullBonusCard from '../components/Cards/FullBonusCard'
import { getBonusWithId } from '../firebase/get'
import { Responsive } from 'semantic-ui-react-single/Responsive'

class Test extends Component {
    state = {
        bonus: undefined
    }
    componentDidMount() {
        getBonusWithId("-LKMgT21o0hUN-xXJmw5", 'it', (bonus) => {
            console.log(bonus)
            this.setState({ bonus: bonus })
        })
    }

    bonus = {
        image: "https://www.shell.com/energy-and-innovation/the-energy-future/scenarios/shell-scenario-sky/_jcr_content/pagePromo/image.img.960.jpeg/1522157123504/clear-blue-sky.jpeg",
        bonusImageBg: '#4286f4',
        name: "Eurobet",
        borderColor: "#ffff",
        noDepositText: '25 euro',
        withDepositText: '100 euro',
        tips: '@primo tips@secondo tips@terzo tips'

    }

    render() {
        return (
            <React.Fragment>
                <Responsive {...Responsive.onlyMobile}>
                    <h1>MOBILE</h1>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <h1>TABLET</h1>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <h1>DESKTOP</h1>
                </Responsive>
            </React.Fragment>
        );
    }
}

export default Test

