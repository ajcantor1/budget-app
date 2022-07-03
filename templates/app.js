import React, { useState, useEffect }  from "react";
import {Route, Routes, useNavigate } from "react-router-dom";
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import {useDispatch, useSelector} from 'react-redux'
import {refresh} from './redux/actions'
const App = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const navigate = useNavigate();

    useEffect(() => {
        (async() => {
            try {
                await refresh();
                if(state.user){ 
             
                    navigate('/dashboard')
                } else{
            
                    navigate('/login')
                }
            } catch(error) {
                navigate('/login')
            }

        })();
    }, [state]);

    return (
      
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
        
    );
}
export default App