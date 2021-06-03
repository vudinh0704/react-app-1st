import Icon from '../../component/basic/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Toast.module.css';

const Toast = props => {
    // state
    const [isRun, setIsRun] = React.useState(false);
    const [isShow, setIsShow] = React.useState('');
    const [time, setTime] = React.useState(props.timeout && Number(props.timeout) > 1 ? Number(props.timeout) : 1);
    const [width, setWidth] = React.useState(100);

    // effect
    React.useEffect(() => {
        if (props.isShow) onOpen();

        if (!props.timeout || props.timeout === '' || props.timeout < 3) return 0;

        var smoothingCoefficient = !props.smoothingCoefficient
                                || props.smoothingCoefficient === ''
                                || props.smoothingCoefficient <= 0
                                || props.smoothingCoefficient > props.timeout/5
                                ? 0.1 : props.smoothingCoefficient;
        var i = time;
        var rate = smoothingCoefficient/Number(props.timeout);

        if (isRun === true) {
            var loss = rate*parseInt(document.getElementById('progressBarCover').style.width);

            i -= smoothingCoefficient;

            if (i < 0) {
                onClose();
            }

            var temp = (width) + '%';
            document.getElementById('progressBarCore').style.width = temp;

            var countdown = setInterval(() => {
                setWidth(width => width - loss);
                setTime(time => time - smoothingCoefficient);
            }, smoothingCoefficient * 1000);
        }

        return () => clearInterval(countdown);
    }, [props.isShow, props.timeout, props.smoothingCoefficient, isRun, isShow, time, width]);

    // init
    const onOpen = () => {
        setIsShow(true);
        setIsRun(true);
    }

    const onClose = () => {
        setTime(props.timeout && Number(props.timeout) > 1 ? Number(props.timeout) : 0);
        setWidth(100);
        setIsShow(false);
        setIsRun(false);
    }

    const onMouseOver = () => setIsRun(false);
    const onMouseLeave = () => setIsRun(true);

    // render
    const render = () => {
        var countdown = '';
        var temp = 'top-right';

        if (props.timeout && props.timeout >= 3) countdown = time.toFixed(0) + ' | ';

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

        const headerColor = {
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

        const progressBarCover = {
            'width': '100%'
        }

        return (
            isShow &&

            <div
                id={props.id}
                className={styles.toast + ' ' + props.class}
                style={{...position, ...props.style && props.style.root}}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            >
                <div
                    className={styles.toast__header}
                    style={{...headerColor, ...props.style && props.style.header}}
                >
                    {props.type === 'error' && <Icon code='las la-exclamation-circle' style={{'fontSize': '17.5px'}} />}
                    {props.type === 'warning' && <Icon code='las la-exclamation-triangle' style={{'fontSize': '17.5px'}} />}
                    {props.type === 'info' && <Icon code='las la-question-circle' style={{'fontSize': '17.5px'}} />}
                    {props.type === 'success' && <Icon code='las la-check' style={{'fontSize': '17.5px'}} />}
                    <span style={{'textTransform': 'capitalize'}}>{props.type}</span>
                    <Icon code='las la-times' style={{'fontSize': '12.5px', 'cursor': 'pointer'}} onClick={onClose} />
                </div>

                {
                    props.timeout && props.timeout >= 3 &&

                    <div>
                        <div
                            id='progressBarCover'
                            className={styles['toast__progress-bar-cover']}
                            style={{...props.style && props.style['progress-bar-cover'], ...progressBarCover}}
                        >
                            <div
                                id='progressBarCore'
                                className={styles['toast__progress-bar-core']}
                                style={{...props.style && props.style['progress-bar-core']}}
                            >
                            </div>
                        </div>
                    </div>
                }

                <div
                    className={styles.toast__body}
                    style={{...props.style && props.style.body}}
                >
                    {countdown}{props.content}
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
    timeout: PropTypes.string,
    smoothingCoefficient: PropTypes.string,
    isShow: PropTypes.bool,
    style: PropTypes.object
}

export default Toast;