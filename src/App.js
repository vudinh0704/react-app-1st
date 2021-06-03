import logo from './logo.svg';
import './App.css';
import Button from './component/basic/Button';
import Icon from './component/basic/Icon';

function App() {
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
            </header>
        </div>
    );
}

export default App;