// downloader.js
var AMEBLO_START_YEAR = 2009;
var AMEBLO_START_MONTH = 1;    //start with 0

var AMEBLO_ACCOUNTS = {
  momoka: "ariyasu-sd"
};


function amebloBaseURL(name) {
  return "http://ameblo.jp/" + AMEBLO_ACCOUNTS[name];
};

function main() {
  //http://ameblo.jp/ariyasu-sd/imagelist-200902.html
  $(function() {
    $.ajax({
      url: "http://ameblo.jp/ariyasu-sd/imagelist-200902.html",
      error: function(e) {
        alert("cannot access!" + JSON.stringify(e));
      },
      success: function(data) {
        alert("hogehoge");
      }
    });
  });
};

$(function() {
  main();
});
