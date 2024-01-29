import React from 'react'
import { Link } from "react-router-dom";


export const Navigation = () => {
    return (
        <>
            <div className="container">
               <div id='heading'><h1 >TUTORIAL APP</h1></div> 
                <div className='bg'>
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                        <ul className="navbar-nav navibar ">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/usersignup">User Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/userlogin">User Login</Link>

                            </li>
                         
                        </ul>
                    </nav>
                </div>
                
            </div>
        </>
    )
}
