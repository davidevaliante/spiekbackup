import snakeCase from 'lodash';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react-single/Button';
import ImagePicker from '../admin/ImagePicker';
import { deleteImages, updateSlotImage } from '../firebase/firebase'
import FullBonusCard from '../components/Cards/FullBonusCard'
import { getBonusWithId } from '../firebase/get'

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
            <div>
                {this.state.bonus &&

                    <FullBonusCard
                        bonus={this.bonus}
                    />
                }
            </div>
        );
    }
}

export default Test

