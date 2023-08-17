import React from 'react';
import { Triangle } from 'react-loader-spinner';
const Spninner = () => {
  return (
    <div className='relative -top-1/2 left-1/2'>
    <Triangle
    height="80"
    width="80"
    color="rgb(107, 114, 128)"
    ariaLabel="triangle-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
  /></div>
  )
}

export default Spninner