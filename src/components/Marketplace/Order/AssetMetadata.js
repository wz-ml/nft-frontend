import React from 'react'
import "./AssetMetadata.css";

export default class AssetMetadata extends React.Component {
  render() {
    const { asset } = this.props

    return (
      <React.Fragment>
        <div className="card-container">
          <div className="img-container">
            <a target="_blank" rel="noopener noreferrer" className="text-center d-inline-block m-100" href={asset.openseaLink}>
              <img
                className="card-image"
                alt="Asset artwork"
                src={asset.imageUrl} />
            </a>
          </div>
            
          <div className="card-body h-25">
            <div className="card-text text-truncate">
              <a target="_blank" rel="noopener noreferrer" href={asset.openseaLink} className="card-link">
                <h5>{asset.name} {asset.assetContract.name}</h5>
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
