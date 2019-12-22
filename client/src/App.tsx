import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const API_URL = 'https://api.menuo.me/v1'
const api = {
  get: (url: string) => fetch(API_URL + url, { method: 'GET', mode: 'no-cors' }).then(res => res.json())
}

const App: React.FC = () => {
  const [menu, setMenu] = useState([])

  useEffect(() => {
    const doEffect = async () => {
      const menu = await api.get('/menus/zalewajka')
      setMenu(menu)
    }

    doEffect()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {JSON.stringify(menu)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
