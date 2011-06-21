/**
 * user id 
 */
var USER_ID = null;

///map drag logic///////////////////////////////////////////////////////////////

/**
 * drag step value
 */
var DRAG_STEP_VALUE = 100;

/**
 * viewport offset dimensions
 */
var VIEWPORT_WIDTH = 0;
var VIEWPORT_HEIGHT = 0;

/**
 * calculates visible map dimensions
 */
function calculateVisibleMapDimensions(){
	VIEWPORT_HEIGHT = document.getElementById("map_wrapper").offsetHeight;
	VIEWPORT_WIDTH = document.getElementById("map_wrapper").offsetWidth;
	document.getElementById("win_height").innerHTML = VIEWPORT_HEIGHT;
	document.getElementById("win_width").innerHTML = VIEWPORT_WIDTH;
}


///current map display logic////////////////////////////////////////////////////

/**
 * map navigator object
 */
var MAP_NAVIGATOR = null;

/**
 * menu dialog object
 */
var MENU_DIALOG = null;

/**
 * map elements object
 */
var MAP_ELEMENTS = null;

/**
 * map element square side dimension
 */
var MAP_ELEMENT_DIM = 128;

/**
 * map tile square side dimension
 */
var TILE_DIM = 100;

/**
 * map width and height
 */
var MAP_WIDTH = 0;
var MAP_HEIGHT = 0;

/**
 * map margin according visible area (viewport)
 */
var MAP_MARGIN_TOP = 0;
var MAP_MARGIN_LEFT = 0;

/**
 * current map center position coordinate
 */
var CURRENT_MAP_CENTER_TOP = 0;
var CURRENT_MAP_CENTER_LEFT = 0;


/**
 * loaded map tiles array
 */
var LOADED_MAP_TILES = new Array();


/**
 * renders the current terrain for the given viewport
 */
function renderCurrentTerrain(viewportTop, viewportLeft, viewportWidth, 
                              viewportHeight, tileSide, tileClass, maxIndexX, maxIndexY){

	var minX = Math.floor(viewportLeft / tileSide);
	var maxX = Math.floor( (viewportLeft + viewportWidth) / tileSide ) + 1;
	var minY = Math.floor(viewportTop / tileSide);
	var maxY = Math.floor( (viewportTop + viewportHeight) / tileSide ) + 1;
	var innerDiv = document.getElementById("map");
	for ( i = minX; i <= maxX; i++ ){
		if ((i <= maxIndexX)&&(i >= 0)){
			for ( j = minY; j <= maxY; j++){
				if ((j <= maxIndexY)&&(j >= 0)){
					var tileName = "x" + i + "y" + j + "z0.jpg";
					if (!$(tileName)){
					    var terrain = document.createElement("img");
					    terrain.src = "images/terrain/" + tileName;
					    terrain.style.position = "absolute";
					    terrain.style.left = i*tileSide + "px";
					    terrain.style.top = j*tileSide + "px";
					    terrain.style.zIndex = 2;
						terrain.title = "";
					    //terrain.setAttribute("class", tileClass);
						terrain.setAttribute("id", tileName);
						terrain.className = tileClass;
					    innerDiv.appendChild(terrain);
					}
			    }
			}
		}
	}
	
	var terrains = document.getElementsByClassName(tileClass);	
	for (k = 0; k < terrains.length; k++){
		var inside = false;
		var xValue = terrains[k].id.replace("z0.jpg","");
		var yValue = terrains[k].id.replace("z0.jpg","");
		xValue = xValue.substring(1,xValue.indexOf("y"));
		yValue = yValue.substring(yValue.indexOf("y") + 1,yValue.length);
		xValue = xValue*1;
		yValue = yValue*1;
		if ((xValue >= minX)&&(xValue <= maxX)&&(yValue >= minY)&&(yValue <= maxY)){
			inside = true;
		}
		if (inside === false){
			var innerDiv = document.getElementById("map");
		    innerDiv.removeChild(terrains[k]);
		}
	}
	
	/////calculations////
	var tnr = document.getElementsByClassName(tileClass);
	tnr = tnr.length;
	$('terrains_nr').innerHTML = tnr;
	//////////////////////
		
}

/**
 * renders current buildings for the given viewport
 * @param {Object} viewportTop
 * @param {Object} viewportLeft
 * @param {Object} viewportWidth
 * @param {Object} viewportHeight
 */
