import React from 'react';
import styled from 'styled-components';
import Log from './Log'
import "./index.css";
import { OpenSeaPort, Network } from 'opensea-js';
import Sidebar from "./Sidebar";
import { web3Provider, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL } from '../../constants';


export default class Marketplace extends React.Component {

  state = {
    accountAddress: null
  }

  constructor(props) {
    super(props)
    this.onChangeAddress()
    onNetworkUpdate(this.onChangeAddress)
  }

  onChangeAddress = () => {
    this.seaport = new OpenSeaPort(web3Provider, {
      networkName: Network.Main
    })
    this.web3 = this.seaport.web3
    this.web3.eth.getAccounts((err, res) => {
      if(!res){
        this.setState({
          accountAddress: "",
        });

        return;
      }
      this.setState({
        accountAddress: res[0]
      })
    })
  }

  render() {
    return (
      <div>
        <a href={GITHUB_URL}>
          <ImgRibbon src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub" />
        </a>
        <Header>
          <h1 className="title">
            The Ship's Log
          </h1>
          <h4 className="subtitle">
          Lorem ipsum sit amet, consectetur adipiscing elit.
          </h4>
          <h6>
            <a target="_blank" rel="noopener noreferrer" href={OPENSEA_JS_URL}>
              <img alt="OpenSea logo" className="mr-2" src="/opensea-logo.png" />OpenSea.js
            </a> example dapp
          </h6>
        </Header>
        <Sidebar />
        <main>
          <Log
            seaport={this.seaport}
            accountAddress={this.state.accountAddress} />
        </main>
      </div>
    )
  }
}

const Header = styled.header`
  border-bottom: 1px solid lightgrey;
  padding: 10px;
  text-align: center;
  background-color: #f4f9fd;

  h6 img {
    width: 24px;
  }
`

const ImgRibbon = styled.img`
  width: 150px;
  position: absolute;
  top: 0;
  right: 0;
  border: 0;

  @media(max-width: 600px) {
    width: 80px;
  }
`