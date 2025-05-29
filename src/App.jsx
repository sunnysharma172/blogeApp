import React, { useState,useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth'
import {login, logout} from './store/authStore'
import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom';
function App() {
 
    const [loding,setLoding] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
       authService.getCurrentUser()
       .then((userData) => {
        if (userData) {
            dispatch(login({ userData }));
        }
        else{
            return dispatch(logout());
        }
       })
       .finally(() => {
        setLoding(false);
       })
    }, []);

    return !loding ?(
        <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
            <div className='w-full block'>
                <Header/>
                <main>
                   Todo: <Outlet/>
                </main>
                <Footer/>
            </div>
        </div>
    ):null

}
export default App;