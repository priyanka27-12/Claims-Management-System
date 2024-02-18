import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
//import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClaimForm from './ClaimForm';
import Claims from './ClaimList'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login />}></Route>
     <Route path="/Signup" element={<Signup />}></Route>
     <Route path="/home" element={<Home />}></Route>
     <Route path="/file-claim/:policyId" element={<ClaimForm />} />
     <Route path='/claim-list' element={<Claims />}></Route>

   </Routes>
   </BrowserRouter>
  )
}

export default App;
