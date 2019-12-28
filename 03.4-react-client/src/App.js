import React from 'react';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";


// import logo from './logo.svg';
import './App.css';
import UserList from './components/Users/UserList/UserList';
import UserForm from './components/Users/UserForm/UserForm';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route exact path="/">
          <p>Strona główna</p>
        </Route>
        <Route exact path="/users" component={UserList} />
        <Route exact path="/users/form" component={UserForm}/>
      </Switch>


    </div>
  );
}

export default App;
