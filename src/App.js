import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Header, Navbar} from './compound/common';
import Marketplace from "./components/Marketplace";
import SignIn from './components/SignIn';
import Asset from "./components/Asset";
import './App.css';

function App(){
  return (
    <div className = "App">
      <Header />
      <Navbar />
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
              <Link to='/signin'>Sign In</Link>
            </li>
            <li>
              <Link to="/asset">Asset</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/signin" component={SignIn}/>
          <Route path="/asset" component={Asset} />
        </div>
      </Router>
    </div>
  );
}

// next line is very temporary
function Home(){
  return(
    <div>
      <h2>home</h2>
    </div>
  );
}

export default App;
