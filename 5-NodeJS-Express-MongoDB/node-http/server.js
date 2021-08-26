const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;


const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }
        const filePath = path.resolve('./public' + fileUrl);   //to get absolute path store in Filepath.
        const fileExt = path.extname(filePath);                //to get extension.

        if (fileExt === '.html') {
            fs.access(filePath, err => {               //checking file path is exist
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
            });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);

        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} not html</h1></body></html>`)
        }


    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`)

    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at http:// ${hostname}:${port}/`);
})