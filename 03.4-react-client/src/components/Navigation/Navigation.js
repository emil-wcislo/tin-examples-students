import React from 'react';
import './Navigation.css';

import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
  } from "react-router-dom";

export default (props) => {
    return (
        <nav className="main-nav">
            <div>
                <Link to="/">Strona główna</Link>
                <Link to="/users">Użytkownicy</Link>
            </div>
            <div>
            </div>
        </nav>
    )
}