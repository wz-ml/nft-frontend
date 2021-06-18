import React from 'react';
import { Header } from './compound/common';
import Marketplace from "./components/Marketplace";
import './App.css';

function App() {
  return (
    <div className = "App">
      <Header />
      <Marketplace />
    </div>
  );
}

export default App;
