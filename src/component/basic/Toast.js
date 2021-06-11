import Icon from '../../component/basic/Icon';
import ProgressBar from '../../component/basic/ProgressBar';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Toast.module.css';

const Toast = props => {
    debugger
    // state
    const [isShow, setIsShow] = React.useState('');
    const [isHover, setIsHover] = React.useState(2);

    // effect
    React.useEffect(() => {
        if (props.isShow) setIsShow(true);
    }, [props.isShow]);

    // init
    const onClose = () => {
        setIsShow(false);
        setIsHover(2);
    }

    const onMouseEnter = () => setIsHover(1);
    const onMouseLeave = () => setIsHover(0);

    // render
    const render = () => {
        var temp = 'top-right';

        if (props.position === 'top-left' ||
            props.position === 'top-right' ||
            props.position === 'bottom-left' ||
            props.position === 'bottom-right')
            temp = props.position;

        const position = {
            'position': 'fixed',
            'top': temp === 'top-left' || temp === 'top-right' ? '1rem' : '',
            'left': temp === 'top-left' || temp === 'bottom-left' ? '1rem' : '',
            'right': temp === 'top-right' || temp === 'bottom-right' ? '1rem' : '',
            'bottom': temp === 'bottom-left' || temp === 'bottom-right' ? '1rem' : ''
        }

        const colorHeader = {
            'color':
                props.type === 'error' ? '#721c24' :
                (props.type === 'warning' ? '#856404' :
                (props.type === 'info' ? '#0c5460' :
                (props.type === 'success' ? '#155724' : '#1b1e21'))),
            'backgroundColor':
                props.type === 'error' ? '#f8d7da' :
                (props.type === 'warning' ? '#fff3cd' :
                (props.type === 'info' ? '#d1ecf1' :
                (props.type === 'success' ? '#d4edda' : '#d6d8d9')))
        }

        const styleIcon = {
            'cursor': 'pointer',
            'fontSize': '15px'
        }

        return (
            isShow &&

            <div
                id={props.id}
                className={styles.toast + ' ' + props.class}
                style={{...position, ...props.style && props.style.root}}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div
                    className={styles.toast__header}
                    style={{...colorHeader, ...props.style && props.style.header}}
                >
                    {props.type === 'error' && <Icon code='las la-exclamation-circle' style={{...styleIcon, ...props.style?.icon}} />}
                    {props.type === 'warning' && <Icon code='las la-exclamation-triangle' style={{...styleIcon, ...props.style?.icon}} />}
                    {props.type === 'info' && <Icon code='las la-question-circle' style={{...styleIcon, ...props.style?.icon}} />}
                    {props.type === 'success' && <Icon code='las la-check' style={{...styleIcon, ...props.style?.icon}} />}
                    <span style={{'textTransform': 'capitalize'}}>{props.type}</span>
                    <Icon code='las la-times' style={{...styleIcon, ...props.style?.icon}} onClick={onClose} />
                </div>

                {
                    props.timeout &&

                    <ProgressBar
                        timeout={props.timeout}
                        isRun={isShow}
                        isHover={isHover}
                        style={props.style.progressBar}
                        onClose={() => onClose()}
                    />
                }

                <div
                    className={styles.toast__body}
                    style={{...props.style && props.style.body}}
                >
                    {props.content}
                </div>
            </div>
        );
    }

    return render();
}

Toast.propTypes = {
    id: PropTypes.string,
    class: PropTypes.string,
    type: PropTypes.string,
    position: PropTypes.string,
    content: PropTypes.string,
    timeout: PropTypes.number,
    isShow: PropTypes.bool.isRequired,
    style: PropTypes.object
}

export default Toast;