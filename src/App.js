import logo from './logo.svg';
import './App.css';
import Button from './component/basic/Button';
import Icon from './component/basic/Icon';
import Input from './component/basic/Input';
import Popup from './component/basic/Popup';
import Toast from './component/basic/Toast';
import React from 'react';

function App() {
    const [popupDisplay, setPopupDisplay] = React.useState(false);
    const [toastDisplay, setToastDisplay] = React.useState(false);

    React.useEffect(() => {
        if (popupDisplay) setPopupDisplay(!popupDisplay);
        if (toastDisplay) setToastDisplay(!toastDisplay);
    }, [popupDisplay, toastDisplay]);

    const alerts = () => alert('You just clicked on button!');

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                <br />

                <Icon
                    code='las la-hand-point-down'
                    style={{
                        'color': '#ff4d6d',
                        'cursor': 'pointer',
                        'fontSize': '25px'
                    }}
                />

                <br />

                <Button
                    id=''
                    class=''
                    type='accept'
                    text=''
                    iconRight={false}
                    disabled={false}
                    style={{
                        'button': {

                        },
                        'icon': {

                        }
                    }}
                    onClick={alerts}
                />

                <br />

                <Input
                    id=''
                    class=''
                    type="money"
                    label="Balance"
                    placeholder="Enter amount..."
                    inline
                    disabled={false}
                    readOnly={false}
                    style={{
                        'root': {

                        },
                        'label': {
                            'color': '#fdf0d5'
                        },
                        'value': {
                            'color': '#006666'
                        }
                    }}
                />

                <br />

                <Popup
                    id=''
                    class=''
                    position=''
                    root={{}}
                    header={{
                        'text': '',
                        'color': '#f41c78'
                    }}
                    body={{}}
                    footer={{}}
                    button={{
                        'cancelBtn': {
                            'type': '',
                            'text': '',
                            'code': '',
                            'iconRight': false,
                            'disabled': false,
                            'onClick': ''
                        },
                        'optionalBtn': {
                            'marginRight': '.5rem',
                            'type': 'delete',
                            'text': '',
                            'code': '',
                            'iconRight': false,
                            'disabled': true,
                            'onClick': alerts
                        }
                    }}
                    isShow={popupDisplay}
                >
                    A Bootstrap modal is the best way of adding popup to website pages. Open a simple modal on button click which contains the header, body and the footer. Place your notification messages or forms inside the modal and open it only when the user clicks the button or perform some action.
                </Popup>

                <Button
                    id=''
                    class=''
                    type='cancel'
                    text='Popup'
                    iconRight={false}
                    disabled={false}
                    style={{
                        'button': {

                        },
                        'icon': {

                        }
                    }}
                    onClick={() => setPopupDisplay(true)}
                />

                <br />

                <Toast
                    id=''
                    class=''
                    type='warning'
                    position='top-left'
                    content='An error has occured!'
                    timeout='5'
                    smoothingCoefficient='0.1'
                    isShow={toastDisplay}
                    style={{
                        'root': {},
                        'header': {},
                        'progress-bar-cover': {},
                        'progress-bar-core': {},
                        'body': {}
                    }}
                />

                <Button
                    id=''
                    class=''
                    type='edit'
                    text='Toast'
                    iconRight={false}
                    disabled={false}
                    style={{
                        'button': {

                        },
                        'icon': {

                        }
                    }}
                    onClick={() => setToastDisplay(true)}
                />
            </header>
        </div>
    );
}

export default App;