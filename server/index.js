const express = require('express');
const path = require('path');
const userController = require('./controllers/Users');

const app = expres();
const port = process.env.PORT || 3000;

app 
    .get('/port', (req,res) => {
        return res.send("Using port: " + port);
    })
    .use('/static', express.static(path.join(__dirname, '../NoFramework')))
    .use('/users' , userController);
app.listen(port, () => console.log("Running on http://localhost:$(port)"))



/*const port = 4000;

app 
    .use( function( req, res, next) {
        // logging
        
        console.log( { params: req.params, body: req.body, url: req.url, query: req.query, headers: req.headers});
        next();
    } )
    .use('/static', express.static(path.join(__dirname, '../NoFramework')))

    .get(   '/',
            (req, res) => res.send('Welcome to Irunner!')
        )
    .get(   '/backdoor',
        function(req, res){
            res.send({msg: 'No alley entrance allowed!'})
        }
    )
    .use('/users' , userController);
app.listen(port, () => console.log("Running on http://localhost:$(port)"))
*/