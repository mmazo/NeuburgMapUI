/**
 * @author mmazo
 */

function UserPageDialog(){
	/*
	 * fill the dialog and show it
	 */
	Popup.create('User Info',600, 500, function(conId){
			$(conId).innerHTML = "user page dialog content";
	});	
}