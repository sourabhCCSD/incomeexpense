import React, {createContext, useReducer} from 'react';
import contextReducer from './contextReducer';
const initialState = [];

export const ExpenseTrackerContext = createContext(initialState);  //Step 1 on Context.

export const Provider = ({children}) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    //Action Creators
    const deleteTransaction = (id) => {dispatch({type: 'DELETE_TRANSACTION', payload : id})}
    const addTransaction = (transaction) => {dispatch({type: 'ADD_TRANSACTION', payload: transaction})}

    return(
        <ExpenseTrackerContext.Provider value={{    //Step 2 of Context.
            deleteTransaction,
            addTransaction,
            transactions
        }}>
            {children}
        </ExpenseTrackerContext.Provider>

    )
}