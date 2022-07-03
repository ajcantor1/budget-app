import {SIGN_IN, SIGN_OUT, GET_ALLOWANCE, ADD_EXPENSE, REMOVE_EXPENSE} from './types'
import axios from 'axios';

export const signin = async(dispatch, credientials) => {

    let response = await axios.post('auth/login', credientials)
    let data = response.data;
    console.log("refresh token")
    console.log(data.refresh_token);
    if(data.message === 'success') {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      dispatch ({
        type: SIGN_IN,
        payload: {username: credientials.username}
      });
    }    
}

export const refresh = async(dispatch) => {
  let refreshToken = localStorage.getItem('refresh_token');
  console.log("console.log(refreshToken)")
  console.log(refreshToken)
  let response = await axios.post('auth/refresh', {}, {
    headers: {
      "Authorization" : `Bearer ${refreshToken}`
    }
  });

  let data = response.data;
  if(data.message === 'success') {
    localStorage.setItem('access_token', data.access_token);
    return data.access_token;
  } else {
    signOut(dispatch)
  }

}

export const signOut = async(dispatch) => {
  localStorage.removeItem('access_token', data.access_token);
  dispatch ({
    type: SIGN_OUT,
  });
}


export const getAllowance = async(dispatch) => {

    try {
      
      let accessToken = localStorage.getItem('access_token');
      console.log(accessToken)
      let response = await axios.get('api/get_allowance', {
        headers: {
          "Authorization" : `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });
      

      dispatch ({
        type: GET_ALLOWANCE,
        payload: {allowance: response.data.allowance, expenses: response.data.expenses}
      });
      
    } catch(error) {
    
    }
  
}

export const addExpense = async(dispatch, expenseCost, description) => {

  try {
    let accessToken = await refresh(dispatch);

    
    let response = await axios.post('api/add_expense',
    {amount: expenseCost, item_name: description},
    {
      headers: {
        "Authorization" : `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    

    dispatch ({
      type: ADD_EXPENSE,
      payload: response.data
    });
    
  } catch(error) {

  }

}

export const deleteExpense = async(dispatch, expense_id) => {

  try {

    let accessToken = await refresh(dispatch);
    let response = await axios.post('api/remove_expense',
    {expense_id: expense_id},
    {
      headers: {
        "Authorization" : `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log(response)
    dispatch ({
      type: REMOVE_EXPENSE,
      payload: response.data
    });
    
  } catch(error) {

  }

}