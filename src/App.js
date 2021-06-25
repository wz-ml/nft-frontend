import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Header } from './compound/common';
import Marketplace from "./components/Marketplace";
import SignIn from './components/SignIn';
import './App.css';

class App extends React.Component{
  render(){
    return (
      <div className = "App">
        <Header />
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/marketplace">Marketplace</Link>
              </li>
              <li>
                <Link to='/SignIn'>SignIn</Link>
              </li>
            </ul>
            <Route exact path="/" component={Home} />
            <Route path="/marketplace" component={Marketplace} />
            <Route path="/SignIn" component={SignIn}/>
          </div>
        </Router>
      </div>
    );
  }
}

// next line is very temporary
class Home extends React.Component{
  render(){
    return(
      <div>
        <h2>home</h2>
      </div>
    );
  }
}

export default App;
