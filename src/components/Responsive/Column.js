import React from 'react'
import PropTypes from 'prop-types'


const bgDefaults = {
    1: '#F2F9FF',
    2: '#C0E4FD',
    3: '#8FCEFA',
    4: '#63B9F6',
    5: '#3DA6F0',
    6: '#2095E8',
    7: '#0985DE',
    8: '#007AD1',
    9: '#0071C2',
    10: '#0066B0',
    11: '#005B9C',
    12: '#004F87'
}

const widths = {
    1: 'col-1',
    2: 'col-2',
    3: 'col-3',
    4: 'col-4',
    5: 'col-5',
    6: 'col-6',
    7: 'col-7',
    8: 'col-8',
    9: 'col-9',
    10: 'col-10',
    11: 'col-11',
    12: 'col-12'
}

const Column = ({ width, background, ...restProps }) =>
    <div className={widths[width]}
        style={{ background: `${bgDefaults[background]}` }}>
        {restProps.children}
    </div>





Column.propTypes = {
    background: PropTypes.number,
    width: PropTypes.number
}

export default Column