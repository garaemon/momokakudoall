(function(){var s=document.createElement("script");s.charset="UTF-8";s.src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";document.body.appendChild(s)})();

var START_PAGE = "__STARDUST_LAST_LINK";
var PREFIX_URL = "http://star-studio.jp/momoclo/";
var HOST = "http://star-studio.jp/";
var COUNTER = 0;

function downloadFiles(data) {
  $(data).find("#NewsMiddle .photoBoxC a").each(function() {
    var url = PREFIX_URL + $(this).attr("href");
    console.log("fetching image from " + url);
    $.ajax({
      url: url,
      error: function() {
        alert("something wrong: " + e);
      },
      success: function(data2) { //this does not work with jQuery... why?
        var result = (data2).match(/[\s\S]*src="(\S*)"[\s\S]*/);
        if (result) {
          var target = result[1];
          $("ol").append('<li><a href="' + target + '">' + target + "</a></li>");
          Array.prototype.slice.call(document.querySelectorAll(
            'a[href$="' + target + '"]')).some(function(e) {
              dispatchMouseEvents({ type:'click', altKey:true, target:e, button:0 });
              ++COUNTER;
            });
        }
      }
    });
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

function nextLink(data) {
  var next_link = null;
  $(data).find("#entryBack a").each(function(e) {
    next_link = PREFIX_URL + $(this).attr("href");
  });
  return next_link;
};


function getFileLoop(link) {
  if (link) {
    console.log("analizing " + link);
    $.ajax({
      url: link,
      error: function(e) {
        alert("something wrong with " + link + ": " + e);
      },
      success: function(data) {
        downloadFiles(data);
        getFileLoop(nextLink(data));
      }
    });
  }
  else {
    alert("done " + COUNTER + " pics");
  }
};

function main() {
  $("body").html("<ol></ol>");
  getFileLoop(START_PAGE);
};

$(function() {
  main();
});
