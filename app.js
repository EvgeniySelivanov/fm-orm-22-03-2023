const express = require('express');
const { ValidationError } = require('sequelize');
const router = require('./router');
const app = express();

app.use(express.json());
//http://localhost:3000/api
app.use('/api', router);


app.use((error,req,res,next)=>{
  if(error instanceof ValidationError){
    res.status(400).send({
    errors:[{title:error.message}]
  })}
  next(error)
});



app.use((error,req,res,next)=>{
  res.status(500).send({
    errors:[{title:error.message}]
  })
});



module.exports = app;