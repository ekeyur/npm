
//initializing express module
const express = require('express');
//initializing bodyParser module
const bodyParser = require('body-parser');
//initializing the app
const app = express();

// To pass the object as json
app.use(bodyParser.json());

//to tell express the location of all the hbs views folder
app.use(express.static('views'));

// telling the app to use hbs engine to render all the views
app.set('view engine','hbs');

// rendering on the root page
app.get('/',function(req,res){
  res.render('index.hbs',{
    message : "Hello World"
  });
});

//rendering stuff when parameters are passed
app.get('/name/:name/age/:age',function(req,res){
  var age = req.params.age;
  var name = req.params.name;
  var year = 2016-age;
  res.render('name.hbs',{
    name : name,
    year : year
  });
});

//starting the server and listening on port 3000
app.listen(3000,function(){
  console.log('Example app listening on port 3000!');
});
