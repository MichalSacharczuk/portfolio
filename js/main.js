let colors = [
	"#D5FBFF",
	"#9FBCBF",
	"#647678",
	"#2F3738",
	"#59D8E5"
];

function windowScrollY(){
	return document.body.scrollTop || document.documentElement.scrollTop;
}

function doMailAnimation(){
	let sectionContact = document.querySelector('.section--contact');
	window.scrollTo(0, windowScrollY() + sectionContact.getBoundingClientRect().y + sectionContact.clientHeight)	
	setTimeout(() => {
		let mailInfo;
		if(sessionStorage.mailSuccess == "true"){
			document.querySelector('#envelope-top').classList.add('closed-envelope');
			mailInfo = '<span style="color:#2cd538">Wiadomość wysłana pomyślnie!</span>';
			setTimeout(() => {
				document.querySelector('#envelope-imgs').classList.add('thrown-envelope');
				setTimeout(showMailOkBox, 1000);
			},500);
		}
		else mailInfo = '<span style="color:#d42">Nie udało się wysłać wiadomości</span>';

		setTimeout(() => {
			document.querySelector('#envelope-info').innerHTML = mailInfo;
			setTimeout(() => {
				document.querySelector('#envelope-info').innerHTML = '';
			},3000);
		},800);
	},500);
}

function chechIfMailIsSentAndDoMailAnimation(){
	if (sessionStorage.mailSent == "true"){
		doMailAnimation();
		sessionStorage.mailSent = false;
	}
}

// do testowania:
// document.querySelector('.centered-vertically li:first-of-type').onclick = doMailAnimation;

function disableClickedFormButtonAndSubmitForm(formId){
	let item = document.querySelector('#' + formId + ' .form__button');
	item.addEventListener('click', () => {
		if(validateForm('my-form', true)){
			item.classList.add('form__button--disabled');
			item.setAttributeNode(document.createAttribute("disabled"));
			document.getElementById(formId).submit();
		}
	});
}

function showMailOkBox(){
	document.querySelector('.mail-ok-box').classList.add('no-transform');
}

function foreach(array, callback){
	for (let i = 0; i < array.length; i++) {
		callback.call(array, array[i], i);
	}
}

function startJumpingLetters() {

	// let textContents = [];
	foreach(document.getElementsByClassName('bouncing-letters'), (element) => {
		element.style.opacity = 1;
		// textContents.push(element.textContent);
		let letters = element.textContent.split("");
		element.innerHTML = "";
		// console.log(letters);
		let lastLetterWasSpace = 0;
		for (i in letters){
			if (i == 0){
				element.innerHTML += '<div class="bouncing-letter text-color-5">' + letters[i] + '</div>';
			}
			else if (letters[i] == " "){
				letters[i] = '&nbsp;';
				element.innerHTML += '<div class="bouncing-letter bouncing-letter--space">' + letters[i] + '</div>';
				lastLetterWasSpace = 1;
			} 
			else{
				if (lastLetterWasSpace == 1){
					element.innerHTML += '<div class="bouncing-letter text-color-5">' + letters[i] + '</div>';
					lastLetterWasSpace = 0;
				}
				else 
					element.innerHTML += '<div class="bouncing-letter">' + letters[i] + '</div>';
			}
		}
	});

	foreach(document.getElementsByClassName('bouncing-letter'), (element) => {
		element.style.bottom = Math.random() * 100 + window.innerHeight / 2 + 'px';
		element.dh = 0;
		element.h = Number(element.style.bottom.split('px')[0]);
		// console.log(element.h);
	});

	let t = 0;
	const a = -0.2;
	const damping = .4;
	const scalingH = 150;
	let makeLettersBounce = setInterval(function(){
		foreach(document.getElementsByClassName('bouncing-letter'), (element) => {
			// console.log(element.dh);
			if (element.h + element.dh > 0){
				element.dh += a;
			}
			else if (Math.abs(element.dh) > 1e-8){
				element.dh = -element.dh * damping;
			}
			else{
				clearInterval(makeLettersBounce);
				// console.log("END");
				launchHeaderSubtitle();
			}
			element.h += element.dh;
			element.style.bottom = element.h + 'px';
		});
		t++;
	},10);
}

function launchHeaderSubtitle(){
	document.querySelector('.opacity0').style.opacity = 1;
}

function decreaseNavOnScroll(){
	let headerTitle = document.querySelector('.header__title');
	let headerTitleTop = window.innerHeight / 2;

	function toggleNavClasses(){
		let scrollTop = windowScrollY();
		let windowScrollTopToMoveTitleToNav = window.innerHeight / 3;
		if (scrollTop > windowScrollTopToMoveTitleToNav){
			foreach(document.querySelectorAll('.nav--default'), (item) => {
				item.classList.add('nav--scrolled');
			});
			// foreach(document.querySelectorAll('.nav'), (item) => {
			// 	item.classList.add('nav--shadow');
			// });
			document.querySelector('.header__title').classList.add('header__title--scrolled');
			document.querySelector('.header__title').classList.remove('centered');
			headerTitle.style.top = 0 + 'px';
		}
		else{
			foreach(document.querySelectorAll('.nav--default'), (item) => {
				item.classList.remove('nav--scrolled');
			});
			// foreach(document.querySelectorAll('.nav'), (item) => {
			// 	item.classList.remove('nav--shadow');
			// });
			document.querySelector('.header__title').classList.remove('header__title--scrolled');
			document.querySelector('.header__title').classList.add('centered');
			headerTitle.style.top = headerTitleTop - scrollTop + 'px';
		}
	}

	toggleNavClasses();

	document.addEventListener('scroll', () => {
		toggleNavClasses();
		// console.log(windowScrollY());
		// console.log(document.querySelector('body').getBoundingClientRect().y);
		// console.log("");
	});

	addEventListener('resize', () => {
		headerTitleTop = window.innerHeight / 2;
		toggleNavClasses();
	});
}


