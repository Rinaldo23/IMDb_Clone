import React from 'react'

function Pagination({ pageNumber, previousPage, nextPage }) {

  return (
    <div className='flex justify-center pt-2 md:pt-8 text-sm md:text-xl bg-gray-900'>
      <button onClick={previousPage} className='mb-8 border-black border-2 border-indigo-500 p-1 pl-2 pr-2 md:p-2 text-white  border-r-0 rounded-l-xl'>Prev</button>
      <button className='mb-8 border-black border-2 border-indigo-500 p-1 pl-2 pr-2  md:p-2 text-white '>{pageNumber}</button>
      <button onClick={nextPage} className='mb-8 border-black border-2 border-indigo-500 p-1 pl-2 pr-2 md:p-2 text-white border-l-0 rounded-r-xl'>Next</button>
    </div>
  )
}

export default Pagination