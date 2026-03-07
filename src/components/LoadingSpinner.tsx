import React, { Component } from 'react'
import loading from "../../public/loading_Img.gif"

export class LoadingSpinner extends Component {

  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={loading} alt="loading" />
      </div>
    )
  }
}

export default LoadingSpinner


//! update (if noting to show)