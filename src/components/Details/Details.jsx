import React from 'react'
import {Card, CardHeader, CardContent, Typography} from '@material-ui/core';
import {Doughnut} from 'react-chartjs-2';
import useStyles from './styles';
import useTransactions from '../../useTransactions';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);  //you need to register all these in ChartJS to make the chart render.

const Details = ({title}) => {        //Step Alpha - here the value title is receiving within {} because we are 
                                    //receiving it from the props   [now go to useTransactions file and read step Beta]
  const classes = useStyles();
  const {total, chartData} = useTransactions(title);    

return(
   <div>
        <Card className={title === 'Income' ? classes.income : classes.expense} >
            <CardHeader title={title} />
            <CardContent>
          <Typography variant='h5'>${total}</Typography>
          <Doughnut data={chartData}/>  
           
            </CardContent>
           
        </Card>
        </div>
)
}

export default Details
