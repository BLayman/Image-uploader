var express = require('express');
var formidable = require('formidable');
var app = express();
var fs = require('fs');
var path = require('path');

app.use(express.static("client"));

app.set('port', process.env.PORT || 3000);


app.get("/uploads", function(req,res){

var uploadPath = path.join (__dirname,"/client/uploads/")

fs.readdir(uploadPath, function (err, arr) {
  console.log(arr);
  var num = 0;
  var urls = [];

  arr.sort(function(a, b) {
               return fs.statSync(uploadPath + b).mtime.getTime() -
                      fs.statSync(uploadPath + a).mtime.getTime();
                    });

  arr.map(function (string) {
    var fullUrl = "uploads/" + string;
    console.log(fullUrl);
    urls.push({url:fullUrl, id:num});
    num ++;
  })
  res.json(urls);
});

});


app.post('/upload',function (req,res) {

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, file) {
  //  console.log('handling form upload files:', file);

var newPath = __dirname + "/client/uploads/" + file.file.name;

var readUpload = fs.createReadStream(file.file.path);

var writeUpload = fs.createWriteStream(newPath);

readUpload.pipe(writeUpload);

  });
  console.log("Uploaded successfully");
  res.send("Uploaded successfully");
});



app.listen(app.get('port'), function () {
  console.log("listening on port:" + app.get('port'));
});
