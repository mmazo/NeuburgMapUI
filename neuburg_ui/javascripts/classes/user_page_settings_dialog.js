/**
 * @author mmazo
 */

function UserPageSettingsDialog(){
	
	var con = "<form action='http://localhost/mmazo/neuburg/' method='post'>" +
	          "<p>Page Content:<br><textarea id='mpcon' name='mpcon'></textarea></p>" +
			  "<button id='searchButton' type='submit'>Save</button>" +
			  "</form>";
	
	/*
	 * fill the dialog and show it
	 */
	Popup.create('My page',600, 500, function(conId){
			$(conId).innerHTML = con;
	});	
}