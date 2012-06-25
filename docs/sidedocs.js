console.log("WF")
function position_side_demo(){
  var demo = $("#demo");
  var container = $("#container");
  var left = container.offset().left + container.innerWidth() - demo.width();
  var top = Math.floor(($(window).height() - demo.outerHeight())/2);
  top = top > -130 ? top : -130;
  demo.css({ top: top, left: left });
}

$(function() {
 position_side_demo()
 $(window).resize(position_side_demo)
}); 