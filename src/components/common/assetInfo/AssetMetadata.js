import React from 'react'
import "./AssetMetadata.css";

export default class AssetMetadata extends React.Component {
  render() {
    const { asset } = this.props

    var assetAddr = asset.tokenAddress; //asset.asset_contract.address;
    var assetId = asset.tokenId; //asset.token_id;
    return (
      <React.Fragment>
        <div className="card-container">
          <div className="img-container">
            <a target="_blank" rel="noopener noreferrer" className="text-center d-inline-block m-100" href={`/asset/${assetAddr}/${assetId}`}>
              <img
                className="card-image"
                alt="Asset artwork"
                src={asset.imageUrl} />
            </a>
          </div>
            
          <div className="card-body h-25">
            <div className="card-text text-truncate">
              <a target="_blank" rel="noopener noreferrer" href={`/asset/${assetAddr}/${assetId}`} className="card-link">
                <h5>{asset.name} {asset.assetContract.name}</h5>
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
