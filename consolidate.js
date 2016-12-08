var fs = require('fs-promise');
var _ = require('lodash');
var promise = require('bluebird');

promise.all([fs.readFile('./data/file1.txt'),fs.readFile('./data/file2.txt')])
.spread(function(buffer1,buffer2){
  let arr1 = [];
  let arr2 = [];
  arr1.push(buffer1.toString().remove(' ').split('\n'));
  arr2.push(buffer2.toString().remove(' ').split('\n'));
  var arr = _.flatten(_.zip(arr1,arr2));
  console.log(arr);
})

.catch(function(err){
  console.log('Something went wrong because',err.message);
});
