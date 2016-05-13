var  user = document.getElementById('user'),
      password = document.getElementById('password'),
      admin = document.getElementById('admin'),
      register,
      users = localStorage.getItem("users") || "",
      userErrorHTML= document.getElementById('userError'),
      passwordErrorHTML= document.getElementById('passwordError'),
      infoHTML= document.getElementById('infoHTML'),
      userOk = false,
      passOk = false,
      home = document.location,
      usersArray = users?JSON.parse(users):[];

function signUp(){
  if(validateEntryData()){
  register = {"username": user.value, "password": password.value,"admin": admin.checked};
  /*var esAdmin = document.getElementById("esAdmin").checked;*/
  //TODO: falta el esAdmin
	usersArray.push(register);
	localStorage.setItem("users", JSON.stringify(usersArray));
  infoHTML.innerHTML = 'Congratulations! You signed up correctly.';
  cleanFields();
  }else{
    infoHTML.innerHTML = 'Error. Try again later';
  }
}

function signIn(){
  var passwordOk = false;
	usersArray.forEach(function(entry) {
		if(user.value === entry.username && password.value === entry.password){
			passwordOk = true;
		} else {
			passwordOk = false;
		}

		if(passwordOk) {
			passwordError.innerHTML = '';
			localStorage.setItem("loguedUser", entry.username);
      localStorage.setItem("loguedPassword", entry.password);
      localStorage.setItem("admin", entry.admin);
      openHome();
		} else {
			userError.innerHTML = '';
			passwordError.innerHTML = 'Incorrect User or Password';
		}
	});
}

function validateEntryData(){
  var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=",
  	check = function(string){
  	 	for(i = 0; i < specialChars.length;i++){
  		    if(string.indexOf(specialChars[i]) > -1){
  		       	return true
  	    	}
  		}
  		return false;
  	};

	if (user.value.length == 0) {
		userError.innerHTML = 'You must complete username data';
	} else if(check(user.value) == true) {
		userError.innerHTML = 'The username has special characters';
	} else {
		userError.innerHTML = '';
		userOk = true;
	}

	if (password.value.length == 0) {
		passwordError.innerHTML = 'You must complete password data';
	} else if(password.value.length < 7) {
		passwordError.innerHTML = 'The password should not be less than 7 characters';
	} else if(check(password.value) == true) {
		passwordError.innerHTML = 'The password has special characters';
	} else {
		passwordError.innerHTML = '';
		passOk = true;
	}

return userOk && passOk;
}

function cleanFields(){
  user.value = "";
  password.value="";
  admin.checked=false;
  user.focus();
}

function openHome(){
  home.replace("home.html");
}
