const express= require ('express');
//import is no longer supported so using require instead
const server = require('./server.js')


server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n');
  });
  

