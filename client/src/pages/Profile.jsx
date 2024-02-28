import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { selectUser } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { set } from 'mongoose';
import axios from 'axios';

export default function Profile({ setSideBarOpen, SideBarOpen }) {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate()

  const currentUser = useSelector(selectUser);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
      console.log(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
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
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`);
      const data = res.data;
      toast.success(data);
      sessionStorage.removeItem("token");
      setTimeout(() => {
        navigate('/');
      }, 2000);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };


  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      sessionStorage.removeItem("token");
      toast.success("Logout")
      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Header setSideBarOpen={setSideBarOpen} SideBarOpen={SideBarOpen} />
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePicture || currentUser?.profilePicture}
            alt='profile'
            className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
            onClick={() => fileRef.current.click()}
          />
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
          <input
            defaultValue={currentUser?.username}
            type='text'
            id='username'
            placeholder='Username'
            className='bg-slate-100 rounded-lg p-3'
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser?.email}
            type='email'
            id='email'
            placeholder='Email'
            className='bg-slate-100 rounded-lg p-3'
            onChange={handleChange}
          />
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='bg-slate-100 rounded-lg p-3'
            onChange={handleChange}
          />
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Update
          </button>
        </form>
        <div className='flex justify-between mt-5'>
          <span
            onClick={handleDeleteAccount}
            className='text-red-700 cursor-pointer'
          >
            Delete Account
          </span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
            Sign out
          </span>
        </div>
        <p className='text-green-700 mt-5'>
          {updateSuccess && 'User is updated successfully!'}
        </p>
      </div>
    </>
  );
}
