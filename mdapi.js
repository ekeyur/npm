const marked = require('marked');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const Client = require('pg').Client;

app.use(bodyParser.json());
app.use(express.static('views'));
app.set('view engine','hbs');

let config = {
  // user: 'keyur', //env var: PGUSER
  database: 'npm_db', //env var: PGDATABASE
  // password: 'secret', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  host: 'localhost',
  // max: 10, // max number of clients in the pool
  // idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var client = new Client(config);
app.get('/getdata',function(req,res){
  client.connect();
  client.query('SELECT * from test',function(err,data) {
  if(err){console.log(err.message);}
  console.log(data);
  client.end();
  });
  res.send("ok");
});

app.put('/documents/:filepath',function(req,res){
  let content = req.body.contents;
  let file = req.params.filepath;
  fs.writeFile('./data/'+file,content,function(err){
    if(err){
      console.log("Error writing file");
    }
  });
});

app.get('/documents/:filepath',function(req,res){
  let file = req.params.filepath;
  fs.readFile('./data/'+file,function(err,buffer){
    if(err){
      console.log("Error reading file");
    }
    var content = buffer.toString();
    res.send({
      filepath : file,
      contents : content
    });
  });
});

app.get('/documents/:filepath/display',function(req,res){
  let file = req.params.filepath;
  fs.readFile('./data/'+file,function(err,buffer){
    if(err){
      console.log("Error reading file"+filepath);
    }
    let content = marked(buffer.toString());
    res.render('readfile.hbs',{
      content : content
    });
  });
});


app.get('/documents',function(req,res){
  fs.readdir('./data',function(err,files){
    if(err){
      console.log("Error getting the list of all the files");
    }
    res.json(files);
  });
});

app.delete('/documents/:filepath',function(req,res){
  let file = req.params.filepath;
  fs.unlink('./data/'+file,(err) => {
    if (err) throw err;
    res.send('Successfully deleted'+'./data/'+file);
  });
});


app.listen('3000',function(){
  console.log("App Running");
});
