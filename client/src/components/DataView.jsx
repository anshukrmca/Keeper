import React, { useState } from 'react'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BsPin } from "react-icons/bs";
import { MdNotificationImportant } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoColorPaletteOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { TbMailDown } from "react-icons/tb";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const DataView = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImaheOpen, setisImaheOpen] = useState(false)
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handledelete = async (id) => {
    try {
      const res = await fetch(`/api/note/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed
    }
  };

  return (
    <>
      <div className='group relative  rounded-md shadow-md border mb-4 flex flex-col bg-gray-100'>
        <div className='group-hover:block hidden absolute -mt-2 transform -translate-x-1/2'>
          <IoIosCheckmarkCircle size={20} />
        </div>
        <div className='flex justify-between p-2 items-center'>
          <p className='font-semibold'>{item?.noteTitle}</p>
          <BsPin className='group-hover:block hidden' />
        </div>
        <div className='p-2'>
          {item?.noteContent}
        </div>
        <div className='bg-gray-200/50 h-10 mt-2'>
          <div className='group-hover:block hidden'>
            <div className='flex justify-between text-xl p-2'>
              <MdNotificationImportant className='cursor-pointer' />
              <IoPersonAddOutline className='cursor-pointer' />
              <IoColorPaletteOutline className='cursor-pointer' />
              <CiImageOn onClick={() => { setisImaheOpen(!isImaheOpen) }} className='cursor-pointer' />
              <TbMailDown className='cursor-pointer' />
              <IoEllipsisVerticalSharp className='cursor-pointer' onClick={toggleDropdown} />


              {isOpen && (
                <div className="z-[999] -mt-20 absolute right-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link onClick={() => { handledelete(item._id) }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >
                      Delete Note
                    </Link>
                    <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >
                      Version history
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      {isImaheOpen &&
        <div className='fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='relative bg-white p-6 rounded-md'>
            <p className='text-gray-800 absolute top-4 right-4 cursor-pointer' onClick={() => { setisImaheOpen(false) }}>
              &#10060;
            </p>
            <p className='mb-4 font-semibold'>Note Image</p>
            {item.NotePicture ?
              <img className='h-[300px] w-[300px] object-contain' src={item.NotePicture} alt='image' />
              : <p className='h-48 w-48 text-center'>You have no Image for this Note</p>
            }
          </div>
        </div>

      }
    </>
  )
}

export default DataView