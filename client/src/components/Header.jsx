import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoMdMenu } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { CgMenuGridR } from "react-icons/cg";
import { useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { FaNotesMedical } from "react-icons/fa";

export default function Header({ setSideBarOpen, SideBarOpen }) {

  const { currentUser } = useSelector((state) => state.user);
  
  console.log(currentUser);



  return (
    <div className="flex w-[100%] sticky top-0 items-center justify-between gap-4 bg-gray-100 p-2 px-4 shadow-md z-50">
      <div className="flex flex-shrink-0 gap-3 items-center">
        {currentUser &&
          <IoMdMenu className='cursor-pointer' size={30} onClick={() => { setSideBarOpen(!SideBarOpen) }} />}
        <Link to='/' className="flex flex-shrink-0 gap-1 items-center">
          <img
            className="h-8 w-auto"
            src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
            alt="Your Company"
          />
          <p className='font-semibold underline hidden md:block'>Keeper</p>
        </Link>
      </div>
      <div className='bg-gray-300/30 p-2 rounded-md gap-2 items-center w-[400px] hidden md:flex'>
        <IoIosSearch size={25} className='hover:bg-slate-400 w-10' />
        <input
          type='text'
          placeholder='Search..'
          className='w-full bg-transparent outline-none'
        />
      </div>

      <div className='flex gap-2 items-center'>
        {currentUser &&
          <>
            <Link to='/'>
              <IoHomeOutline className='hover:bg-slate-300/50 rounded-full p-2 h-10 w-10 cursor-pointer' />
            </Link>
            <Link to='/note'>
              <FaNotesMedical className='hover:bg-slate-300/50 rounded-full p-2 h-10 w-10 cursor-pointer' />
            </Link>

            
            <CgMenuGridR className='hover:bg-slate-300/50 rounded-full p-2 h-10 w-10 cursor-pointer' />
          </>
        }
        {
          currentUser ?

            <Link to='/profile' className='border-2 border-black/20 rounded-full'>
              <img
                className="h-8 w-8 rounded-full cursor-pointer"
                src={currentUser?.profilePicture}
                alt=""
              />
            </Link>
            :
            <Link to='/sign-in'>Sign In</Link>
        }
      </div>
    </div>
  );
}
