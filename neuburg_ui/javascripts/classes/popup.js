/**
 * @author mmazo
 */


Popup = {
	
	width : 0,
	
	height : 0,
	
	create : function (title, width, height, renderContentFunc){		
		Popup.width = width;
		Popup.height = height;
		var popupId = "popupElement";
		var popupIdClose = "popupElementClose";
		var popupIdContent = "popupElementContent";
		var contentHTML = "<div class='popupElementHeader'>" +
								  "<b class='popupElementTitle'>" +
								  title +
								  "</b>" + 
				                  "<button id='" + 
				                  popupIdClose + 
								  "' class='popupElementClose'>" + 
								  "</button>" + 
						  "</div>" +
						  "<div id='" + 
			                  popupIdContent + 
						  "' class='popupElementContent'></div>";
		var popupWidth = width;
		var popupHeight = height;
		if (popupWidth > VIEWPORT_WIDTH){ popupWidth = VIEWPORT_WIDTH }
		if (popupHeight > VIEWPORT_HEIGHT){ popupHeight = VIEWPORT_HEIGHT }
		var popupMarginLeft = Math.floor(popupWidth/2)*(-1);
		var popupMarginTop = Math.floor(popupHeight/2)*(-1);
		if (!$(popupId)){
			var popup = document.createElement("div");
			popup.setAttribute("id", popupId);
			popup.className = "popupElement";
			popup.style.width = popupWidth + "px";
			popup.style.height = popupHeight + "px";
			popup.style.marginLeft = popupMarginLeft + "px";
			popup.style.marginTop = popupMarginTop + "px";		
			document.body.appendChild(popup);
			var popupEl = $(popupId);
			popupEl.innerHTML = contentHTML;		
		    var popupCon = $(popupIdContent);
			popupCon.style.width = (popupWidth - 20) + "px";
			popupCon.style.height = (popupHeight - 40) + "px";
			Event.observe($(popupIdClose), 'click', function(event){
				var elemId = Event.element(event).parentNode.parentNode.id;			
				document.body.removeChild($(elemId));
				$('curtain').hide();
			});
			renderContentFunc(popupIdContent);
			$('curtain').show();
		}
	},
	
	resize : function(){
	    var popupId = "popupElement";
		var popupIdContent = "popupElementContent";
		if ($(popupId)){
			var popup = $(popupId);			
			var popupWidth = popup.style.width.replace("px","")*1;
			var popupHeight = popup.style.height.replace("px","")*1;
			if (popupWidth > VIEWPORT_WIDTH){
				popupWidth = VIEWPORT_WIDTH; 
			}else{
				popupWidth = Popup.width;
				if (popupWidth > VIEWPORT_WIDTH){popupWidth = VIEWPORT_WIDTH}
			}
			if (popupHeight > VIEWPORT_HEIGHT){
				popupHeight = VIEWPORT_HEIGHT; 
			}else{
				popupHeight = Popup.height;
				if (popupHeight > VIEWPORT_HEIGHT){popupWidth = VIEWPORT_HEIGHT}
			}
			var popupMarginLeft = Math.floor(popupWidth/2)*(-1);
			var popupMarginTop = Math.floor(popupHeight/2)*(-1);
			popup.style.width = popupWidth + "px";
			popup.style.height = popupHeight + "px";
			popup.style.marginLeft = popupMarginLeft + "px";
			popup.style.marginTop = popupMarginTop + "px";		
		    var popupCon = $(popupIdContent);
			popupCon.style.width = (popupWidth - 20) + "px";
			popupCon.style.height = (popupHeight - 40) + "px";
		}	
	}
	
}