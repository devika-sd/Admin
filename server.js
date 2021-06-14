const express=require('express');
const app= express();
const cors=require('cors');
require('colors');
const databaseConnection=require('./db');

app.use(cors());

app.use(express.json());

databaseConnection();



app.use(errorHandler);

app.listen(8080,()=>{
    console.log("listening to the port 8080");
})