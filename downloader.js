// downloader.js
var AMEBLO_START_YEAR = 2009;
var AMEBLO_START_MONTH = 2;    //start with 1

var AMEBLO_ACCOUNTS = {
  momoka: "ariyasu-sd"
};


function amebloBaseURL(name) {
  return "http://ameblo.jp/" + AMEBLO_ACCOUNTS[name];
};

var all_files = [];

function getFiles(year, month, index) {
  $(function() {
    $.ajax({
      url: "http://ameblo.jp/ariyasu-sd/imagelist-" + year
        + ("0" + month).slice(-1) + "-" + index + ".html",
      error: function(e) {
        alert("cannot access!" + JSON.stringify(e));
        console.log(JSON.stringify(all_fiels));
      },
      success: function(data) {
        $("ul#imageList li a img").each(function(e) {
          all_files.push(($(this).attr("src")));
        });
        getFiles(year, month, index + 1);
      }
    });
  });
};

function main() {
  //http://ameblo.jp/ariyasu-sd/imagelist-200902.html
  getFiles(AMEBLO_START_YEAR, AMEBLO_START_MONTH, 1);
};

$(function() {
  main();
});
