import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Notes from './pages/Notes';
import { useState } from 'react';

export default function App() {

  const [SideBarOpen, setSideBarOpen] = useState(false);
  return (
    <BrowserRouter>
      {/* header */}
      {/* <Header setSideBarOpen={setSideBarOpen} SideBarOpen={SideBarOpen} /> */}
      <Routes>
        <Route path='/' element={<Home setSideBarOpen={setSideBarOpen} SideBarOpen={SideBarOpen} />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile setSideBarOpen={setSideBarOpen} SideBarOpen={SideBarOpen}/>} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/note' element={<Notes setSideBarOpen={setSideBarOpen} SideBarOpen={SideBarOpen}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
