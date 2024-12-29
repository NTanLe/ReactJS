import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
// import PerfectScrollbar from 'perfect-scrollbar';
const App = () => {
  return (
    <div className="App">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container'>

        </div>
        <div className='content-container'>
          {/* <PerfectScrollbar> */}
            <Outlet />
          {/* </PerfectScrollbar> */}
        </div>
      </div>
    </div>
  );
}

export default App;
