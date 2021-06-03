import PropTypes from 'prop-types';
import React from 'react';

const Icon = props => {
    const restProps = {...props}
    const style = {...props.style}

    delete restProps.code
    delete restProps.style

    style.fontSize = style.fontSize || '1rem'
    style.padding = style.padding || '0 .25rem'

    return <i className={props.code} style={style} {...restProps} />
}

Icon.propTypes = {
    code: PropTypes.string.isRequired,
    style: PropTypes.object
}

export default Icon;