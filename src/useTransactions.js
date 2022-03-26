import { useContext } from "react";
import { expenseCategories, incomeCategories, resetCategories } from "./constants/categories"
import { ExpenseTrackerContext } from "./context/context";

const useTransactions = (title) => {   //Step Beta - here we are not receiving it within any {} but receiving it
    resetCategories();                  //directly as it is because it has now become a parameter to the function.
    const {transactions} = useContext(ExpenseTrackerContext);

   const transactionPerType = transactions.filter((t) => t.type === title);  // from the formData, here we are bringing out all the transactions that belong to a particular type i.e. either Income or Expense


   const total = transactionPerType.reduce((acc, curVal) => acc += curVal.amount, 0);  // making total of that particular 

   const categories = title === 'Income' ? incomeCategories : expenseCategories;  
    
   console.log({transactionPerType, total, categories});


    transactionPerType.forEach((t) => {                                   //every time a new transaction is added
       const category = categories.find((c)=> c.type === t.category)    //we check if the entire categories and
                                                                    //transactionPerType has anything in common 
       if(category) {                                           //then we append the category.amount 
           category.amount += t.amount
       }
     
       
    });

    const filteredCategories = categories.filter((c) => c.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c)=> c.amount),
            backgroundColor: filteredCategories.map((c)=> c.color)
        }],
        labels: filteredCategories.map((c)=> c.type)
    }
    return {chartData, total}
}

export default useTransactions
