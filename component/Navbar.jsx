import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full justify-end flex px-4 gap-4 py-4  font-thin'>
       <p>Home</p>
       <p>Data</p>
       <Link href='/login'>
       <p>Login</p>
       </Link>
    </div>
  )
}

export default Navbar
