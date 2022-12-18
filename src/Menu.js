import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css"

export default function Menu() {
  return (
    <header>
      <nav class="navbar">
        <ul>
          <li class = "menu">
            <Link to="/">ÍNICIO </Link>{" "}
          </li>
          <li class = "menu">
            <Link to="/cadastro"> CADASTRO </Link>
          </li>
          <li class = "menu">
            <Link to="/sobre"> SOBRE </Link>
          </li>
         
        </ul>
      </nav>
    </header>
  );
}
