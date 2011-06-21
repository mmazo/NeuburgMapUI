/**
 * MapElement class represents the single map element and contains all necessary
 * functionality around this element
 * @author mmazo http://www.mmazo.de
 * 
 * @param {Object} id - element id
 * @param {Object} top - absolute element top position in pixel
 * @param {Object} left - absolute element left position in pixel
 * @param {Object} source - element image source
 * @param {Object} title - element image title
 * @param {Object} clickFunction - element onclick function with event as param
 * @param {Object} hoverFunction - element mouseover function with event as param
 */
function MapElement(id, top, left, source, title, clickFunction, hoverFunction){
	
	/**
	 * element id
	 */
	this.id = id;
	
	/**
	 * absolute element top position on the map in pixel
	 */
	this.top = top;
	
	/**
	 * absolute element left position on the map in pixel
	 */
	this.left = left;
	
	/**
	 * element image source
	 */
	this.source = source;
	
	/**
	 * element image title
	 */
	this.title = title;
	
	/**
	 * element DOM Object
	 */
	this.object = null;
		
	/**
	 * updates element attribute values from DOM
	 */
	this.update = function(){
		this.object = $(id);
		this.source = this.object.src;
		this.title = this.object.title;
	};
	
	/**
	 * commits element attribute changes to the DOM
	 */
	this.commit = function(){
		this.object.style.top =  this.top + "px";
		this.object.style.left = this.left + "px";
		this.object.src = this.source;
		this.object.title = this.title;
	};
	
	/**
	 * adds element to the map if it does not exist yet; otherwise updates
	 * element attributes from the DOM
	 */
	this.add = function(){
		var elem = $(this.id);
		if (!elem){
			var innerDiv = document.getElementById("map");
		    var haus = document.createElement("img");
		    haus.src = this.source;
		    haus.style.position = "absolute";
		    haus.style.left = this.left + "px";
		    haus.style.top = this.top + "px";
		    haus.style.zIndex = 2;
			haus.title = this.title;
		    haus.setAttribute("id", this.id);
			haus.className = "building";
		    innerDiv.appendChild(haus);
			this.object = $(this.id);
			Event.observe(this.object, 'click', function(event){
				var elemId = Event.element(event).id;
				var prev = new mapElementPreviewDialog(elemId,elemId);
				clickFunction(event);
			});
			Event.observe(this.object, 'mouseover', function(event){
				hoverFunction(event);
			});
		}else{
			this.update();
		}
	};
	
	/**
	 * removes element from the map
	 */
	this.remove = function(){
		var innerDiv = document.getElementById("map");
		innerDiv.removeChild(this.object);
		this.object = null;
	};
	
	
	/**
	 * removes map element by given id
	 * @param {Object} elemId
	 */
	MapElement.removeById = function(elemId){
		var innerDiv = document.getElementById("map");
		var elem = $(elemId);
		innerDiv.removeChild(elem);
		this.object = null;
	};
	
	/*
	 * try to add the element on object creation
	 */
	this.add();
}