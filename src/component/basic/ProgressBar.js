import PropTypes from 'prop-types';
import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = props => {
    // state
    const [isRun, setIsRun] = React.useState();
    const [remainTime, setRemainTime] = React.useState();
    const [startTime, setStartTime] = React.useState();
    const [width, setWidth] = React.useState();
    const timeCloseRef = React.useRef();
    const timeRef = React.useRef();

    // effect
    React.useEffect(() => {
        setIsRun(props.isRun);

        if (props.isRun) {
            if (props.onMouseOver === 1) {
                onMouseOver();
            } else if (props.onMouseOver === 0) {
                onMouseOut();
            } else {
                setWidth(0);
                setStartTime(new Date());
                setRemainTime(timeout);

                clearTimeout(timeRef.current);

                timeRef.current = setTimeout(() => {
                    setWidth('100%');
                }, 1);

                clearTimeout(timeCloseRef.current);

                timeCloseRef.current = setTimeout(() => {
                    onClose();
                }, timeout);
            }
        }
    }, [props.isRun, props.onMouseOver]);

    // init
    const timeout = props.timeout * 1000 || 5000;

    const onClose = () => {
        if (props.onClose) props.onClose();
    }

    const onMouseOver = () => {
        const rest = calcRemainTime(startTime, remainTime);

        setWidth((1 - (rest / timeout)) * 100 + '%');
        setRemainTime(rest);
        clearTimeout(timeCloseRef.current);
    }

    const onMouseOut = () => {
        setWidth('100%');
        setStartTime(new Date());
        timeCloseRef.current = setTimeout(() => onClose(), remainTime);
    }

    const styleRoot = props.style?.root || {}

    const styleRate = {
        ...props.style?.rate,
        'height': '100%',
        'transition': startTime !== undefined ? calcRemainTime(startTime, remainTime) / 1000 + 's all linear' : '',
        'width': width
    }

    // render
    return isRun ? (
        <div
            id={props.id}
            className={styles['progress-bar'] + ' ' + props.class}
            style={styleRoot}
        >
            <div
                className={styles['progress-bar__rate']}
                style={styleRate}
            >
            </div>
        </div>
    ) : null;
}

const calcRemainTime = (startTime, restTime) => {
    let remainTime = restTime - new Date().getTime() + startTime.getTime();

    if (remainTime < 0) remainTime = 0;

    return remainTime;
}

ProgressBar.propTypes = {
    id: PropTypes.string,
    class: PropTypes.string,
    timeout: PropTypes.number,
    isRun: PropTypes.bool.isRequired,
    onMouseOver: PropTypes.number,
    onClose: PropTypes.func.isRequired
}

export default ProgressBar;