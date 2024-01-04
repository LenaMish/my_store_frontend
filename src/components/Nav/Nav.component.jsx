import "./Nav.component.css"
import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../../context/context";
import { useJwt } from "react-jwt"

const PAGES = [
    {name: "Home", url: "/"},
    {name: "Login", url: "/login"},
    {name: "Register", url: "/register"}
];
const settings = [
    {name: "Account", url: "/account"},
    {name: "Shopping Cart", url: "/shopping-cart"},
    {name: "Logout", url: "/logout"}
];
const adminSettings = [
  {name: "Add product", url: "/add-product"}
]

const Nav = () => {
    const { token } = useContext(TokenContext)
    const { decodedToken, isExpired } = useJwt(token)

    const navigate = useNavigate()

    let pages = null
    if(token != null) {
        pages = PAGES.filter(page => page.name !== "Register" && page.name !== "Login") 
    } else {
        pages = PAGES;
    }

    let accountLinks = ""
    if(token != null) {
      accountLinks = <ul className="menu">{settings.map(page => <li><Link to={page.url}>{page.name}</Link></li>)}</ul>
    }

    console.log(decodedToken)
    console.log("Expired " + isExpired)

    return(
      <nav>
        <div id="left-container" className="left-margin">
          <p>My Store</p>
          <ul className="menu">
            {pages.map(page => <li><Link to={page.url}>{page.name}</Link></li>)}
          </ul>
        </div>
        <div id="right-container" className="right-margin">
          {accountLinks}
        </div>
      </nav>
    )
}

export default Nav;