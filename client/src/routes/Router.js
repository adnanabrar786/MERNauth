import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../component/layout/Home";
import Navbar from "../component/layout/Navbar";
import Registration from "../component/auth/Registration";
import Login from "../component/auth/Login";
import AuthContext from "../context/AuthContext";
import Customers from "../component/customers/Customers";



function Router() {

  const { LogggedIn } = useContext(AuthContext)

  return (
    <>

      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          {
            LogggedIn === false && (
              <>
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
              </>
            )
          }

          {
            LogggedIn === true && (
              <>
                <Route path="/customer" element={<Customers />} />
              </>
            )
          }



        </Routes>

      </BrowserRouter>
    </>

  );

}


export default Router


