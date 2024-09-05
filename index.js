#! /usr/bin/env node

import express from 'express';
import ejs from 'ejs';

let app = express();


app.use(express.static('public'));
app.set('view engine','ejs');

app.listen(1080);


// localhost: 1080
app.get('/', function(req,res){

    res.render('pages/index');

})


app.get('/about', function(req,res){
    res.render('pages/about')
})

app.get('/contact', function(req,res){
    res.render('pages/contact')
})
