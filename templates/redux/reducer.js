
import {SIGN_IN, SIGN_OUT, GET_ALLOWANCE, ADD_EXPENSE, REMOVE_EXPENSE} from './types'

const initialState = {
  user: null,
  allowance: 0,
  expenses: []
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {

    case SIGN_IN:
      return {...state, user: action.payload.username}

    case SIGN_OUT:
      return {...state,  user: ''}

    case GET_ALLOWANCE:
      console.log(action.payload.expenses)
      return {...state, allowance: action.payload.allowance, expenses: action.payload.expenses}

    case ADD_EXPENSE:
      return {...state, expenses: [...state.expenses, action.payload.expense]}

    case REMOVE_EXPENSE:
      const filteredExpenses = state.expenses.filter((expense) => expense.id != action.payload.expense_id);
      return {...state, expenses: filteredExpenses}
    default:
      return state
  }
}

export default AppReducer