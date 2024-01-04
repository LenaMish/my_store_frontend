import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/Nav.component';
import Content from './components/Content/Content.component';
import { BrowserRouter } from "react-router-dom";
import { TokenContext } from './context/context';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  return (
    <div>
      <TokenContext.Provider value={{token: token, setToken: setToken}}>
        <BrowserRouter>
          <Nav />
          <Content />
          <Toaster/>
        </BrowserRouter>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
