const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();   //return express server application

app.use(morgan('dev')) ;   //   Morgan log in Dev. Version. 
app.use(express.static(__dirname +'/public'));     //take absolute path .

app.use((req ,res) =>{                     //set up server
  
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

app.listen(port,hostname,()=>{
 console.log(`Server running at http://${hostname}: ${port}/`);

});