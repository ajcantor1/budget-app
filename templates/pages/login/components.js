import React, {useState} from 'react';
import styled from 'styled-components';
import {EyeOff, Eye} from '@styled-icons/ionicons-sharp'

export const StyledContainer = styled.section`
  padding: 10px;
  text-align: center;
  min-width: 300px;
  max-width: 300px;
  margin: auto;
`

export const LoginButton = styled.button`
  text-decoration: none;
  font-size: 1.2rem;
  width: 80px;
  height: 30px;
  border: 0;
  vertical-align: middle;
  text-align: center;
  color: #000;
  background-color: #bfbfbf;
  box-shadow: 0px 0px 2px -2px rgba(0,0,0,0.5);
  transition: background-color .6s ease, color .6s ease,;
  &:hover {
    background-color: #617c7c;
    color: #fff;
  }
`

const EyeIcon = styled.button`
  width: 30px;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`

export const TextBoxContainer = styled.div`
  width: 95%;
  color: #333;
  font-size: 1.2rem;
  max-width: 300px;
  margin: 10px 0;
  transition: all 0.3s;
  border: 1px solid #ccc; 
  position: relative; 
  background: transparent;

  > .focus-background {
    position: absolute; 
    left: 0; 
    top: 0; 
    width: 100%; 
    height: 100%; 
    background-color: #ededed; 
    opacity: 0; 
    transition: 0.5s; 
    z-index: -1;
  }

  &:focus-within {
    > .focus-background {
      transition: 0.5s; opacity: 1;
    }
  }
`

export const TextBox = styled.input`
  font-size: inherit;
  padding: 5px 5px;
  background-color: transparent;
  border: 0;
  &:focus {
    outline: none;
  }
  width: 225px;
  min-height: 30px;
  max-height: 30px;
`

export const TextInput = ({value, setValue, isPassword, ...props}) => {
  
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <TextBoxContainer>
      <TextBox value={value} type={isPassword && hidePassword ? 'password' : ''}  
      onChange={event => setValue(event.target.value)} />

      {isPassword ?  (
        <EyeIcon onClick={()=> setHidePassword(!hidePassword)}>
          {hidePassword ? (<EyeOff/>) : (<Eye/>)}   
        </EyeIcon>
      ): (<EyeIcon/>)}

      <span className='focus-background'/>
    </TextBoxContainer>
  )
}