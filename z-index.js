/*
z-index.js
author: fatema boxwala
*/
$(".header").data("show", false);

var video = document.getElementById('simplicity');
video.addEventListener('loadedmetadata', function() {
  this.currentTime = 426;
}, false);
var endtime = 523;
video.addEventListener("timeupdate", function() {
	if (this.currentTime >= endtime) {
		this.pause();
	}
}, false);

var video = document.getElementById('journey');
video.addEventListener('loadedmetadata', function() {
  this.currentTime = 350;
}, false);
var endtime = 415;
video.addEventListener ("timeupdate", function() {
	if (this.currentTime >= endtime) {
		this.pause();
	}
}, false);	

var video = document.getElementById('journey2');
video.addEventListener('loadedmetadata', function() {
  this.currentTime = 549;
}, false);
var endtime = 583;
video.addEventListener ("timeupdate", function() {
	if (this.currentTime >= endtime) {
		this.pause();
	}
}, false);	

var video = document.getElementById('journey3');
video.addEventListener('loadedmetadata', function() {
  this.currentTime = 777;
}, false);
var endtime = 845;
video.addEventListener ("timeupdate", function() {
	if (this.currentTime >= endtime) {
		this.pause();
	}
}, false);

var video = document.getElementById('journey4');
video.addEventListener('loadedmetadata', function() {
  this.currentTime = 417;
}, false);
var endtime = 547;
video.addEventListener ("timeupdate", function() {
	if (this.currentTime >= endtime) {
		this.pause();
	}
}, false);

var video = document.getElementById('inform');
video.addEventListener('loadedmetadata', function() {
  this.currentTime = 803;
}, false);
var endtime = 959;
video.addEventListener ("timeupdate", function() {
	if (this.currentTime >= endtime) {
		this.pause();
	}
}, false);

var video = document.getElementById('inform2');
video.addEventListener('loadedmetadata', function() {
  this.currentTime = 421;
}, false);
var endtime = 977;
video.addEventListener ("timeupdate", function() {
	if (this.currentTime >= endtime) {
		this.pause();
	}
}, false);

var video = document.getElementById('inform3');
video.addEventListener('loadedmetadata', function() {
  this.currentTime = 567;
}, false);
var endtime = 632;
video.addEventListener ("timeupdate", function() {
	if (this.currentTime >= endtime) {
		this.pause();
	}
}, false);



function tapAction(event, target)
{
	var cssClassArray = $(this).attr("class").split(" ")
	var cssClass = cssClassArray[4];
	var content = $(".contentContainer ." + cssClass)
	var showStatus = $(this).data("show");
	if(showStatus == false)	{ // we are opening content below
		content.show(function() {
			$(this).parent().slideToggle(10000, function() {
			});
		});
		$(this).data("show", true);
		content.parent().ScrollTo(0);
	}
	else {
		content.parent().slideToggle(10000, function() {content.hide();});
		$(this).data("show", false);
	}
}


/**
 * Catch each phase of the swipe. start: show the div underneath move: we drag
 * the div. cancel: we animate back to where we were end: we animate to the next
 * image
 */			
function swipeStatus(event, phase, direction, distance) {
	
	if (phase=="start") {
		$(this).data("originalBackgroundPositionY", $(this).css("background-position-y")); 
	}
	
	else if (phase=="move" && (direction=="left" || direction=="right")) {
		var currentZ = parseInt($(this).css("z-index"));
		var nextToDisplayRight = $(this).siblings().filter(function () {
			return $(this).css("z-index")==(currentZ -4);
			
		});
		var nextToDisplayLeft = $(this).siblings().filter(function () {
			return $(this).css("z-index")==(currentZ -1);
			
		});
		
		if(direction=="left") {
			nextToDisplayRight.hide();
			nextToDisplayLeft.show();
			$(this).css("backgroundPositionX", -distance);
			$(this).width(1536-distance);
		}
		else {
			nextToDisplayRight.show();
			nextToDisplayLeft.hide();
			$(this).css("marginLeft", distance);
			$(this).width(1536-distance);
		}
	}
	
	else if (phase=="cancel") {
		//$(this).text("the swipe was cancelled beacuse only " + distance + "px were swiped");
		var animateProps = {
				backgroundPositionX: "0px",
				width: "1536px",
				marginLeft: "0px"
		};
		
		$(this).animate( animateProps, 
				20000*(distance)/1536, 
				"linear", 
				function() {
					var currentZ = parseInt($(this).css("z-index"));
					var nextToDisplay;
					if (direction=="left") {
						nextToDisplay = $(this).siblings().filter(function () {
							return $(this).css("z-index")==(currentZ-1);
						});
					}
					else if (direction=="right") {
						nextToDisplay = $(this).siblings().filter(function () {
							return $(this).css("z-index")==(currentZ-4);
						});
					}
					nextToDisplay.hide(20000);	
			});
	}
	
	else if(phase=="end" && (direction=="left" || direction=="right") ) {
		var cssClassArray = $(this).attr("class").split(" ")
		var cssClass = cssClassArray[4];
		var content = $(".contentContainer ." + cssClass)
		$(".contentContainer ." + cssClass).parent().slideUp(10000, function(){
																		content.hide();
																		});
		$(this).data("show", false);
		var animateProps;
		if(direction=="left") {
			animateProps = {
					backgroundPositionX: "-1536px",
					width: "0px" 
			}
		}
		else {
			animateProps = {
					marginLeft: "1536px",
					width: "0px" 
			}
		}			
		$(this).animate( animateProps, 
				8000*(1536-distance)/1536, 
				"linear", 
				function() {
					var currentZ = parseInt($(this).css("z-index"));
					if (direction=="left") {
						$(this).css("z-index", (currentZ - 5));
					}
					else if (direction=="right") {
						var nextToDisplay = $(this).siblings().filter(function () {
							return $(this).css("z-index")==(currentZ-4);
						});
						nextToDisplay.css("z-index", currentZ+1);
					}
					$(this).width("1536px");
					$(this).hide(20000);
					$(this).css("backgroundPosition", "0px " + $(this).data("originalBackgroundPositionY"));
					$(this).css("marginLeft", "0px");	
			});
	}
}
		
var swipeOptions=
{
	triggerOnTouchEnd : true,	
	swipeStatus : swipeStatus,
	threshold: 400,
	cancelThreshold: 20,
	tap:tapAction
};
			
$(".header").swipe( swipeOptions );