function renderCurrentBuildings(viewportTop, viewportLeft, viewportWidth, viewportHeight){
	var mel = new MapElements(128);
	
	/*
	 * in real life the remove action should go first!
	 */
									
	mel.loadElementsForGivenArea(viewportTop, viewportLeft, 
	                             viewportWidth, viewportHeight);
	mel.removeElementOutsideGivenArea(viewportTop, viewportLeft, 
	                                  viewportWidth, viewportHeight);
}


/**
 * loads map dimensions and prepares map placeholder
 */
function loadMapDimensions(){
	MAP_WIDTH = 3000; //656000; //hardcoded for now
	MAP_HEIGHT = 3000; //656000; //hardcoded for now
	var map_div = $('map');
	map_div.style.width = MAP_WIDTH + "px";
	map_div.style.height = MAP_HEIGHT + "px";
	map_div.className = "map_default";
	document.getElementById("map_height").innerHTML = MAP_HEIGHT;
	document.getElementById("map_width").innerHTML = MAP_WIDTH;
}

/**
 * aligns map so, that a point with specified coordinates is in the middle of
 * visible map area
 * @param {Object} top - specified top cooridnate
 * @param {Object} left - specified left coordinate
 */
function goToMapPosition(top,left){
	CURRENT_MAP_CENTER_LEFT = left;
	CURRENT_MAP_CENTER_TOP = top;
	var c_top = Math.floor(VIEWPORT_HEIGHT/2);
	var c_left = Math.floor(VIEWPORT_WIDTH/2);
	MAP_MARGIN_TOP = (CURRENT_MAP_CENTER_TOP - c_top)*(-1);
	MAP_MARGIN_LEFT = (CURRENT_MAP_CENTER_LEFT - c_left)*(-1);
	var map_div = $('map');
	map_div.style.left = MAP_MARGIN_LEFT + "px";
	map_div.style.top = MAP_MARGIN_TOP + "px";
	document.getElementById("cp_left").innerHTML = CURRENT_MAP_CENTER_LEFT;
	document.getElementById("cp_top").innerHTML = CURRENT_MAP_CENTER_TOP;
	document.getElementById("mm_left").innerHTML = MAP_MARGIN_LEFT;
	document.getElementById("mm_top").innerHTML = MAP_MARGIN_TOP;
}

/**
 * loads current map area
 */
function loadCurrentMapArea(){
	
	/*
	 * automatically render the map terrain
	 */
	renderCurrentTerrain(MAP_MARGIN_TOP*(-1), 
	                     MAP_MARGIN_LEFT*(-1), 
						 VIEWPORT_WIDTH, 
                         VIEWPORT_HEIGHT, 
						 100, 
						 'terrain',
						 29,
						 29);
	
	/*
	 * call server to get current buildings
	 */
	renderCurrentBuildings(MAP_MARGIN_TOP*(-1), 
	                     MAP_MARGIN_LEFT*(-1), 
						 VIEWPORT_WIDTH, 
                         VIEWPORT_HEIGHT);

}


/**
 * positions map tools according current page dimensions
 */
function positionMapTools(){
	//deprecated...	
}

///track mouse coordinates on the screen////////////////////////////////////////

/**
 * actual mouse coorinates ON THE VIEWPORT as globals
 */
var mouseX = 0;
var mouseY = 0;

/**
 * actual mouse coordinates ON THE MAP as globals
 */
var MAP_MOUSE_TOP = 0; // = y
var MAP_MOUSE_LEFT = 0; // = x


