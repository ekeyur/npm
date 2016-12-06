var marked = require('marked');
var filename = process.argv[2];

var fs = require('fs');

fs.readFile(filename,function(err,buffer){
  if(err){
    console.log("error reading file");
  }
  fs.appendFile(filename,marked(buffer.toString()),function(err){
    if(err){
      console.log("error writin file");
    }
    console.log("done");
  });
});

// console.log(marked("this is sparta"));
