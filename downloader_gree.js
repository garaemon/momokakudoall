// downloader.js
var LAST_GREE_URL = "__GREE_LAST_LINK";
var COUNTER = 0;
function getCurrentFileImages(data) {
  $(data).find("div.photolist ul li a").each(function(a) {
    var target = $(this).attr("href");
    $("ol").append('<li><a href="' + target + '">' + target + "</a></li>");
    Array.prototype.slice.call(document.querySelectorAll(
      'a[href$="' + target + '"]')).some(function(e) {
        dispatchMouseEvents({ type:'click', altKey:true, target:e, button:0 });
        ++COUNTER;
      });
  });
};

function getNextLink(data) {
  var next_link = null;
  $(data).find(".diary-pagenavi li.prev a").each(function(e) {
    next_link = $(this).attr("href");
  });
  return next_link;
};

function getPageLoop(link) {
  if (link) {
    console.log(link);
    $.ajax({
      url: link,
      error: function(e) {
        alert("something wrong with " + link + ": " + e);
      },
      success: function(data) {
        getCurrentFileImages(data);
        getPageLoop(getNextLink(data));
      }
    });
  }
  else {
    alert("done " + COUNTER + " images");
  };
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

function main() {
  getPageLoop(LAST_GREE_URL);
};

$(function() {
  $("body").html("<ol></ol>");
  main();
});
