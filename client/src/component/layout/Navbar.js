import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import LogoutBtn from '../auth/LogoutBtn';

const Navbar = () => {

  const { LogggedIn } = useContext(AuthContext);

  return (
 
    <div>

      <Link to="/">Home</Link>

      {
        LogggedIn === false && (
          <>

            <Link to="/registration">Registration</Link>
            <Link to="/login">Login</Link>

          </>
        )
      }

      {
        LogggedIn === true && (
          <>
          <Link to="/customer">Customer</Link>
           <LogoutBtn/>
          </>
        ) 
      }

    </div>
  )
}

export default Navbar
