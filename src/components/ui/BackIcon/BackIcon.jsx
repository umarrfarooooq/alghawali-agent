"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const BackIcon = () => {
    const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  return (
    
        <div className='text-2xl font-semibold cursor-pointer'  onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M6 12.5C6 12.8842 6.14689 13.2119 6.45198 13.5056L15.2655 22.1271C15.5028 22.3757 15.8192 22.5 16.1808 22.5C16.9153 22.5 17.4915 21.935 17.4915 21.1893C17.4915 20.8277 17.3446 20.5 17.096 20.2514L9.15254 12.5L17.096 4.74859C17.3446 4.4887 17.4915 4.16102 17.4915 3.79944C17.4915 3.06497 16.9153 2.5 16.1808 2.5C15.8192 2.5 15.5028 2.62429 15.2655 2.87288L6.45198 11.4943C6.14689 11.7881 6.0113 12.1158 6 12.5Z" fill="#333333"/>
        </svg></div>
  )
}

export default BackIcon
