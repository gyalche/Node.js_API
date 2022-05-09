
const express=require('express');

const app=express();

//databse
const mongoose=require('mongoose');

//when data is coming from client
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//database require
require('./database/db')

//calling customer
const customerRouter=require('./router/customerRouter');
app.use(customerRouter);

//calling doner
const donerRouter=require('./router/donerRouter');
app.use(donerRouter)

app.listen(90);