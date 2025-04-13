import React from 'react'
import { Link, useResolvedPath } from 'react-router-dom'
import { ShoppingBag, ShoppingCartIcon } from 'lucide-react'
import ThemeSelector from './ThemeSelector'

function Navbar() {
  const { pathname } = useResolvedPath()
  const isHomePage = pathname === '/'


  return (
    <div className='bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='navbar px-4 min-h-[4rem] justify-between'>
          {/* LOGO */}
          <div className='flex-1 lg:flex-none'>
            <Link to="/" className='hover:opacity-80 transition-opacity'>
              <div className='flex item-center gap-2'>
                {/* <ShoppingCartIcon className='size-9 text-primary' /> */}
                <img src="https://cdn.discordapp.com/attachments/1129825894630953080/1361070269204136258/logo1.png?ex=67fd6af7&is=67fc1977&hm=b76ab96031283d5075eec6f8f33146556d0aec030f7a0d0ca800858f045c88d9&" alt="logo" className='size-10 scale-150'/>
                <span
                  className='font-bold font-mono tracking-widest text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'
                >
                  Meow
                </span>
              </div>
            </Link>
          </div>

          {/* Right Side section */}
          <div className='flex items-center gap-4'>
            <ThemeSelector/>

            {isHomePage && (

              <div className='indicator'>
                <div className='p-2 rounded-full hover:bg-base-200 transition-colors'>
                  <ShoppingBag className='size-5'/>
                  <span className='badge badge-sm badge-primary indicator-item'>
                    {/* {Products.length} */} 8
                  </span>
                  </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar
