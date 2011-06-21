/**
 * MapNavigator class is responsible for map navigator dialog and corresponding
 * actions
 * 
 * @author mmazo
 */

function MapNavigator(){
	
	var mnwMapWidth = 300;
	var mnwMapHeight = 300;
	
	var mnwCurrentViewWidth = 50;
	var mnwCurrentViewHeight = 50;
	
	var mnwCurrentViewTop = 50;
	var mnwCurrentViewLeft = 50;
	
	var mnwScale = 1;
	
	/**
	 * navigator dom id
	 */
	var navigatorId = "mapNavigatorWindow";
		
	/**
	 * map navigator html content
	 */
	var htmlContent = "<div id='mnwMap' class='mnwMap'>" + 
						"<div id='mnwCurrentView' class='mnwCurrentView' title='You are here now' ></div>" + 
					  "</div>";
	
	/**
	 * navigator object
	 */
	this.object = null;
	
	/**
	 * calculates initial settings for the map navigator
	 */
	function calculateInitialMapNavigatorSettings(){
		var mnwMap = $('mnwMap');
		var mnwCurrentView = $('mnwCurrentView');
		//calculate scale
		var widthScale = MAP_WIDTH / 300;
		var heightScale = MAP_HEIGHT / 300;
		if (widthScale < heightScale){
			mnwScale = widthScale;
		}else{
			mnwScale = heightScale;
		}
		//calculate mnwMap dimensions
		mnwMapWidth = Math.floor(MAP_WIDTH / mnwScale);
		mnwMapHeight = Math.floor(MAP_HEIGHT / mnwScale);
		mnwMap.style.width = mnwMapWidth + "px";
		mnwMap.style.height = mnwMapHeight + "px";
		//mnwMap.style.marginLeft = "-" + Math.floor(mnwMapWidth/2) + "px";
		//mnwMap.style.marginTop = "-" + Math.floor(mnwMapHeight/2) + "px";
		//calculate mnvCurrentView dimensions
		mnwCurrentViewWidth = Math.floor(VIEWPORT_WIDTH / mnwScale);
		mnwCurrentViewHeight = Math.floor(VIEWPORT_HEIGHT / mnwScale);
		if (mnwCurrentViewHeight < 2){ mnwCurrentViewHeight = 2 }
		if (mnwCurrentViewWidth < 2){ mnwCurrentViewWidth = 2 }
		mnwCurrentView.style.width = mnwCurrentViewWidth + "px";
		mnwCurrentView.style.height = mnwCurrentViewHeight + "px";
		mnwCurrentView.style.left = Math.floor(MAP_MARGIN_LEFT*(-1)/mnwScale) + "px";
		mnwCurrentView.style.top = Math.floor(MAP_MARGIN_TOP*(-1)/mnwScale) + "px";
	};
	
	/**
	 * calculates map tile position and map navigator elements
	 */
	function calculateMapTilePosition(){
		var mnwCurrentView = $('mnwCurrentView');
		var calcLeft = mnwCurrentView.style.left;
		var calcTop = mnwCurrentView.style.top;		
		var c_top = Math.floor(VIEWPORT_HEIGHT/2);
		var c_left = Math.floor(VIEWPORT_WIDTH/2);
		calcLeft = calcLeft.replace('px','')*1;
		calcTop = calcTop.replace('px','')*1;
		calcLeft = calcLeft * mnwScale + c_left;
		calcTop = calcTop * mnwScale + c_top;
		goToMapPosition(calcTop,calcLeft);
		loadCurrentMapArea();
	};
	
	/**
	 * updates the navigator window content
	 */
	this.update = function(){
		calculateInitialMapNavigatorSettings();
	};
	
	/**
	 * creates a new navigator object if it does not exist yet
	 * otherwise updates it content
	 */
	this.add = function(){
		var elem = $(navigatorId);
		if (!elem){
		    var navigator = document.createElement("div");
		    navigator.setAttribute("id", navigatorId);
			navigator.className = "MapNavigatorWindow"; 
			//document.body.appendChild(navigator);
			document.getElementById('np_navigator_wrapper').appendChild(navigator);
			this.object = $(navigatorId);
			this.object.innerHTML = htmlContent;
			//this.object.style.top = VIEWPORT_HEIGHT - 300 + "px";
			new Draggable('mnwCurrentView', { scroll: $('mnwMap'), onEnd: function(){
				$('mnwCurrentView').show();
				calculateMapTilePosition();
			} });
			calculateInitialMapNavigatorSettings();
		}else{
			this.update();
		}
	}
	
	/**
	 * shows the map navigator
	 */
	this.show = function(){
		this.object.show();
		this.update();
	};
	
	/**
	 * hides the map navigator
	 */
	this.hide = function(){
		this.object.hide();
	};
	
	/*
	 * try to append new Navigator Window
	 */
	this.add();
	
}