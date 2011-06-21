/**
 * MapElements ist responsible for displaying map element objects on the map
 * @author mmazo http://www.mmazo.de
 * 
 * @param {Integer} standardMapElemDim - map element square side diemension in px
 */
function MapElements(standardMapElemDim){
	
	/**
	 * map element square side dimension in px
	 */
	var sideDim = standardMapElemDim;
	
	/**
	 * an array of MapElement objects
	 */
	var mapElems = [];
	
	/**
	 * returns map elements array
	 */
	this.getElements = function(){
		return mapElems;
	};
	
	/**
	 * sets new elements array
	 * @param {Object} newElemsArray
	 */
	this.setElements = function(newElemsArray){
		mapElems = newElemsArray;
	};
	
	/**
	 * load the map elements to the given area
	 * @param {Object} top - area top left corner absolute top position
	 * @param {Object} left - area top left corner absolute left position
	 * @param {Object} width - area with in pixel
	 * @param {Object} height - area height in pixel
	 */
	this.loadElementsForGivenArea = function(top, left, width, height){
		
		/////this should come from server//////////////////////////////
		var resp = [{"id":"h0","top":"1960","left":"1900","src":"images/houses/haus_01.gif","title":"Here wohnen Misha, Yuan und kleiner BaoBao"},
		            {"id":"h1","top":"1904","left":"1810","src":"images/houses/vacant.gif","title":"Dieses Grundstuck ist frei. Jetzt reservieren!"},
					{"id":"h2","top":"1840","left":"1720","src":"images/houses/taken.gif","title":"Dieses Grundstuck ist bereis reserviert!"},
					{"id":"h3","top":"1890","left":"1609","src":"images/houses/haus_02.gif","title":"Hier wohnen Julius, Hue und Daniel"}];
		///////////////////////////////////////////////////////////////
		
		mapElems = [];			
		var innerDiv = document.getElementById("map");
		var haus = {};
		for (k = 0; k < resp.length; k++){
			haus = new MapElement(resp[k].id, 
								  resp[k].top, 
								  resp[k].left, 
								  resp[k].src, 
								  resp[k].title, 
								   function(ev){}, 
								   function(ev){});
			mapElems.push(haus);
		}

	};
	
	/**
	 * removes elements for the map, that are currently outside given area
	 * @param {Object} top - area top left corner absolute top position
	 * @param {Object} left - area top left corner absolute left position
	 * @param {Object} width - area with in pixel
	 * @param {Object} height - area height in pixel
	 */
	this.removeElementOutsideGivenArea = function(top, left, width, height){
		var vpMaxTop = top + height;
		var vpMaxLeft = left + width;
		for (i=0; i<mapElems.length; i++){
			var minTop = mapElems[i].top*1;
			var minLeft = mapElems[i].left*1;
			var maxTop = minTop + sideDim;
			var maxLeft = minLeft + sideDim;
			var inside = false;
						
			if ((minTop >= top)&&(minTop <= vpMaxTop)&&(minLeft >= left)&&(minLeft <= vpMaxLeft)){ inside = true; }
			if ((maxTop >= top)&&(maxTop <= vpMaxTop)&&(maxLeft >= left)&&(minLeft <= vpMaxLeft)){ inside = true; }
			
			if (inside === false){mapElems[i].remove();}
		}
		$('buildings_nr').innerHTML = document.getElementsByClassName("building").length;
	};
	
}