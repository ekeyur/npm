var request = require('Request');
var cheerio = require('cheerio');
var _ = require('lodash');


request('https://www.npmjs.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(body);
    var $freqInstalled = $('#pane-frequently-installed li h3 a');

    console.log($freqInstalled.text());

    $freqInstalled.each(function(){
      console.log($(this).text());
    });
    // _.forEach($freqInstalled.text(),function(value){
    //   console.log(value);
    // });

  }
});
