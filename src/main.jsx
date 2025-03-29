import React from "react";
import App from "./App";
import  "./index.css";
import ReactDom from "react-dom/client"
const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>)