/** 
 * get mouse coordinates on the screen
 * retuns mouse coordinates in an array [x,y]
*/
function getMouseXY(e){
      // if we use IE, we must parse event 'e' manually
         if( !e ) {
   	 var e = window.event;
         }
      // if browser supports pageX and pageY <like in Opera, but not in IE>
	if (e.pageX || e.pageY) 	{
		mouseX = e.pageX;
		mouseY = e.pageY;
	}
      // else we will use clientX and clientY <for example IE>
	else if (e.clientX || e.clientY) 	{
		mouseX = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		mouseY = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	MAP_MOUSE_TOP = MAP_MARGIN_TOP*(-1) + mouseY;
	MAP_MOUSE_LEFT = MAP_MARGIN_LEFT*(-1) + mouseX;
	document.getElementById("mouse_x").innerHTML = mouseX;
	document.getElementById("mouse_y").innerHTML = mouseY;
	document.getElementById("map_x").innerHTML = MAP_MOUSE_LEFT;
	document.getElementById("map_y").innerHTML = MAP_MOUSE_TOP;
	
}
////////////////////////////////////////////////////////////////////////////////

/**
 * on page load actions
 */
function onPageLoad(){
	
	/*
	 * create map elements object
	 */
	MAP_ELEMENTS = new MapElements(MAP_ELEMENT_DIM);
	
	/*
	 * create menu object (in unlogged mode by default)
	 */
	MENU_DIALOG = new MenuDialog('header_menu',0);
		
	/*
 	* assign on mousemove tracking event on the page
 	*/
	document.onmousemove = getMouseXY;
	
	/*
	 * get initial width and height of the visible map area
	 */
	calculateVisibleMapDimensions();
	
	/*
	 * assign resize event and actions to the page
	 */
	window.onresize = function(){
		calculateVisibleMapDimensions();
		goToMapPosition(CURRENT_MAP_CENTER_TOP,CURRENT_MAP_CENTER_LEFT);
		loadCurrentMapArea();
		positionMapTools();
		DRAG_STEP_VALUE = Math.floor(VIEWPORT_WIDTH*0.01);
		if (MAP_NAVIGATOR){
			MAP_NAVIGATOR.update();
		}
		Popup.resize();
	}
	
	/*
	 * assign bouble click event to the map
	 */
	Event.observe($('map'), 'dblclick', function(event) {
		goToMapPosition(MAP_MOUSE_TOP,MAP_MOUSE_LEFT);
		loadCurrentMapArea();
		if (MAP_NAVIGATOR){
			MAP_NAVIGATOR.update();
		} 
	});
	
	/*
	 * assign menu togglers
	 */	
	Event.observe($('np_menu_toggler'), 'click', function(event) {
		var obj = $('np_menu_wrapper');
		if (obj.visible() === true){
			obj.hide(); 
		}else{
			obj.show();
		}
	});
	
	Event.observe($('np_navigator_toggler'), 'click', function(event) {
		var obj = $('np_navigator_wrapper');
		if (obj.visible() === true){
			obj.hide(); 
		}else{
			obj.show();
		}
	});
	
	
	/*
	 * perform initial map load
	 */
	loadMapDimensions();
	goToMapPosition(1500,1500); //dummy position hardcoded for now
	loadCurrentMapArea();
	positionMapTools();
	DRAG_STEP_VALUE = Math.floor(VIEWPORT_WIDTH*0.01);
	
	/*
	 * make map draggable
	 */
    new Draggable('map', {onEnd: function(){
		var map = $('map');
		map.show();
		calculateVisibleMapDimensions();		
        var calcLeft = map.style.left;
		var calcTop = map.style.top;
		calcLeft = calcLeft.replace('px','')*1;
		calcTop = calcTop.replace('px','')*1;
		MAP_MARGIN_TOP = calcTop;
		MAP_MARGIN_LEFT = calcLeft;
        var c_top = Math.floor(VIEWPORT_HEIGHT/2);
	    var c_left = Math.floor(VIEWPORT_WIDTH/2);
		if (MAP_MARGIN_LEFT < 0){
			CURRENT_MAP_CENTER_LEFT = MAP_MARGIN_LEFT*(-1) + c_left;	
		}else{
			CURRENT_MAP_CENTER_LEFT = MAP_MARGIN_LEFT + c_left;
		}
		if (MAP_MARGIN_TOP < 0){
			CURRENT_MAP_CENTER_TOP = MAP_MARGIN_TOP*(-1) + c_top;	
		}else{
			CURRENT_MAP_CENTER_TOP = MAP_MARGIN_TOP + c_top;
		}
		goToMapPosition(CURRENT_MAP_CENTER_TOP,CURRENT_MAP_CENTER_LEFT);
		loadCurrentMapArea();
    	positionMapTools();
		DRAG_STEP_VALUE = Math.floor(VIEWPORT_WIDTH*0.01);
		if (MAP_NAVIGATOR){
			MAP_NAVIGATOR.update();
		}
	} });
	
	/*
	 * hide the curtain
	 */
	Element.hide('curtain');
		
	/*
	 * hide initial load curtain when all elements are ready
	 */
	Effect.Fade('initial_load');
	
	/*
	 * add periodical page updater with period of 1 Minute
	 */
	new PeriodicalExecuter(function(){
		loadCurrentMapArea();
	},60);
	
	/*
	 * render map navigator 
	 */
	MAP_NAVIGATOR = new MapNavigator();
	
}