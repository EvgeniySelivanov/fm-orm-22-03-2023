const express = require('express');
const router = require('./router');
const app = express();

app.use(express.json());
//http://localhost:3000/api
app.use('/api', router);

app.use((error,req,res,next)=>{
  console.log(error.message);
});



module.exports = app;