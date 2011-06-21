/**
 * @author mmazo
 */

function RegisterDialog(){
	
	var con = "<form action='http://localhost/mmazo/neuburg/' method='post'>" +
	          "<p>Name:<br><input type='text' name='name'></p>" +
			  "<p>Family Name:<br><input type='text' name='fname'></p>" +
			  "<p>Login:<br><input type='text' name='login'></p>" +
			  "<p>Password:<br><input type='password' name='psw'></p>" +
			  "<button id='registerButton' type='submit'>Register</button>" +
			  "</form>";

	/*
	 * fill the dialog and show it
	 */
	Popup.create('Register',600, 500, function(conId){
			$(conId).innerHTML = con;
	});

}