$(document).ready(function(){

$("#file").on("click",function () {
  $("#upload").css({"background":"lightGreen"});
})

$("form").on("submit", function (event) {
event.preventDefault();

var fileElement = document.getElementById("file");
var file = fileElement.files[0];
var formData = new FormData();

if(file){
  formData.append('file', file);

  var xhr = new XMLHttpRequest();

  xhr.open('POST', '/upload');
  xhr.send(formData);

  xhr.onload = function (event) {
    console.log('Request Status', xhr.status);
    location.reload();
  }
}
else {
    alert('Please browse for an image file.');
  return false;
}

});

});
