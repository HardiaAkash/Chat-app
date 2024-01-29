import logo from './logo.svg';
import './App.css';
import { Navigation } from './component/Navigation';
import { Usersignup } from './component/Usersignup';
import { Userlogin } from './component/Userlogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Admin } from './component/Admin';
import { Home } from './component/Home';

function App() {
  return (
    <>
    <Router>
      {/* <Navigation/> */}
    <Routes>
      <Route exact path='/' element ={ <Home/> }/>
      <Route exact path="/admin" element={<Admin/>}/>
      <Route exact path='/Usersignup' element={<Usersignup/>}/>
      <Route exact path='/Userlogin' element={<Userlogin/>}/>
      
    </Routes>
    </Router>
   {/* <Navigation/>
   <Usersignup/>
   <Userlogin/> */}
   </>
  );
}

export default App;
