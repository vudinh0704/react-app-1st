import PropTypes from 'prop-types';
import React from 'react';
import styles from './Input.module.css';
import {formatNumber, formatMoney, unformatMoney} from '../../helper/Format';

const Input = props => {
    // state
    const [value, setValue] = React.useState('');

    // effect

    // init
    const onFocus = e => {
        let target = e.target;
        let value = target.value;

        if (props.type === 'number' || props.type === 'money') {
            value = unformatMoney(target.value)
        }

        setValue(value);
        target.select();
    }

    const onKeyPress = e => {
        if (props.type === 'number' || props.type === 'money') {
            if (e.key === '-') {
                if (e.target.selectionStart !== 0) e.preventDefault();
            } else {
                let number = Number(e.key);

                if (isNaN(number)) e.preventDefault();
            }
        }
    }

    const onChange = e => {
        let target = e.target;

        setValue(target.value);
    }

    const onBlur = e => {
        let value = e.target.value;

        if (props.type === 'number') {
            value = formatNumber(value);
        } else if (props.type === 'money') {
            value = formatMoney(value);
        }

        setValue(value);
    }

    // render
    const render = () => {
        const inputDirection = {
            'flexDirection': props.inline ? 'row' : 'column'
        }

        return (
            <div
                id={props.id}
                className={styles.input + ' ' + props.class}
                style={{...props.style && props.style.root, ...inputDirection}}
            >
                {
                    props.label &&

                    <label
                        className={styles.input__label}
                        style={{...props.style && props.style.label}}
                    >
                        {props.label}
                    </label>
                }

                <input
                    className={styles.input__value}
                    style={{...props.style && props.style.value}}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    readOnly={props.readOnly}
                    value={value}
                    onFocus={onFocus}
                    onKeyPress={onKeyPress}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
        );
    }

    return render();
}

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    inline: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    style: PropTypes.object
}

export default Input;