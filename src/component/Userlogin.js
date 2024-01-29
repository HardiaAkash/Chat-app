import React,{useState, useEffect} from 'react'
import {  Outlet, useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';

export const Userlogin = () => {
    const navigate = useNavigate();
    const [userinput, setUserinput] = useState({
        usermail: "",
        userpwd : ""

    });
    const [localdata, setLocaldata] = useState([]);
    useEffect(() => {
        let olddata = JSON.parse(localStorage.getItem("users"));
        
        if(olddata?.length >0) {
            setLocaldata(olddata);
        }
    }, [])
    
    const inputdata = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserinput({...userinput, [name]: value});
    }
    const formLogin = (event) =>{
        event.preventDefault();
        let result = localdata.filter((item, index)=>{
            return (item.useremail == userinput.usermail && item.userpassword == userinput.userpwd);
        });
        if (result.length>0) {
         console.log(result.length)
         navigate("/")
        
        }
    }
    return (
        <>
        {/* <Navigation/>
        <Outlet/> */}
            <div className="container fontstyle">
                <h3>Login</h3>
                <form method='post' onSubmit={formLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email" id="email" name='usermail'  onChange={inputdata}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" id="pwd" name='userpwd' onChange={inputdata}/>
                    </div>
                  
                    <input type="submit" className="btn btn-primary" value='Login'/>
                </form>
            </div>
        </>
    )
}
