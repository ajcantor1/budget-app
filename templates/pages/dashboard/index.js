import React, {useState, useEffect} from 'react';
import {
    StyledContainer, 
    InnerContainer, 
    AddButton, 
    SVGContainer, 
    Circle, 
    Amount,
    ExpensesOuterContainer,
    ExpenseContainer,
    RemoveButton,
    Price,
    Notes,
    ModalButtonContainer,
    ModalContainer,
    ModalButton
} from './components'
import {useDispatch, useSelector} from 'react-redux'
import {getAllowance, addExpense, deleteExpense} from '../../redux/actions'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import CurrencyInput from 'react-currency-input-field';

const Dashboard = () => {


    const dispatch = useDispatch();
    const state = useSelector(state => state)

    const [openModal, setOpenModal] = useState(false);
    const [expenseCost, setExpenseCost] = useState(0);
    const [description, setDescription] = useState("");


    useEffect(() => {
        (async () => {
      
            if(state.allowance == 0) {
                await getAllowance(dispatch);
            }
        })();

    }, [state.amount, state.expenses]);


    const calculateAmount = () => {
        console.log(state.expenses)
        let total = state.expenses.reduce((accumulator, expense) => {
            return accumulator + expense.amount;
        }, 0);
        console.log(state.allowance)
        return state.allowance - total;
    }

    const formatAmount = () => {
        let amount = calculateAmount();
        return "$"+amount.toFixed(2);
    }

    const calculatePercent = () => {
        let amount = calculateAmount();
        return amount/state.allowance * 100;
    }

    const getColor = () => {
        let percent = calculateAmount()/state.allowance;
        console.log('percent');
        console.log(percent);
        if(percent > 0.8) {
            return 'green'
        } else if(percent > 0.6) {
            return 'lime' 
        } else if(percent > 0.4) {
            return 'yellow'
        } else if(percent > 0.25) {
            return 'coral'
        } else {
            return 'red'
        }
        
    }

    const onDescriptionChange = (event) => {
       console.log(event.target.value)
       setDescription(event.target.value);
    }

    const cancelExpense = async (event) => {
        setExpenseCost(0);
        setDescription("");
        setOpenModal(false)
    }

    const handleAddExpense = async (event) => {
        await addExpense(dispatch, expenseCost, description);
        setExpenseCost(0);
        setDescription("");
        setOpenModal(false)
    }

    const handleDeleteExpense = async (expense_id) => {
        event.preventDefault()
        console.log("handle delete")
        console.log(expense_id)
        await deleteExpense(dispatch, expense_id)
    }

    return (
        <StyledContainer>
            <InnerContainer>
                <AddButton onClick={() => setOpenModal(true)}>+</AddButton>
                <SVGContainer>             
                    <Circle radius={75} percent={calculatePercent()} color={getColor()}></Circle>
                    <Amount color={getColor()}>{formatAmount()}</Amount>
                </SVGContainer>
                <ExpensesOuterContainer>
                {
                    state.expenses.map((expense, idx) => {
                    
                        return(
                            <ExpenseContainer key={idx}>
                                <RemoveButton value={expense.id} onClick={(event)=>handleDeleteExpense(expense.id)}><div>X</div></RemoveButton>
                                <Price>{"$"+expense.amount}</Price>
                                <Notes>{expense.item_name}</Notes>
                            </ExpenseContainer>
                        );
                   
                    })
                }
                </ExpensesOuterContainer>
            </InnerContainer>
            <Modal open={openModal} showCloseIcon={false} center>
                <ModalContainer>
                    <CurrencyInput 
                        prefix="$"
                        allowNegativeValue={false}
                        decimalSeparator='.'
                        value={expenseCost}
                        onValueChange={(value, name) => setExpenseCost(value)}
                    />
                    <textArea 
                        rows={6}
                        type="text"
                        maxLength="140"
                        required
                        value={description}
                        onChange={onDescriptionChange}
                    />
                    <ModalButtonContainer>
                        <ModalButton onClick={handleAddExpense}>Add</ModalButton>
                        <ModalButton onClick={cancelExpense}>Cancel</ModalButton>
                    </ModalButtonContainer>
                </ModalContainer>
            </Modal>
        </StyledContainer>
        
    );
}
export default Dashboard;
