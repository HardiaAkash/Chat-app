import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
export const Usersignup = () => {

    const [inputdata, setInputdata] = useState({
        username :"",
        useremail: "",
        userpassword :"",
    });
   
    const [userdata, setUserdata] = useState([]);
    useEffect(() => {
        let olddata = JSON.parse(localStorage.getItem("users"));
        
        if(olddata?.length >0) {
            setUserdata(olddata);
        }
    }, []);
    const inputHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputdata({...inputdata, [name]: value})
    }
    const formHandler = (event)=>{
        event.preventDefault();
        setUserdata([...userdata, inputdata]);
        setInputdata({
            username: '',
            useremail: "",
            userpassword: ""
        });
        
    }
useEffect(() => {
  localStorage.setItem("users", JSON.stringify(userdata));  
}, [userdata])


    return (
        <>
        {/* <Navigation/>
        <Outlet/> */}
            <div className="container fontstyle">
                <h3>User Signup</h3>
                <form method='post' onSubmit={formHandler}>
                <div className="form-group">
                        <label htmlFor="name">Username:</label>
                        <input type="text" className="form-control" placeholder="Enter username" 
                        value={inputdata.username} name= "username" onChange={inputHandler}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email" name='useremail'
                        value={inputdata.useremail} onChange={inputHandler}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" name='userpassword' 
                        value={inputdata.userpassword} onChange={inputHandler}/>
                    </div>
                    
                    
                    <input type="submit" className="btn btn-secondary" value="Submit"/>
                </form>
            </div>
        </>
    )
}
