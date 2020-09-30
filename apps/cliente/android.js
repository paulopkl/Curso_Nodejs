const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
    headers: {
        // 'Accept': 'text/html',
        'Accept': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json'
    }
}

// Content-Type
// x-www-form-urlencoded

// const html = 'name=Paulo'; // x-www-form-urlencoded
// const json = { "name": "Paulo" } // Object
// const toJSON = JSON.stringify(json); // json

const bufferResponseBody = [];

const req = http.request(options, res => {
    
    res.on('data', chunk => {
        bufferResponseBody.push(chunk);
    });

    res.on('end', () => {
        // console.log(bufferResponseBody);
        const responseBody = Buffer.concat(bufferResponseBody).toString();
        console.log(responseBody);
        console.log(res.statusCode);
    });

});

// req.write(html);
// req.write(toJSON);

req.end();