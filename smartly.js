var http = require('http');



var callback = function(response) {
  var str = ''
  //console.log("started");
  response.on('data', function (chunk) {
  	//console.log("data",chunk);
    str = chunk;
  });

  response.on('end', function () {
  	console.log("End");
  	var final = JSON.parse(str);
    console.log(final,final.next);
    if(typeof final.next !== 'undefined'){
    	start(final.next)
    }
  });
  response.on('error', function (err) {
  	console.log("ERROR occured",err);
  });
}

var start = function(url){
	var options = {
	  host: 'fasttrack.herokuapp.com',
	  //This is the only line that is new. `headers` is an object with the headers to request
	  headers: {'Accept': 'application/json'},
	  path: url
	};	

	var req = http.get(options, callback);
	req.end();
}

start('/mallium')