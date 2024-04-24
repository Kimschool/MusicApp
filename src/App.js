import React, { useEffect } from "react";
import './App.css';
import Header from "./pages/header/Header";
import { Route, Routes } from "react-router-dom";
import NoMatch from "./pages/noMatch/NoMatch";
import PostSong from "./pages/musicList/PostSong";
import About from "./pages/About";
import SearchSong from "./pages/musicList/SearchSong";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  
  useEffect(() => {
    setScreenSize();
  });

  return (
     <>
      <Header/>
         <Routes>
             <Route path='/' element={<PostSong/>}/>
             <Route path='/search/*' element={<SearchSong />} />
             {/*<Route path='/musicList' element={<Dashboard/>}/>*/}
             {/*<Route path='/musicList/:id' element={<UpdateSong/>}/>*/}
             <Route path="/about" element={<About />} />
             <Route path='*' element={<NoMatch/>}/>
         </Routes>
     </>
  );
}

export default App;
