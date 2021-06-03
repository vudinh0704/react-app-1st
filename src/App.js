import logo from './logo.svg';
import './App.css';
import Icon from './component/basic/Icon';

function App() {
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
            </header>
        </div>
    );
}

export default App;