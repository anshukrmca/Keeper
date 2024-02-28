import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await axios.post('/api/auth/google', {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,

      });
      const data = res.data;
      sessionStorage.setItem("token",data.token)
      toast.success(data.massage);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log('could not login with google', error);
    }
  };
  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}
