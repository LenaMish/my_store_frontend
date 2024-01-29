import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/Nav.component';
import Content from './components/Content/Content.component';
import { BrowserRouter } from "react-router-dom";
import { ShoppingCartContext, TokenContext } from './context/context';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [shoppingCartCount, setShoppingCartCount] = useState(localStorage.getItem("token"))

  return (
    <div>
      <TokenContext.Provider value={{token: token, setToken: setToken}}>
        <ShoppingCartContext.Provider value={{shoppingCartCount: shoppingCartCount, setShoppingCartCount: setShoppingCartCount}}>
        <BrowserRouter>
          <Nav />
          <Content />
          <Toaster/>
        </BrowserRouter>
        </ShoppingCartContext.Provider>
      </TokenContext.Provider>

    </div>
  );
}

export default App;
