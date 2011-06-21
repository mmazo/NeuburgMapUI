/**
 * @author mmazo
 */

function SearchDialog(){
	
	var con = "<form action='http://localhost/mmazo/neuburg/' method='post'>" +
	          "<p>Name:<br><input type='text' name='name'></p>" +
			  "<p>Family Name:<br><input type='text' name='fname'></p>" +
			  "<p>Street:<br><input type='text' name='street'></p>" +
			  "<p>Street Number:<br><input type='text' name='number'></p>" +
			  "<button id='searchButton' type='submit'>Search</button>" +
			  "</form>";
	
	/*
	 * fill the dialog and show it
	 */
	Popup.create('Search citizen',600, 500, function(conId){
			$(conId).innerHTML = con;
	});	
}