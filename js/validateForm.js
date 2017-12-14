function validateForm(formId, validateNow){
	let everythingOk = false;

	function isStringEmpty(string){
		if (string.replace(/\s+/g,'') == ''){
			return true;
		}
		else{
			return false;
		}
	}

	function checkIfEmpty(item){
		if (isStringEmpty(item.value)){
			showMessage(item,'Proszę uzupełnić poniższe pole.');
			everythingOk = false;
		}
		else{
			hideMessage(item);
			everythingOk = true;
		}
	}

	function checkEmail(item){
		if(!isStringEmpty(item.value)){
			if (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,3}$/i.test(item.value)){
				hideMessage(item);
				everythingOk = true;
			}
			else{
				showMessage(item,'Proszę podać poprawny adres e-mail');
				everythingOk = false;
			}
		}
	}

	function showMessage(item, message){
		let p = item.parentNode.querySelector('#form-input-warning' + item.i);
		if(!p){
			let p = document.createElement('P');
			p.classList.add('form-input-warning');
			p.setAttribute('id','form-input-warning' + item.i);
			p.innerHTML = message;
			item.parentNode.insertBefore(p, item);
		}
		else{
			p.innerHTML = message;
		}
	}

	function hideMessage(item){
		let p = item.parentNode.querySelector('#form-input-warning' + item.i);
		if(p){
			p.outerHTML = '';
		}
	}

	function doAllChecks(item){
		checkIfEmpty(item);
		if(item.getAttribute('type') == 'email'){
			checkEmail(item);
		}
	}

	let form = document.getElementById(formId);
	let allFormInputs = [];
	// console.log(form.getElementsByTagName('*'));
	let formInputs = form.getElementsByTagName('input');
	let formTextareas = form.getElementsByTagName('textarea');
	for (var i = 0; i < formInputs.length; i++) {
		allFormInputs.push(formInputs[i]);
	}
	for (var i = 0; i < formTextareas.length; i++) {
		allFormInputs.push(formTextareas[i]);
	}
	//console.log(allFormInputs);

	foreach(allFormInputs, (item, i) => {
		item.i = i;
		item.addEventListener('focusout', () => {
			doAllChecks(item);
		});
		item.addEventListener('input', () => {
			doAllChecks(item);
		});
		if(validateNow){
			doAllChecks(item);
		}
	});

	return everythingOk;
}