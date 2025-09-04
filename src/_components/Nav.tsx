'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@mui/material';
import { useSession, signIn, signOut } from "next-auth/react"

const Nav = () => {
  const isUserLoggedIn = true;
  const [dropDown, setDropdown] = useState(false);
  return (
    <nav className='w-full flex justify-between  mb-16 px-3 py-3'>
      <Link href={"/"} className=' flex gap-3 justify-center'>
        <Image 
          src="/assets/images/logo.svg" 
          alt="logo" 
          width={30}
          height={30}
          className='object-contain'/>
        <p className='m-auto logo_text '>Promptopia</p>
      </Link>
      {/* {desktop navigation} */}
      <div className=' sm:flex hidden items-center '>
        {isUserLoggedIn ?
        <div className='flex gap-3 md:gap-5'>
          <Link href="/create-prompt" className='black_btn'>
            <p>Create Post</p>
          </Link>
          <button  
            type='button'
            className='outline_btn'
          >
            SignOut
          </button>
          <Link
            href="/profile">
              <Image 
                src="/assets/images/user.png" 
                alt="logo" 
                width={37}
                height={37}
                className='object-contain'
              />
          </Link>
        </div>
        :  
        <div className='flex gap-3 md:gap-5'>
          <button  type='button' className='outline_btn'>
            SignIn
          </button>
          <Link href="/profile">
              <Image 
                src="/assets/images/user.png" 
                alt="logo" 
                width={37}
                height={37}
                className='object-contain'
              />
          </Link>
        </div>
        }
      </div>
      {/* {mobile navigation} */}
      <div className='sm:hidden'>
          <Button
            onClick={() => {setDropdown((prev) => !prev)}}>
            <Image 
              src="/assets/images/user.png"
              alt="logo" 
              width={37}
              height={37}
              className='object-contain'
            />
          </Button>
          {dropDown && (
            <div className='dropdown'>
              <div className=' dropdown-content'>
                {isUserLoggedIn ? <>
                  <Link
                    href="/profile"
                    className='dropdown_link' 
                    onClick={() => setDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className='dropdown_link' 
                    onClick={() => setDropdown(false)}
                  >
                    Create Prompt
                  </Link> 
                  <Link
                    href='/'
                    className=' my-3 mx-3 black_btn text-center'
                    onClick={() => {      
                      signOut();
                    }}
                  >
                    Sign Out  
                  </Link>
                </> : 
                <Link 
                  href='/signIn'
                  className='dropdown_link w-full black_btn'
                  onClick={(prev) => {
                    signIn();
                  }}
                >
                  Sign In
                </Link>
                }
              </div>
              
            </div>
          )}
      </div>
    </nav>
  )
}

export default Nav