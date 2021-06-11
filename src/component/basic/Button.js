import Icon from './Icon';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Button.module.css';

const Button = props => {
    let code, classBtn;

    switch (props.type) {
        case 'accept':
            code = 'las la-check';
            classBtn = styles['button--primary'];
            break;
        case 'add':
            code = 'las la-plus-circle';
            classBtn = styles['button--success'];
            break;
        case 'cancel':
            code = 'las la-ban';
            classBtn = styles['button--warning'];
            break;
        case 'delete':
            code = 'las la-trash';
            classBtn = styles['button--danger'];
            break;
        case 'edit':
            code = 'las la-edit';
            classBtn = styles['button--secondary'];
            break;
        default:
            code = classBtn = '';
    }

    const onClick = (...e) => {
        if (props.onClick) props.onClick(e);
    }

    const restProps = {disabled: props.disabled}

    let styleRoot = props.style?.root || {}
    let styleIcon = props.style?.icon || {}

    if (props.iconRight) {
        styleIcon.order = 1
        styleIcon.marginLeft = '.5rem'
    } else {
        styleIcon.marginRight = '.5rem'
    }

    return (
        <button
            id={props.id}
            className={styles.button + ' ' + classBtn + ' ' + props.class}
            style={styleRoot}
            {...restProps}
            onClick={onClick}
        >
            {
                (code || props.code) &&

                <Icon code={code || props.code} style={styleIcon} />
            }

            <span>{props.text || 'Button'}</span>
        </button>
    );
}

Button.propTypes = {
    id: PropTypes.string,
    class: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
    code: PropTypes.string,
    iconRight: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    onClick: PropTypes.func.isRequired,
}

export default Button;