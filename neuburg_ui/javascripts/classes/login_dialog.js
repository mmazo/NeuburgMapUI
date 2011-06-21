/**
 * @author mmazo
 */

function LoginDialog(){
	
	var con = "<form action='http://localhost/mmazo/neuburg/' method='post'>" +
			  "<p>Login:<br><input type='text' name='login'></p>" +
			  "<p>Password:<br><input type='password' name='psw'></p>" +
			  "<button id='loginButton' type='submit'>Login</button>" +
			  "</form>";
	
	/*
	 * fill the dialog and show it
	 */
	Popup.create('Login',300, 300, function(conId){
			$(conId).innerHTML = con;
	});
}