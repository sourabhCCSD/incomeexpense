import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import useStyles from "./styles";
import { ExpenseTrackerContext } from "../../../context/context";
import { v4 as uuidv4 } from "uuid";

import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import { useSpeechContext } from "@speechly/react-client";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: new Date(),
};

const Form = () => {
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);  //Step 3 of Context.
  const { segment } = useSpeechContext();

  const handleCreateTransaction = () => {
    const transaction = {
      ...formData,
      amount: Number(formData.amount),  // We seperate the value of amount we received from input field becoz we need
      id: uuidv4(),                   //it to directly assosiate with the transaction.
    };
    addTransaction(transaction);  //called the function addTransaction via useContext.
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {  
        setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return handleCreateTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach((e) => {
        const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
        console.log(e.value);

        switch (e.type) {
          case "amount":
            setFormData({ ...formData, amount: e.value });
            break;
          case "category":
              if(incomeCategories.map((iC) => iC.type).includes(category)){
                setFormData({...formData, type: 'Income', category }); 
              } else if(expenseCategories.map((eC) => eC.type).includes(category)){
                  setFormData({...formData, type: 'Expense', category})
              }
               //here category: e.value then becomes category : category as we do it lowercase. And then category: category can be re-written as just category.
            break;

          case "date":
            setFormData({ ...formData, date: e.value });
            break;
          default:
            break;
        }
      });
      if(segment.isFinal && formData.category && formData.amount && formData.type && formData.date) {
            handleCreateTransaction();
      }
    }
  }, [segment]);

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && segment.words.map((w) => w.value).join(" ")}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {/*  <MenuItem value="business">Business</MenuItem>
                    <MenuItem value="salary">Salary</MenuItem> */}
            {selectedCategories.map((cat) => (
              <MenuItem key={cat.type} value={cat.type}>
                {cat.type}
              </MenuItem> 
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          style={{ marginTop: "15.5px" }}
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          fullWidth
        />
      </Grid>
      <Button
        className={classes.button}
        onClick={handleCreateTransaction}
        variant="outlined"
        color="primary"
        fullwidth
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
