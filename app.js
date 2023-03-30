const express = require('express');
const { ValidationError } = require('sequelize');
const router = require('./routes');
const app = express();
app.use(express.static('public'));
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
  console.dir(error);
  const status=error.status||500
  res.status(status).send({
    errors:[{title:error.message||'server dead'}]
  })
});



module.exports = app;