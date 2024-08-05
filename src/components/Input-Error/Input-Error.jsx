import React from 'react'

const InputError = ({errorMessage}) => {
  return (
    <div>
      <div className='flex items-center gap-1'>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6.9987 5.00016H7.00536M6.33203 7.00016H6.9987V9.66683H7.66536" stroke="#CD2424" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 1C11.8 1 13 2.2 13 7C13 11.8 11.8 13 7 13C2.2 13 1 11.8 1 7C1 2.2 2.2 1 7 1Z" stroke="#CD2424" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </div>
        <div className='text-[0.6875rem] text-[#CD2424]'>
            {errorMessage || "something went wrong"}
        </div>
      </div>
    </div>
  )
}

export default InputError
