// downloader.js
var AMEBLO_START_YEAR = 2009;
var AMEBLO_START_MONTH = 2;    //start with 1
var END_YEAR = (new Date()).getFullYear();
var END_MONTH = (new Date()).getMonth() + 1;
var AMEBLO_ACCOUNT = "takagi-sd";

var all_files = [];

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
};


function nextYearMonth(year, month) {
  if (year > END_YEAR && month > END_MONTH) {
    return null;
  }
  else {
    if (month == 12) {
      return {
        year: year + 1,
        month: 1
      };
    }
    else {
      return {
        year: year,
        month: month + 1
      };
    }
  }
};

function equalStringsArray(a, b) {
  if (a && b && a.length == b.length) {
    for (var i = 0; i < a.length; i++) {
      var aa = a[i];
      var bb = b[i];
      if (aa.toString() != bb.toString())
        return false;
    }
  }
  else {
    return false;
  }
  return true;
};

function clearAllEntity() {
  $("body").html("<ol></ol>");
}

function getFilesLoop(year, month, index) {
  $.ajax({
    url: "http://ameblo.jp/" + AMEBLO_ACCOUNT + "/imagelist-" + year
      + ("0" + month).slice(-2) + "-" + index + ".html",
    error: function(e) {
      var next = nextYearMonth(year, month);
      if (next)
        getFilesLoop(next.year, next.month, 1);
      else {
        alert("done");
      }
    },
    success: function(data) {
      var current_files = [];
      $(data).find("ul#imageList li a").each(function(e) {
        current_files.push($(this).attr("href"));
      });
      // calc diff
      var diff = current_files.diff(all_files);
      if (diff && diff.length > 0) {
        for (var i = 0; i < diff.length; i++) {
          all_files.push(diff[i]);
        }
        downloadFiles(diff);
        getFilesLoop(year, month, index + 1);
      }
      else {
        var next = nextYearMonth(year, month);
        if (next)
          getFilesLoop(next.year, next.month, 1);
        else {
          alert("done " + all_files.length + " images");
          console.log(all_files.length);
          console.log(all_files);
        }
      }
    }
  });
};

function dispatchMouseEvents(opt) {
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent(opt.type, opt.canBubble||true, opt.cancelable||true, opt.view||window, 
                     opt.detail||0, opt.screenX||0, opt.screenY||0, opt.clientX||0, opt.clientY||0, 
                     opt.ctrlKey||false, opt.altKey||false, opt.shiftKey||false, opt.metaKey||false, 
                     opt.button||0, opt.relatedTarget||null);
  opt.target.dispatchEvent(evt);
  return evt;
}


function downloadFiles(files) {
  if (!files || files.length == 0) {
    console.log("done");
  }
  else {
    var target = files[0];
    console.log("target:" + target);
    $.ajax({
      url: target,
      error: function(e) {
        alert("something is wrong with " + target);
      },
      success: function(data) {
        $(data).find("div#mainImg a#imgLink img").each(function(x) {
          var link = $(this).attr("src");
          $("ol").append('<li><a href="' + link + '">' + link + "</a></li>");
          Array.prototype.slice.call(document.querySelectorAll(
            'a[href$="' + link + '"]')).some(function(e) {
              dispatchMouseEvents({ type:'click', altKey:true, target:e, button:0 });
            });
        });
      }
    });
    downloadFiles(files.slice(1, files.length));
  }
};

function main() {
  clearAllEntity();
  getFilesLoop(AMEBLO_START_YEAR, AMEBLO_START_MONTH, 1);
};

$(function() {
  main();
});
