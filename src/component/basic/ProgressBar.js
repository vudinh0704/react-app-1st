import PropTypes from 'prop-types';
import React from 'react';

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
            if (props.isHover === 1) {
                onMouseEnter();
            } else if (props.isHover === 0) {
                onMouseLeave();
            } else {
                setWidth(0);
                setStartTime(new Date());
                setRemainTime(timeout);

                clearTimeout(timeRef.current);

                timeRef.current = setTimeout(() => {
                    setWidth('100%');
                }, 100);

                clearTimeout(timeCloseRef.current);

                timeCloseRef.current = setTimeout(() => {
                    onClose();
                }, timeout);
            }
        }
    }, [props.isRun, props.isHover]);

    // init
    const timeout = props.timeout * 1000 || 5000;

    const onClose = () => {
        if (props.onClose) props.onClose();
    }

    const onMouseEnter = () => {
        const rest = calcRemainTime(startTime, remainTime);

        setWidth((1 - (rest / timeout)) * 100 + '%');
        setRemainTime(rest);
        clearTimeout(timeCloseRef.current);
    }

    const onMouseLeave = () => {
        setWidth('100%');
        setStartTime(new Date());
        timeCloseRef.current = setTimeout(() => onClose(), remainTime);
    }

    const styleRoot = {
        'backgroundColor': '#9ea3b0',
        'height': '5px',
        ...props.style?.root,
        'width': '100%'
    }

    const styleRate = {
        'backgroundColor': '#fa5882',
        ...props.style?.rate,
        'height': '100%',
        'transition': startTime !== undefined ? calcRemainTime(startTime, remainTime) / 1000 + 's all linear' : '',
        'width': width
    }

    // render
    return isRun ? (
        <div
            id={props.id}
            className={props.class}
            style={styleRoot}
        >
            <div
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
    isHover: PropTypes.number,
    onClose: PropTypes.func
}

export default ProgressBar;