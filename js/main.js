let colors = [
	"#D5FBFF",
	"#9FBCBF",
	"#647678",
	"#2F3738",
	"#59D8E5"
];

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
				// odpal canvasa insideoutLines i pokaż .click-to-scroll:
				setTimeout( () => {
					insideout();
					document.querySelector('.click-to-scroll').style.opacity = 1;
				}, 1010);
			}
			element.h += element.dh;
			element.style.bottom = element.h + 'px';
		});
		t++;
	},10);
}

function launchHeaderSubtitle(){
	// poniższe dwie linijki do poprawnego zrenderowania styli w firefoxie:
	document.querySelector('.perspective-text-shadow__shadow1').style.position = 'relative';
	setTimeout( () => {
		document.querySelector('.perspective-text-shadow__shadow1').style.position = 'absolute';
	}, 100);
	document.querySelector('.header__subtitle').style.opacity = 1;
}

function decreaseNavOnScroll(){
	let headerTitle = document.querySelector('.header__title');
	let headerTitleTop = window.innerHeight / 2;
	let scrolled;

	function toggleNavClasses(){
		let scrollTop = windowScrollY();
		let windowScrollTopToMoveTitleToNav = window.innerHeight / 3;
		if (scrollTop > windowScrollTopToMoveTitleToNav){
			if (!scrolled){
				scrolled = true;
				// console.log('scrolled: ' + scrolled);
				foreach(document.querySelectorAll('.nav--default'), (item) => {
					item.classList.add('nav--scrolled');
				});
				// foreach(document.querySelectorAll('.nav'), (item) => {
				// 	item.classList.add('nav--shadow');
				// });
				document.querySelector('.header__title').classList.add('header__title--scrolled');
				document.querySelector('.header__title').classList.remove('centered');
				// headerTitle.style.top = 0 + 'px';
			}
		}
		else{
			if (scrolled){
				scrolled = false;
				// console.log('scrolled: ' + scrolled);
				foreach(document.querySelectorAll('.nav--default'), (item) => {
					item.classList.remove('nav--scrolled');
				});
				// foreach(document.querySelectorAll('.nav'), (item) => {
				// 	item.classList.remove('nav--shadow');
				// });
				document.querySelector('.header__title').classList.remove('header__title--scrolled');
				document.querySelector('.header__title').classList.add('centered');
			}
			// headerTitle.style.top = headerTitleTop - scrollTop + 'px';
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
		let elementsArray = document.getElementsByClassName(className);
		foreach(elementsArray, (item) => {
			if (item.getBoundingClientRect().y < window.innerHeight * 0.7 &&
			item.getBoundingClientRect().y > 50){
				if (!item.above && !item.working) {
					item.working = true;
					item.above = true;
					// console.log(item.working);
					item.classList.add(className + '-animation');
					item.classList.remove(className + '-reverse-animation');
					setTimeout( () => {item.working = false;}, 1010);
				}
			}
			else{
				if (item.above && !item.working) {
					item.working = true;
					item.above = false;
					// console.log(item.working);
					// console.log(item, item.above);
					item.classList.add(className + '-reverse-animation');
					item.classList.remove(className + '-animation');
					setTimeout( () => {item.working = false;}, 1010);
				}
			}
		});
	}
	this.runFunction(className);
	document.addEventListener('scroll', () => {this.runFunction(className)});
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

	function wrapUl() {
		ul.style.height = 0;
		btn.classList.remove('nav__button--unwrapped');
		lastXsUlHeight = 0;
	}

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
			wrapUl();
		}
		// console.log('lastXsUlHeight: ' + lastXsUlHeight);
	});

	document.addEventListener('click', (event) => {
		if (event.target != btn && window.innerWidth < 768) {
			console.log('ul wrapped');
			wrapUl();
		}
	});

	let lastWindowWidth = window.innerWidth;
	window.addEventListener('resize', () => {
		if (lastWindowWidth != window.innerWidth) {
			if (window.innerWidth < 768){
				ul.style.height = lastXsUlHeight;
			}
			else{
				ul.style.height = 'auto';
			}
			lastWindowWidth = window.innerWidth;
		}
	});
}

function CVLanguagesPlacementAndShowHide() {
	var cvBtn = document.querySelector('#cv-img');
	var cvLangBox = document.querySelector('#cv-lang-box');
	var cvLang = document.querySelector('#cv-languages');
	var cvLiAll = cvLang.querySelectorAll('li');

	function CVLanguagesPlacement() {
		cvLangBox.style.bottom = window.innerHeight - cvBtn.getBoundingClientRect().bottom;
		cvLangBox.style.left = cvBtn.clientWidth;
		cvLangBox.style.height = cvBtn.clientHeight;
		cvLiAll.width = 0;
		foreach(cvLiAll, (item) => {
			item.style.height = cvBtn.clientHeight;
			cvLiAll.width += item.clientWidth;
		});
		cvLang.style.width = cvLiAll.width;
	}

	function CVLanguagesShowHide() {
		if (cvLangBox.style.width == 0 || cvLangBox.style.width == '0px'){
			cvLangBox.style.width = cvLiAll.width;
		}
		else {
			cvLangBox.style.width = 0;
		}
	}

	cvBtn.addEventListener('click', (event) => {
		CVLanguagesShowHide();
	});

	document.addEventListener('click', (event) => {
		if (!(event.target == cvBtn || event.target == cvBtn.children[0])) {
			cvLangBox.style.width = 0;
		}
	});
	
	CVLanguagesPlacement();

	window.addEventListener('resize', () => {
		CVLanguagesPlacement();
	});
}

function allowScrollingWhenXS() {
	let body = document.querySelector('body');
	let allowScrollBtn = document.querySelector('.click-to-scroll');
	
	function disableScrollIfNotScrolled() {
		if (windowScrollY() == 0) {
			body.classList.add('body-disable-scroll-on-xs');
		}
	}

	function enableScroll() {
		body.classList.remove('body-disable-scroll-on-xs');
	}

	disableScrollIfNotScrolled();

	allowScrollBtn.addEventListener('click', () => {
		enableScroll();
		scrollToY(window.innerHeight - 50, 300);
	});

	foreach(document.querySelectorAll('.href'), (item) => {
		item.addEventListener('click', () => {
			enableScroll();
		});
	});

	window.addEventListener('scroll', () => {
		disableScrollIfNotScrolled();
	});
}

function increaseHeadertHeightWhenXS() {
	let header = document.querySelector('.header')
	let increaseOfHeight = 75; 

	function setHeight() {
		if (window.innerWidth < 768) {
			header.style.height = Number(window.innerHeight) + Number(increaseOfHeight);
		}
		else {
			header.style.height = window.innerHeight;
		}
	}
	setHeight();
	window.addEventListener('resize', setHeight);
}


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

	CVLanguagesPlacementAndShowHide();

	allowScrollingWhenXS();

	increaseHeadertHeightWhenXS();
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