const express = require('express');
const postsRouter= require('./data/posts-router.js');


const server = express();

server.use(express.json());
server.use('/api/posts',postsRouter)
 
server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});


// server.get('/now',(request,response)=>{
    //     const now=new Date().toISOString();
    //     response.send(now);
    // });


module.exports= server;