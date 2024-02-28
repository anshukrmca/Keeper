import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
   const token = sessionStorage.getItem("token")
  return token ? <Outlet/> : <Navigate to='/sign-in'/>
}
