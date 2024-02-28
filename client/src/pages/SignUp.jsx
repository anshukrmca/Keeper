import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import Header from '../components/Header';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signup',formData);
      const data = res.data;
      console.log(data);
      toast.success(data.message)
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000);
    } catch (error) {
      toast.error('Email is already exist')
    }
  };
  return (
    <>
      <Header />
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Username'
            id='username'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            id='email'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            id='password'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <button
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            Sign Up
          </button>
          <OAuth />
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to='/sign-in'>
            <span className='text-blue-500'>Sign in</span>
          </Link>
        </div>
      </div>
    </>
  );
}
