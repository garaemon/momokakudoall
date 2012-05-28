// downloader.js
var AMEBLO_START_YEAR = 2009;
var AMEBLO_START_MONTH = 2;    //start with 1
var END_YEAR = (new Date()).getFullYear();
var END_MONTH = (new Date()).getMonth() + 1;
var AMEBLO_ACCOUNT = "ariyasu-sd";

var all_files = [];

function nextYearMonth(year, month) {
  if (year == END_YEAR && month == END_MONTH) {
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

var PREV_FILES = null;

function clearAllEntity() {
  $("body").html("<ol></ol>");
}

function getFiles(year, month, index) {
  $(function() {
    $.ajax({
      url: "http://ameblo.jp/" + AMEBLO_ACCOUNT + "/imagelist-" + year
        + ("0" + month).slice(-2) + "-" + index + ".html",
      error: function(e) {
        //alert("cannot access!" + JSON.stringify(e));
        //console.log(JSON.stringify(all_files));
        var next = nextYearMonth(year, month);
        if (next)
          getFiles(next.year, next.month, 0);
        else {
          console.log(all_files);
          clearAllEntity();
          getLargeImages(all_files);
        }
      },
      success: function(data) {
        var current_files = [];
        $(data).find("ul#imageList li a").each(function(e) {
          current_files.push($(this).attr("href"));
          //return $(this).attr("src");
        });
        if (equalStringsArray(current_files, PREV_FILES)) {
          var next = nextYearMonth(year, month);
          if (next)
            getFiles(next.year, next.month, 1);
          else {
            console.log(all_files);
            clearAllEntity();
            getLargeImages(all_files);
            //console.log(JSON.stringify(all_files));
          }
        }
        else {
          console.log("tick!, " + year + ":" + month + ":" + index);
          all_files = all_files.concat(current_files);
          PREV_FILES = current_files;
          getFiles(year, month, index + 1);
        }
      }
    });
  });
};

var large_file_links = [];

function getLargeImages(files) {
  function dispatchMouseEvents(opt) {
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent(opt.type, opt.canBubble||true, opt.cancelable||true, opt.view||window, 
		       opt.detail||0, opt.screenX||0, opt.screenY||0, opt.clientX||0, opt.clientY||0, 
		       opt.ctrlKey||false, opt.altKey||false, opt.shiftKey||false, opt.metaKey||false, 
		       opt.button||0, opt.relatedTarget||null);
    opt.target.dispatchEvent(evt);
    return evt;
  }
  // #mainImg a#imgLink img
  if (files.length == 0) {
    console.log(JSON.stringify(large_file_links));
    alert("done");
  }
  else {
    var target = files[0];
    $.ajax({
      url: target,
      error: function(e) {
        alert("something is wrong with " + target);
      },
      success: function(data) {
        $(data).find("div#mainImg a#imgLink img").each(function(x) {
          var link = $(this).attr("src");
          $("ol").append('<li><a href="' + link + '">' + link + "</a></li>");
          large_file_links.push($(this).attr("src"));
          Array.prototype.slice.call(document.querySelectorAll(
            'a[href$="' + link + '"]')).some(function(e) {
              dispatchMouseEvents({ type:'click', altKey:true, target:e, button:0 });
            });
        });
        getLargeImages(files.slice(1, files.length));
      }
    });
  }
};

function main() {
  getFiles(AMEBLO_START_YEAR, AMEBLO_START_MONTH, 1);
};

$(function() {
  main();
});
