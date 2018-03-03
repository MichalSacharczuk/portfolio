'use strict';

function validateForm(formId, validateNow) {
	var everythingOk = true;

	function isStringEmpty(string) {
		if (string.trim() == '') {
			return true;
		} else {
			return false;
		}
	}

	function checkIfEmpty(item) {
		if (isStringEmpty(item.value)) {
			showMessage(item, 'Proszę uzupełnić poniższe pole.');
			item.checks.notEmptyOk = false;
		} else {
			hideMessage(item);
			item.checks.notEmptyOk = true;
		}
	}

	function checkEmail(item) {
		if (!isStringEmpty(item.value)) {
			if (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,3}$/i.test(item.value)) {
				hideMessage(item);
				item.checks.mailOk = true;
			} else {
				showMessage(item, 'Proszę podać poprawny adres e-mail');
				item.checks.mailOk = false;
			}
		}
	}

	function showMessage(item, message) {
		var p = item.parentNode.querySelector('#form-input-warning' + item.i);
		if (!p) {
			var _p = document.createElement('P');
			_p.classList.add('form-input-warning');
			_p.setAttribute('id', 'form-input-warning' + item.i);
			_p.innerHTML = message;
			item.parentNode.insertBefore(_p, item);
		} else {
			p.innerHTML = message;
		}
	}

	function hideMessage(item) {
		var p = item.parentNode.querySelector('#form-input-warning' + item.i);
		if (p) {
			p.outerHTML = '';
		}
	}

	function doAllChecks(item) {
		checkIfEmpty(item);
		if (item.getAttribute('type') == 'email') {
			item.checks.mailOk = false;
			checkEmail(item);
		}
	}

	var form = document.getElementById(formId);
	var allFormInputs = [];
	var formInputs = form.querySelectorAll('input[required]');
	var formTextareas = form.querySelectorAll('textarea[required]');
	for (var i = 0; i < formInputs.length; i++) {
		allFormInputs.push(formInputs[i]);
	}
	for (var i = 0; i < formTextareas.length; i++) {
		allFormInputs.push(formTextareas[i]);
	}

	foreach(allFormInputs, function (item, i) {
		item.i = i;
		item.checks = { notEmptyOk: false };
		item.addEventListener('focusout', function () {
			doAllChecks(item);
		});
		item.addEventListener('input', function () {
			doAllChecks(item);
		});
		if (validateNow) {
			doAllChecks(item);

			for (var check in item.checks) {
				if (item.checks[check] == false) {
					everythingOk = false;
				}
			};
		}
	});

	return everythingOk;
}