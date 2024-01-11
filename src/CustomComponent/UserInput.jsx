import React, { FC } from 'react'

export const UserInput = ({setFilterData,filterData}) => {
  return (
    <div className='inputs'>
        <input type='text' 
        value={filterData}
        onChange={(e)=>setFilterData(e.target.value)}
        placeholder='Search With FirstName'
        className='input-box'/>
    </div>
  )
}
