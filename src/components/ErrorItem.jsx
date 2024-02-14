import React from 'react'
import errorItem from '../assets/img/errorData.jpg'

const ErrorItem = () => {
  return (
    <>
      <div className='row'>
         <div className='col-12'>
            <div className='errorItem-container'>
                <img src={errorItem} alt='No-items' loading='lazy' />
                <h4>No items found</h4>
            </div>
         </div>
      </div>
    </>
  )
}

export default ErrorItem