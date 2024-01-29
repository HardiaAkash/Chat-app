import React, {useState, useEffect,} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

export const Admin = () => {
    const navigate = useNavigate();
    const [inputdata, setInputdata] = useState({
        adminmail: "",
        adminpwd : "",

    });

    const [admindata, setAdmindata] = useState([]);
    useEffect(() => {
      let admin = JSON.parse(localStorage.getItem("admin"));
    
      if (admin?.length>0) {
          setAdmindata(admin);
      
      }
    }, [])
    const inputHandler =(event)=>{
           const keyname = event.target.name;
           const keyvalue = event.target.value;
           setInputdata({...inputdata, [keyname]: keyvalue});
    }
    const formHandler = (event) =>{
        event.preventDefault();
       let security = admindata.filter((items, index)=>{
            return(
                items.adminmail ==inputdata.adminmail && items.adminpwd == inputdata.adminpwd
            );
        })
        if(security.length>0){
            navigate("/")
        }
        else{
            alert("Invalid mail or password");
        }
    }

    return (
        <>
       
            <div className="container fontstyle">
                <form method='post' onSubmit={formHandler}>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email" id="email" name='adminmail' onChange={inputHandler}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" id="pwd" name='adminpwd' onChange={inputHandler}/>
                    </div>
                   
                    <input type="submit" className="btn btn-primary" value='Login'/>
                </form>
             </div>   
     </>
            )
}
