let signInButton = document.getElementById('SignIn');
let forgotButton = document.getElementById('Forgot');
let signUpButton = document.getElementById('SignUp');
let userInput = document.getElementById('mail');
let passInput = document.getElementById('pass');
let successLoginMessage = document.getElementById('sign-in-success');
let errorLoginMessage = document.getElementById('sign-in-error');
let user = document.getElementById("mail");
let pass = document.getElementById("pass");
let arrayValidations = [];

successLoginMessage.style.display = "none";
errorLoginMessage.style.display = "none";


signInButton.addEventListener("click",  function validation(event){
	//console.log("userInput esta funcionando");
	
	//console.log(`user.value ${user.value}`);
	//console.log(`pass.value ${pass.value}`);

	
	emailValidations(user.value);

	
	
	//throwError("pass", "pass-error", "Something is wrong with the Pass");
});
 
userInput.addEventListener("click", function makeMailAvailable(event){
	signInButton.disabled = false;
});

passInput.addEventListener("change", function makePassAvailable(event){
	signInButton.disabled = false;
});

 	//clearError("mail-error");
	//signInButton.disabled = false;


	/**	VALIDACIONES DEL MAIL
	 *	1. validar lenght antes de la arroba (DONE)
	 *	2. validar que los caracteres sean alfanumericos, guion medio, guion bajo o punto
	 * 		name (DONE)
	 * 		domain
	 * 		com
	 *	3. validar que tenga una arroba (DONE)
	 *	4. validar el dominio despues de la arroba
	 *	5. validar que termine en .com
	 *	6. validar que el tipo sea email
	 *	7. validar que el field sea requerido
	 */

	function emailValidations(userEmail) {
		if(userEmail != null && userEmail != undefined) {
			//console.log(`userEmail ${userEmail}`);
			let name = userEmail.substring(0, userEmail.lastIndexOf("@"));
			let domain = userEmail.substring(userEmail.lastIndexOf("@") + 1, userEmail.indexOf("."));
			let com = userEmail.substring(userEmail.indexOf(".") + 1, userEmail.length);
			
			if(emailAtValidation(userEmail) && emailNameValidation(name) && emailDomainValidation(domain) && emailComValidation(com)){
				clearError("mail-error");
				trhowSignInMessage("sign-in-success", "Looks good!");
			} else {
				trhowSignInMessage("sign-in-error", "Not able to log in");
				signInButton.disabled = true;
			}
		} else {
			trhowSignInMessage("sign-in-error", "Not able to log in");
			signInButton.disabled = true;
		}
	}

	function emailComValidation(emailCom) {
		let toReturn = 0;

		if(emailCom != null && emailCom != undefined && emailCom.length == 3 && emailCom == "com" ){
			toReturn = 1;
		} else {
			throwError("mail-error", `E-mail com is not right`);
			toReturn = 0;
		}

		return toReturn;
	}

	function emailDomainValidation(emailDomain)
	{
		let toReturn = 0;

		if(emailDomain != null && emailDomain != undefined && emailDomain.length >= 4 ){
			toReturn = 1;
		} else {
			throwError("mail-error", `E-mail domain is not long enough`);
			toReturn = 0;
		}

		for(let d = 0; d < emailDomain.length; d++) {
			if(
				(emailDomain[d].charCodeAt() >= 65 && emailDomain[d].charCodeAt() <= 90) || 
				(emailDomain[d].charCodeAt() >= 97 && emailDomain[d].charCodeAt() <= 122)
			){
				toReturn = 1;
			} else {
				throwError("mail-error", `Invalid character ${emailDomain[d]} at domain position ${(d + 1)}`);
				toReturn = 0;
				break;
			}
		}
		return toReturn;
	}

	function emailAtValidation(userEmail) {
		let toReturn = 0;
		let counter = 0;
		if(userEmail != null && userEmail != undefined) { 
			for(let n = 0; n < userEmail.length; n++) {
				if(userEmail.indexOf("@") >= 2) {
					clearError("mail-error");
					if(userEmail[n] == "@"){
						counter++;
					}
				} else {
					throwError("mail-error", `The E-mail name is too short`);
					break;
				}
			}	
		} else {
			throwError("mail-error", "Invalid E-mail format");
		}
		if(counter == 1) toReturn = 1;
		return toReturn;

	}

	function emailNameValidation(emailName) {
		let toReturn = 0;
		if(emailName != null && emailName != undefined && emailName.length >= 2 ){
			console.log(`emailName.length ${emailName.length}`);
			toReturn = 1;
		} else {
			throwError("mail-error", `E-mail name is not long enough`);
			toReturn = 0;
		}

		for(let n = 0; n < emailName.length; n++) {
			if(
				(emailName[n].charCodeAt() >= 65 && emailName[n].charCodeAt() <= 90) || 
				(emailName[n].charCodeAt() >= 97 && emailName[n].charCodeAt() <= 122) || 
				emailName[n].charCodeAt() == 46 || 
				emailName[n].charCodeAt() == 95 || 
				emailName[n].charCodeAt() == 45
			){
				toReturn = 1;
			} else {
				throwError("mail-error", `Invalid character ${emailName[n]} at name position ${(n + 1)}`);
				toReturn = 0;
				break;
			}
		}
		return toReturn;
	}
	function typeEmailValidation(userEmail) {}
	function requiredEmailValidation(userEmail) {}


	/* VALIDACIONES DE LA PASS
	 * 1. validar lenght
	 * 2. validar que tenga una mayuscula, una minuscula, un caracter extraño y algun numero
	 * 3. validar que el tipo sea password
	 * 4. validar que el field sea requerido
	 */

	function passLength(passEmail) {}
	function lowUpeSymNumValidation(passEmail) {}
	function typePasswordValidation(passEmail) {}
	function requiredPassValidation(passEmail) {}
	
		
/* GENERAL */

function throwError(errorMessageLocator, message){
	document.getElementById(errorMessageLocator).innerText = message;
}

function clearError(errorMessageLocator) {
	document.getElementById(errorMessageLocator).innerText = "";
}

function trhowSignInMessage(messageLocator, message) {
	document.getElementById(messageLocator).style.display = "block";
	document.getElementById(messageLocator).innerText = message;
	setTimeout(function(){
		document.getElementById(messageLocator).style.display = "none";
		document.getElementById(messageLocator).innerText = "";
	},3000);
}

/**	BIBLIOGRAFIA
 *	https://stackoverflow.com/questions/4843472/javascript-listener-keypress-doesnt-detect-backspace
 *	https://www.quirksmode.org/dom/events/keys.html
 *	https://www.quirksmode.org/js/keys.html
 *	https://stackoverflow.com/questions/10911047/keydown-event-new-value
 *	https://www.quirksmode.org/dom/events/keys.html
 *	https://www.quirksmode.org/js/keys.html
 */