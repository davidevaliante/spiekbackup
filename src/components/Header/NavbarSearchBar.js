import React, { Component } from 'react'
// semantic
import { Search } from 'semantic-ui-react-single/Search'
// mix
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'
import debounce from 'lodash/debounce'
import escapeRegExp from 'lodash/escapeRegExp'
import { formatList } from '../../utils/Utils'
import { ROUTE } from '../../enums/Constants'
// router e redux
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class NavbarSearchBar extends Component {

    state = {
        redirect: {
            path: undefined
        }
    }

    componentDidMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => {
        switch (result.type) {
            case 'slot-online':
                this.props.history.push(`${ROUTE.SLOTS}/${result.id}`)
                console.log(result);

                break;
            case 'slot-bar':
                this.props.history.push(`${ROUTE.SLOTS}/${result.id}`)
                break;
            case 'bonus':
                window.open(result.link)
                break;
            case 'producer':
                this.props.history.push(`${ROUTE.PRODUCERS}/${result.title}`)
                break;
            default:

        }
    };

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(escapeRegExp(this.state.value.trim()), 'i')
            const isMatch = result => re.test(result.title)

            const filteredResults = reduce(
                formatList(this.props.slotList, this.props.bonusList, this.props.producerList),
                (memo, data, name) => {
                    const results = filter(data.results, isMatch)
                    if (results.length) memo[name] = { name, results }
                    return memo
                },
                {},
            )

            this.setState({
                isLoading: false,
                results: filteredResults,
            })
        }, 100)
    }


    render() {
        const { isLoading, value, results } = this.state

        return (
            <div>
                <Search
                    color='red'
                    size='mini'
                    category
                    noResultsMessage='Nessun risultato'
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={debounce(this.handleSearchChange, 400, { leading: true })}
                    results={results}
                    value={value} >
                </Search>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    bonusList: state.bonusList,
    slotList: state.slotMenuList,
    producerList: state.producerList,
    currentSlot: state.currentSlot
})

export default withRouter(connect(mapStateToProps)(NavbarSearchBar));
