/**
 * @author mmazo
 * shows the preview dialog above the clicked element
 */

function mapElementPreviewDialog(elementDbId, elementDOMId){
	var elemId = elementDbId;
	var elem = $(elementDOMId);
	var elemLeft = elem.style.left.replace('px','')*1;
	var elemTop = elem.style.top.replace('px','')*1;
	var prvId = elementDOMId + "_PREVIEW";
	var prvIdClose = elementDOMId + "_PREVIEW_CLOSE";
	var prvLeft = elemLeft;
	var prvTop = elemTop - 150;
	
	var contentHTML = "<button id='" + 
	                  prvIdClose + 
					  "' class='mapElementPreviewDialogClose'></button>";
	
	/*
	 * create the preview element
	 */
	if (!$(prvId)){	
		var innerDiv = document.getElementById("map");
		var prv = document.createElement("div");
		prv.style.position = "absolute";
		prv.style.left = prvLeft + "px";
		prv.style.top = prvTop + "px";
		prv.style.zIndex = 3;
		prv.setAttribute("id", prvId);
		prv.className = "mapElementPreviewDialog";
		innerDiv.appendChild(prv);
		var prvEl = $(prvId);
		prvEl.innerHTML = contentHTML;
		Event.observe($(prvIdClose), 'click', function(event){
			var elemId = Event.element(event).parentNode.id;
			MapElement.removeById(elemId);
		});
	}
}