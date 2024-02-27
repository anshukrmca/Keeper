import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import DataView from '../components/DataView'
import InputForm from '../components/InputForm'
import { FaList } from 'react-icons/fa'
import { CiGrid41 } from 'react-icons/ci'
import { useSelector } from 'react-redux'

const Notes = ({ setSideBarOpen, SideBarOpen }) => {
  const [listView, setListView] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
const [note,setnote]= useState(null)

  useEffect(() => {
    const fetchData = async () => {
      // Check if currentUser is defined before making the fetch
      if (!currentUser) {
        return;
      }
  
      try {
        const res = await fetch(`/api/note/${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setnote(data.note);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error as needed
      }
    };
  
    fetchData();
  }, [currentUser]);

  console.log(note)

  return (
    <>
      <Header setSideBarOpen={setSideBarOpen} SideBarOpen={SideBarOpen} />
      <div className='mx-4 md:mx-24 h-full justify-center'>
        <div className='w-full  mt-4 gap-4 md:flex justify-between items-center'>
          <div className='md:w-3/4'>
            <InputForm />
          </div>
          <div className='md:w-1/4 flex items-center gap-4 justify-center'>
            <p className='text-sm'>View mode :</p>
            {listView ?
              <FaList onClick={() => { setListView(!listView) }} className='hover:bg-slate-300/50 rounded-full p-2 h-10 w-10 cursor-pointer' />
              :
              <CiGrid41 onClick={() => { setListView(!listView) }} className='hover:bg-slate-300/50 rounded-full p-2 h-10 w-10 cursor-pointer' />
            }
          </div>
        </div>

        <div className={`${listView ? 'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4' : ''}`}>
          {note && note.map((item, i) => {
            return (
              <DataView item={item} key={i} />
            )
          })}
        </div>

      </div>
    </>

  )
}

export default Notes