function addAnimationClass(className) {
	this.runFunction = (className) => {
		let argument = className;
		let elementsArray = document.getElementsByClassName(className);
		for (var i = elementsArray.length - 1; i >= 0; i--) {
			let item = elementsArray[i];
			if (item.getBoundingClientRect().y < window.innerHeight * 0.7){
				item.classList.add(className + '-animation');
			}
		}
	}
	this.runFunction(className);
	document.addEventListener('scroll', () => {this.runFunction(className)});
}

function scrollToY(y, speed){
	let currentY = windowScrollY();
	let distanceToScroll = y - currentY;
	let interval = Math.max(10, Math.round(speed / Math.abs(distanceToScroll)));
	let dy = distanceToScroll / speed * interval;
	dy = Math.round(distanceToScroll / speed * interval);
// console.log("interval: " + speed / Math.abs(distanceToScroll));
// console.log("interval max: " + interval);
// console.log("dy: " + dy);
// console.log("rounded dy: " + dy);
	// let startTime = new Date().getTime();
	
	let previousY = currentY + 1; // just different from currentY
	let scroll = setInterval( () => {
		distanceToScroll = y - currentY;
		if (Math.abs(distanceToScroll) <= Math.abs(dy / 2) || previousY == currentY){
			clearInterval(scroll);

			// let endTime = new Date().getTime();
			// console.log("y: " + currentY);
			// console.log("time: " + (endTime - startTime));
			// console.log("");
		}
		previousY = currentY;
		// console.log('prev: ',previousY);
		window.scrollBy(0, dy);
		currentY = windowScrollY();
		// console.log('curr: ',currentY);
	} ,interval);
}

function navigateByAnimation(speed) {
	foreach(document.querySelectorAll('.href'), (item) => {
		item.addEventListener('click', () => {
			let href = item.getAttribute('href');
			let destinationElementY = Math.floor(document.querySelector(href).getBoundingClientRect().y + windowScrollY());
			scrollToY(destinationElementY - 90, speed);
		});
	});
}

function setClassViewportHeight(){
	foreach(document.querySelectorAll('.viewport-height'), (item) => {
		item.style.height = window.innerHeight + "px";
	});
}
addEventListener('resize', setClassViewportHeight);

function toggleNav(){
	let btn = document.querySelector('.nav__button');
	let parent = btn.parentElement;
	let ul = parent.querySelector('ul');
	// console.log(ul);
	let ulItems = ul.querySelectorAll('li');
	let lastXsUlHeight = 0;
	btn.addEventListener('click', () => {
		let ulHeight = 0;
		foreach(ulItems, (item) => {
			ulHeight += item.offsetHeight;
			item.addEventListener('click', () => {
				if (window.innerWidth < 768){
					ul.style.height = 0;
					btn.classList.remove('nav__button--unwrapped');
				}
			});
		});
		if (ul.offsetHeight == 0) {
			ul.style.height = ulHeight;
			btn.classList.add('nav__button--unwrapped');
			lastXsUlHeight = ulHeight;
		}
		else {
			ul.style.height = 0;
			btn.classList.remove('nav__button--unwrapped');
			lastXsUlHeight = 0;
		}
		// console.log('lastXsUlHeight: ' + lastXsUlHeight);
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth < 768){
			ul.style.height = lastXsUlHeight;
		}
		else{
			ul.style.height = 'auto';
		}
	});
}

// function assignOrRemoveToggleNavFunction() {
// 	// let lt768px;
// 	// if (window.innerWidth < 768){
// 	// 	lt768px = true;
// 	// }
// 	window.addEventListener('resize', () => {
// 		if (window.innerWidth < 768){

// 		}
// 	});
// }

// **************************************************************************************************


window.onload = () => {

	chechIfMailIsSentAndDoMailAnimation();

	setTimeout(startJumpingLetters, 500);

	decreaseNavOnScroll();

	addAnimationClass('behind-to-front--left');
	addAnimationClass('behind-to-front--right');

	navigateByAnimation(300);

	setClassViewportHeight();

	disableClickedFormButtonAndSubmitForm('my-form');

	validateForm('my-form', false);

	toggleNav();
}

// **************************************************************************************************
// **************************************************************************************************

// ZROBIĆ FUNKCJE ZARZĄDZAJĄCE CSSAMI W JEDNEJ DUŻEJ FUNKCJI I UŻYĆ JEJ W "window.resize"

// **************************************************************************************************
// **************************************************************************************************




// **************************************************************************************************
// **************************************************************************************************

// ZROBIĆ FUNKCJE OBROTU CANVASA NA SMARTFONY (mousemove z clickiem)

// **************************************************************************************************
// **************************************************************************************************