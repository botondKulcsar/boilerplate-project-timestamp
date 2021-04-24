// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
  res.json({
    utc: new Date().toUTCString(),
    unix: new Date().getTime()
  })
})

app.get('/api/:date', (req, res) => {
  const date = req.params.date;
  let utc;
  let unix;

    if(date.match(/^\d+$/)) {
     utc = new Date(+date)
     unix = utc.getTime()
   } else if (Date.parse(date) !== NaN) {
    unix = Date.parse(date)
    if (!unix) {
      return res.json({error: 'Invalid Date'});
    }
    utc = new Date(unix)
  } 
  
  res.json({
    unix,
    utc: utc.toUTCString()
  })

})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
