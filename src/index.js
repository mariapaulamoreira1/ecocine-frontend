import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sobre from "./Sobre";
import Menu from "./Menu";
import Elementos from "./Elementos";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Menu/>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="sobre" element={<Sobre />} />
      <Route path="cadastro" element={<Elementos />} />
    </Routes>
  </BrowserRouter>
);







// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

