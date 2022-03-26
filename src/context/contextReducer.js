const contextReducer = (state, action) => {
    let transaction;
    switch (action.type) {
        
        case 'DELETE_TRANSACTION':
             transaction = state.filter((t)=> t.id !== action.payload) //Filter wil pass d test to all the transactions
            return transaction       // where the condition written inside holds true, and will filter out the one where it becomes false.
            
        case 'ADD_TRANSACTION':
             transaction = [action.payload, ...state];
             return transaction
        default:
            return state;
    }
}
export default contextReducer