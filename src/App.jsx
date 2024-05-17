import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from './pages/Login';
import Starter from './pages/Starter';

import NotFound from './pages/Error404';



function App() {
  const [count, setCount] = useState(0)

  return (
   
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} exact>
            {" "}
          </Route>
          <Route path="/index" element={< Starter />} exact>
            {" "}
          </Route>
          

          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </BrowserRouter>
    
  )
}

export default App
