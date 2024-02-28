import { useEffect, useRef, useState } from 'react'
import { FaRegCheckSquare } from "react-icons/fa";
import { BsImageFill } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { MdNotificationImportant } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoColorPaletteOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { TbMailDown } from "react-icons/tb";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../redux/notes/noteSlice';
import { toast } from 'react-toastify';
import { selectUser } from '../redux/user/userSlice';

const InputForm = () => {
    const dispatch = useDispatch()
    const [addNew, setaddNew] = useState(false)
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const currentUser = useSelector(selectUser);

    const [formData, setFormData] = useState({
        userId: '',
        noteTitle: '',
        noteContent: '',
        NotePicture: ''
    });

useEffect(()=>{
if(currentUser){
    setFormData({
        userId:currentUser._id
    })
}
},[currentUser])

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
            console.log(image);
        }
    }, [image]);

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = `noteImage/${new Date().getTime()}_${image.name}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, NotePicture: downloadURL })
                );
            }
        );
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            toast.success(data.message)
            dispatch(getNotes());
            setaddNew(!addNew);
            setFormData({
                userId: '',
                noteTitle: '',
                noteContent: '',
                NotePicture: ''
            })
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <div className='mb-4 p-2 bg-gray-200/30 rounded-md shadow-md'>
                {!addNew ?
                    <div className='gap-2 items-center mx-auto flex' >
                        <div
                            onClick={() => { setaddNew(!addNew) }}
                            className='w-full bg-transparent outline-none'
                        >Take a Note</div>
                        <div className='flex gap-2'>
                            <FaRegCheckSquare size={18} className='hover:bg-slate-300/50 rounded-full p-2 h-10 w-10 cursor-pointer' />
                            <GoPencil onClick={() => { setOpen(!open) }} size={20} className='hover:bg-slate-300/50 rounded-full p-2 h-10 w-10 cursor-pointer' />
                            <BsImageFill type='file' size={20} className='hover:bg-slate-300/50 rounded-full p-2 h-10 w-10 cursor-pointer' />
                        </div>
                    </div>

                    : <div className='p-2  ease-in-out duration-300'
                        enter="ease-out duration-300"
                        leave="ease-in duration-600"
                    >
                        <input
                            type='text'
                            value={currentUser?._id}
                            hidden
                            id="userId"
                            onChange={handleChange}
                        />
                        <input type='text'
                            placeholder='Title'
                            id='noteTitle'
                            className='w-full bg-transparent outline-none mb-2'
                            onChange={handleChange} />
                        <textarea
                            type='text'
                            id='noteContent'
                            placeholder='Take a Note'
                            className='w-full bg-transparent outline-none mb-2'
                            onChange={handleChange}
                        />
                        {image &&
                            <div>
                                <img
                                    className='w-full h-60 object-contain'
                                    src={formData.NotePicture}
                                    alt='Image' />

                                <p className='text-sm self-center'>
                                    {imageError ? (
                                        <span className='text-red-700'>
                                            Error uploading image (file size must be less than 2 MB)
                                        </span>
                                    ) : imagePercent > 0 && imagePercent < 100 ? (
                                        <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
                                    ) : imagePercent === 100 ? (
                                        <span className='text-green-700'>Image uploaded successfully</span>
                                    ) : (
                                        ''
                                    )}
                                </p>
                            </div>
                        }
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-between text-xl p-2 w-1/2'>
                                <MdNotificationImportant className='cursor-pointer' />
                                <IoPersonAddOutline className='cursor-pointer' />
                                <IoColorPaletteOutline className='cursor-pointer' />
                                <label htmlFor="fileInput">
                                    <CiImageOn className='cursor-pointer' onClick={() => fileRef.current.click()} />
                                    <input
                                        type='file'
                                        ref={fileRef}
                                        hidden
                                        accept='image/*'
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </label>
                                <TbMailDown className='cursor-pointer' />
                            </div>
                            <div className='flex gap-8'>
                                <p className='cursor-pointer text-green-600' onClick={handleSubmit}>Save</p>
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