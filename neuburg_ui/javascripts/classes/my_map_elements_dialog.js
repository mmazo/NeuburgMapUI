/**
 * @author mmazo
 */

function MyMapElementsDialog(){
	/*
	 * fill the dialog and show it
	 */
	Popup.create('My map elements',600, 500, function(conId){
			$(conId).innerHTML = "my map elements dialog content";
	});	
}