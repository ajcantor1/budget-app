import React, {useState, useEffect} from 'react';
import {useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {signin} from '../../redux/actions'
import {
    StyledContainer,
    TextInput,
    LoginButton
} from './components';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const state = useSelector(state => state);
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = async (credientials) => {
        try {
            await signin(dispatch, credientials);
            navigate('/dashboard')
        } catch(error) {
            // Todo display error message
        } 
    }

    useEffect(()=>{
    
        if(state.user) {
            navigate('/dashboard')
        }

    },[state])


    return (
        <StyledContainer>
            <TextInput value={username} setValue={setUsername}/>
            <TextInput value={password} setValue={setPassword} isPassword/>
            <LoginButton onClick={() => handleLogin({username: username, password: password})}>Login</LoginButton>
        </StyledContainer>
    );
}

export default Login;