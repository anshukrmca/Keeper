import React, { useEffect, useState } from 'react'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BsPin } from "react-icons/bs";
import { MdNotificationImportant } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoColorPaletteOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { TbMailDown } from "react-icons/tb";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../redux/notes/noteSlice';
import { toast } from 'react-toastify';
import { CgNotes } from "react-icons/cg";
import { selectUser } from '../redux/user/userSlice';


const themeColors = [
  '#D2D7A6',
  '#A1C2D5',
  '#D08AA4',
  '#A3A8C9',
  '#F0CB83',
  '#B7CFA4',
  '#FFD699',
  '#9FC3C9',
  '#FFAB91',
  '#B3A5C3',
  '#FFEE58',
  '#8499A5',
  '#FFAB40',
  '#C5CC8C',
  '#26A69A',
  '#FF8A80',
  '#90CAF9',
  '#E0E0E0',
  '#8C9EFF',
  '#FFD180',
  '#A5D6A7',
  '#FFAB91',
  '#CE93D8',
  '#FFAB40',
  '#90A4AE',
  '#FFD54F',
  '#78909C',
  '#FFC400',
  '#D4E157',
  '#4DD0E1',
];

const DataView = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImaheOpen, setisImaheOpen] = useState(false)
  const dispatch = useDispatch();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [ThemeColor, setThemeColor] = useState("whitesmoke");
  const [formattedDateTime, setFormattedDateTime] = useState('');
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const formattedDateTime = new Date(item?.createdAt).toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setFormattedDateTime(formattedDateTime);
  }, []);

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
      dispatch(getNotes())
      setIsOpen(!isOpen);
      toast.error(data.message)
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed
    }
  };

  const toggleTheme = () => {
    setIsThemeOpen(!isThemeOpen);
  };
  const handleTheme = async (color) => {
    setThemeColor(color);
    setIsThemeOpen(!isThemeOpen);
  }

  return (
    <>
      <div className='group relative h-fit  rounded-md shadow-md border mb-4 flex flex-col bg-gray-100' style={{ backgroundColor: `${ThemeColor}` }}>
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
              <IoColorPaletteOutline className='cursor-pointer' onClick={() => { toggleTheme() }} />
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
                    <Link onClick={() => { setIsHistory(!isHistory) }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >
                      Version history
                    </Link>
                  </div>
                </div>
              )}
              {isThemeOpen && (
                <div className="z-[999] -mt-20 absolute right-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="grid grid-cols-8 gap-2 p-2"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {
                      themeColors.map((item, i) => {
                        return (
                          <div key={i}
                            onClick={() => { handleTheme(item) }}
                            className='w-6 h-6 cursor-pointer rounded-full'
                            style={{ backgroundColor: `${item}` }}></div>
                        )
                      })
                    }
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
      {isHistory &&
        <div className='fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='relative bg-white p-6 rounded-md'>
            <p className='text-gray-800 absolute top-4 right-4 cursor-pointer' onClick={() => { setIsHistory(false) }}>
              &#10060;
            </p>
            <p className='mb-4 font-semibold'>Version history</p>
            <p className='text-center font-extralight'>Download a previous version of your note in text format.</p>
            <div className='mx-2'>
              <h4 className='flex gap-4 items-center mt-3'><CgNotes/> {formattedDateTime}</h4>
              <p className='text-sm font-extralight'>Current Version</p>

              <p className='p-2 uppercase underline'>{currentUser?.username}</p>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default DataView