import React, { Component } from 'react'

export class Newsier extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card" > <span className="position-absolute   rounded-pill bg-danger" style={{ display: 'flex', justifyContent: 'flex-end', right: '0' }} >
          {source}
        </span>
          <img src={!imageUrl ? "https://1000logos.net/wp-content/uploads/2021/10/Batman-Logo.png" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text text-success"><small className="text-body-secondary">by {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <p className="card-text">{description}...</p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsier
