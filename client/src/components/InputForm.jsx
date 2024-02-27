import { useState } from 'react'
import { FaRegCheckSquare } from "react-icons/fa";
import { BsImageFill } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { MdNotificationImportant } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoColorPaletteOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { TbMailDown } from "react-icons/tb";

const InputForm = () => {
    const [addNew, setaddNew] = useState(false)

    return (
        <>
            <div className='mb-4 p-2 bg-gray-200/30 rounded-md shadow-md'>
                {!addNew ?
                    <div className='gap-2 items-center mx-auto flex' onClick={() => { setaddNew(!addNew) }}>
                        <input
                            type='text'
                            placeholder='Take a Note'
                            className='w-full bg-transparent outline-none'
                        />
                        <div className='flex gap-2'>
                            <FaRegCheckSquare size={18} className='hover:bg-slate-300/50 rounded-full p-2 h-10 w-10 cursor-pointer' />
                            <GoPencil onClick={() => { setOpen(!open) }} size={20} className='hover:bg-slate-300/50 rounded-full p-2 h-10 w-10 cursor-pointer' />
                            <BsImageFill size={20} className='hover:bg-slate-300/50 rounded-full p-2 h-10 w-10 cursor-pointer' />
                        </div>
                    </div>

                    : <div className='p-2  ease-in-out duration-300'
                        enter="ease-out duration-300"
                        leave="ease-in duration-600"
                    >
                        <input type='text'
                            placeholder='Title'
                            className='w-full bg-transparent outline-none mb-2' />
                        <textarea
                            type='text'
                            placeholder='Take a Note'
                            className='w-full bg-transparent outline-none mb-2'
                        />
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-between text-xl p-2 w-1/2'>
                                <MdNotificationImportant className='cursor-pointer' />
                                <IoPersonAddOutline className='cursor-pointer' />
                                <IoColorPaletteOutline className='cursor-pointer' />
                                <CiImageOn className='cursor-pointer' />
                                <TbMailDown className='cursor-pointer' />
                            </div>
                            <div className='flex gap-8'>
                                <p className='cursor-pointer text-green-600' onClick={() => { setaddNew(false) }}>Save</p>
                                <p className='cursor-pointer text-red-500' onClick={() => { setaddNew(false) }}>Close</p>
                            </div>

                        </div>
                    </div>
                }
            </div>



        </>
    )
}

export default InputForm