const marked = require('marked');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('views'));
app.set('view engine','hbs');



app.put('/documents/:filepath',function(req,res){
  let content = req.body.contents;
  let filepath = req.params.filepath;
  fs.writeFile('./data/filepath',content,function(err){
    if(err){
      console.log("Error writing file");
    }
  });
});

app.get('/documents/:filepath',function(req,res){
  let filepath = req.params.filepath;
  fs.readFile('./data/filepath',function(err,buffer){
    if(err){
      console.log("Error reading file");
    }
    var content = buffer.toString();
    res.send({
      filepath : filepath,
      contents : content  
    });
  });
});

app.get('/documents/:filepath/display',function(req,res){
  let filepath = req.params.filepath;
  fs.readFile('./data/filepath',function(err,buffer){
    if(err){
      console.log("Error reading file"+filepath);
    }
    let content = marked(buffer.toString())
    res.render('readfile.hbs',{
      content : content
    });
  });
});

app.listen('3000',function(){
  console.log("App Running");
});
