import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdMenu } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { FaNotesMedical } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { getCurrentUserInfo, selectUser } from '../redux/user/userSlice';


export default function Header({ setSideBarOpen, SideBarOpen }) {

  const { currentUser } = useSelector((state) => state.user);
  const token = sessionStorage.getItem("token");
  const disptach = useDispatch()
const CurrentUSer = useSelector(selectUser);


  useEffect(() => {
    if (token) {
      disptach(getCurrentUserInfo());
    }
  }, [token,disptach])

  return (
    <>
      <ToastContainer />
      <div className="flex w-[100%] sticky top-0 items-center justify-between gap-4 bg-gray-100 p-2 px-4 shadow-md z-50">
        <div className="flex flex-shrink-0 gap-3 items-center">
          {token &&
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
          <IoIosSearch size={25} />
          <input
            type='text'
            placeholder='Search..'
            className='w-full bg-transparent outline-none'
          />
        </div>

        <div className='flex gap-2 items-center'>
          {token &&
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
            token ?

              <Link to='/profile' className='border-2 border-black/20 rounded-full'>
                <img
                  className="h-8 w-8 rounded-full cursor-pointer"
                  src={CurrentUSer?.profilePicture}
                  alt=""
                />
              </Link>
              :
              <Link to='/sign-in'>Sign In</Link>
          }
        </div>
      </div>
    </>
  );
}
