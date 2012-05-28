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
  $.get("http://ameblo.jp/ariyasu-sd/imagelist-200902.html",
        {
        },
        function(data) {
          alert(data);
        });
};

$(function() {
  main();
});


