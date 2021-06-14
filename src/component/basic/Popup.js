import Button from '../../component/basic/Button';
import Icon from '../../component/basic/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Popup.module.css';

const Popup = props => {
    // state
    const [isShow, setIsShow] = React.useState(false);

    // effect
    React.useEffect(() => {
        if (props.isShow) setIsShow(!isShow);
    }, [props.isShow]);

    // init
    const onClose = () => {
        setIsShow(false);
    }

    const onClick = () => {
        props.button.optionalBtn.onClick();
    }

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

        let styleRoot = props.root || {};
        let styleBody = props.body || {};
        let styleFooter = props.footer || {};

        let styleHeader = {};

        if (props.header) {
            // copy values of n-layer object architecture
            styleHeader = JSON.parse(JSON.stringify(props.header));

            delete styleHeader.text;
        }

        let styleCancelBtn = {};

        if (props.button?.cancelBtn) {
            // copy values of n-layer object architecture
            styleCancelBtn = JSON.parse(JSON.stringify(props.button.cancelBtn));

            delete styleCancelBtn.text;
            delete styleCancelBtn.type;
            delete styleCancelBtn.code;
            delete styleCancelBtn.iconRight;
            delete styleCancelBtn.disabled;
            delete styleCancelBtn.onClick;
        }

        let styleOptionalBtn = {};

        if (props.button?.optionalBtn) {
            // copy values of n-layer object architecture
            styleOptionalBtn = JSON.parse(JSON.stringify(props.button.optionalBtn));

            delete styleOptionalBtn.text;
            delete styleOptionalBtn.type;
            delete styleOptionalBtn.code;
            delete styleOptionalBtn.iconRight;
            delete styleOptionalBtn.disabled;
            delete styleOptionalBtn.onClick;
        }

        return (
            isShow &&

            <div
                id={props.id}
                className={styles.popup + ' ' + props.class}
                style={{...position, ...styleRoot}}
            >
                <div className={styles.popup__header} style={styleHeader}>
                    <span>{props.header?.text || 'Popup Title'}</span>
                    <Icon code='las la-times' style={{'cursor': 'pointer'}} onClick={onClose} />
                </div>

                <div className={styles.popup__body} style={styleBody}>
                    {props.children}
                </div>

                <div className={styles.popup__footer} style={styleFooter}>
                    {
                        props.button?.optionalBtn &&

                        <Button
                            type={props.button.optionalBtn.type}
                            text={props.button.optionalBtn.text || 'Optional'}
                            style={{
                                'root': {...styleOptionalBtn},
                                'icon': {'fontSize': '1rem'}
                            }}
                            iconRight={props.button.optionalBtn.iconRight}
                            code={props.button.optionalBtn.code}
                            disabled={props.button.optionalBtn.disable}
                            onClick={onClick}
                        />
                    }

                    <Button
                        type={props.button?.cancelBtn?.type || 'cancel'}
                        text={props.button?.cancelBtn?.text || 'Cancel'}
                        style={{
                            'root': {...styleCancelBtn},
                            'icon': {'fontSize': '1rem'}
                        }}
                        iconRight={props.button?.cancelBtn?.iconRight}
                        code={props.button?.cancelBtn?.code}
                        disabled={props.button?.cancelBtn?.disabled}
                        onClick={props.button?.cancelBtn?.onClick || onClose}
                    />
                </div>
            </div>
        );
    }

    return render();
}

Popup.propTypes = {
    id: PropTypes.string,
    class: PropTypes.string,
    position: PropTypes.string,
    root: PropTypes.object,
    header: PropTypes.object,
    body: PropTypes.object,
    footer: PropTypes.object,
    button: PropTypes.object,
    isShow: PropTypes.bool.isRequired
}

export default Popup;