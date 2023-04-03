import React from 'react'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'

const Navbar = () => {
    return (
        <nav className="flex justify-between mx-10">
            <h3 className='text-xl font-extrabold'>Company Communication</h3>
            <ul className='flex justify-around'>
                <Link href='/' className='ml-3'><li>Home</li></Link>
                <Link href='/about' className='ml-3'><li>About</li></Link>
                <Link href='/blog' className='ml-3'><li>Blog</li></Link>
                <Link href='/contact' className='ml-3'><li>Contact</li></Link>
                {/* <div className="font-bold ml-3">
                    <button onClick={() => signIn()}>SignIn</button>
                </div>
                <Link href='/auth/user-signup' className='ml-3 font-bold'><li>Sign Up</li></Link> */}
            </ul>
        </nav>
    )
}

export default Navbar