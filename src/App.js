// import logo from './logo.svg';
// import './App.css';


import React, { useEffect } from "react";
import Index from "./Components/Index";



function App() {

  useEffect( () => {
    console.log(process.env)
  }, [])

  return (
    <React.StrictMode>
      <Index></Index>
    </React.StrictMode>
  );
}

export default App;
