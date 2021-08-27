const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();   //return express server application

app.use((req ,res) =>{                     //set up server
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

app.listen(port,hostname,()=>{
 console.log(`Server running at http://${hostname}: ${port}/`);

});