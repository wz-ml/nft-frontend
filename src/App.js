import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Header } from './compound/common';
import Marketplace from "./components/Marketplace";
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
            </ul>

            <Route exact path="/" component={Home} />
            <Route path="/marketplace" component={Marketplace} />
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
