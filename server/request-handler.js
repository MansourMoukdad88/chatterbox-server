
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 ,// Seconds.
  'Content-Type': 'application/json'
};
// send response function to send the response in all request method  take 3 parameter 
// response , data that we want to send  , statusCode 
 var sendResponse = function(response, data, statusCode){
     // default statusCode 200 if we do not passs it vaalus when call it
    var statusCode = statusCode || 200;
    // add the header and the status code to the response
    response.writeHead(statusCode, headers);
    // add the data to the body
    response.end(JSON.stringify({results: data}));
 }

// this method to read the data from the request 
var collectData = function (request, callback){
  var data = "";
  request.on('data', function(chunc){
    data += chunc
  });
  request.on('end', function(){
    callback(JSON.parse(data));
  });
} 

 var url = require('url');
 // array to store the data that come from the client
 var messages = [];

 // object contain the request  method 
 var actions = {
  'POST': function (request, response) {
    //using collectData to return the data from Post request and push to array inside callback 
    collectData(request, function(data){
        messages.push(data);
        // send response to client
        sendResponse(response, 'ok')
    });
  }, 
  'GET': function(request, response) {
    sendResponse(response, messages);
  },
  'OPTIONS': function (request, response){
    sendResponse(response, null);
  }
 }
  
 // Adding requestHandler function to exports module 
 exports.requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
    //call the action depend on the request method 
    var action = actions[request.method];
    if (action) {
      // pass the request and response to the function
      action(request, response);
    }
  
};


  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

