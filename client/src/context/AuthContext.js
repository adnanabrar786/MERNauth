import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

const AuthContext = createContext();

const AuthContextProvider = (props) => {

  const [LogggedIn, setLogggedIn] = useState(undefined);


  const getLoggedin = async () => {
    const LoggedInRes = await axios.get("http://localhost:5000/auth/loggedIn")
    setLogggedIn(LoggedInRes.data)
  }


  useEffect(() => {
    getLoggedin()
  }, [])


  return (
    <AuthContext.Provider value={{ LogggedIn, getLoggedin }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthContextProvider }
