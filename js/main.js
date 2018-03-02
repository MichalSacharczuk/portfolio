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

	foreach(document.getElementsByClassName('bouncing-letters'), (element) => {
		element.style.opacity = 1;
		let letters = element.textContent.split("");
		element.innerHTML = "";
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
	});

	let t = 0;
	const a = -0.2;
	const damping = .4;
	const scalingH = 150;
	let makeLettersBounce = setInterval(function(){
		foreach(document.getElementsByClassName('bouncing-letter'), (element) => {
			if (element.h + element.dh > 0){
				element.dh += a;
			}
			else if (Math.abs(element.dh) > 1e-8){
				element.dh = -element.dh * damping;
			}
			else{
				clearInterval(makeLettersBounce);
				launchHeaderSubtitle();
				// odpal canvasa insideoutLines i pokaż .click-to-scroll:
				setTimeout( () => {
					insideout();
					document.querySelector('.click-to-scroll').classList.add('visible-xs-only');
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
	document.querySelector('.header__subtitle').style.visibility = 'visible';
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
				foreach(document.querySelectorAll('.nav--default'), (item) => {
					item.classList.add('nav--scrolled');
				});
				document.querySelector('.header__title').classList.add('header__title--scrolled');
				document.querySelector('.header__title').classList.remove('centered');
			}
		}
		else{
			if (scrolled){
				scrolled = false;
				foreach(document.querySelectorAll('.nav--default'), (item) => {
					item.classList.remove('nav--scrolled');
				});
				document.querySelector('.header__title').classList.remove('header__title--scrolled');
				document.querySelector('.header__title').classList.add('centered');
			}
		}
	}

	toggleNavClasses();

	document.addEventListener('scroll', () => {
		toggleNavClasses();
	});

	window.addEventListener('resize', () => {
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
					item.classList.add(className + '-animation');
					item.classList.remove(className + '-reverse-animation');
					setTimeout( () => {item.working = false;}, 1010);
				}
			}
			else if (item.getBoundingClientRect().y < -window.innerHeight ||
			item.getBoundingClientRect().y > 2 * window.innerHeight) {
				if (item.above && !item.working) {
					item.working = true;
					item.above = false;
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
	function setViewportHeight(){
		foreach(document.querySelectorAll('.viewport-height'), (item) => {
			item.style.height = window.innerHeight + "px";
		});
	}
	setViewportHeight();

	window.addEventListener('resize', () => {
		if (!detectTouchDevice()){
			setViewportHeight();
		}
	});
}

function toggleNav(){
	let btn = document.querySelector('.nav__button');
	let ul = btn.parentElement.querySelector('.list');
	let ulItems = ul.querySelectorAll('.list__item');
	let lastXsUlHeight = 0;
	let ulHeight = 0;
	let firstClick = true;

	function wrapUl() {
		ul.style.height = 0;
		btn.classList.remove('nav__button--unwrapped');
		lastXsUlHeight = 0;
		// if (window.innerWidth < 768){
			foreach(ulItems, (item) => {
				item.style.height = 0;
				item.lastHeight = 0;
			});
		// }
	}

	function setInitialHeightsAndEvents() {
		foreach(ulItems, (item) => {
			item.style.height = 'auto';
			item.fullHeight = item.offsetHeight;
			item.lastHeight = 0;
			if (window.innerWidth < 768){
				item.style.height = 0;
			}
			ulHeight += item.fullHeight;
			item.addEventListener('click', () => {
				if (window.innerWidth < 768){
					wrapUl();
				}
			});
		});
	}

	btn.addEventListener('click', () => {
		if (firstClick) {
			setInitialHeightsAndEvents();
			firstClick = false;
		}
		
		if (ul.offsetHeight == 0) {
			ul.style.height = ulHeight + 'px';
			btn.classList.add('nav__button--unwrapped');
			lastXsUlHeight = ulHeight;
			foreach(ulItems, (item) => {
				item.style.height = item.fullHeight + 'px';
				item.lastHeight = item.fullHeight;
			});
		}
		else {
			wrapUl();
		}
	});

	document.addEventListener('click', (event) => {
		if (event.target != btn && window.innerWidth < 768) {
			wrapUl();
		}
	});

	let lastWindowWidth = window.innerWidth;
	window.addEventListener('resize', () => {
		if (lastWindowWidth != window.innerWidth) {
			if (window.innerWidth < 768){
				ul.style.height = lastXsUlHeight + 'px';
				foreach(ulItems, (item) => {
					item.style.height = item.lastHeight + 'px';
				});
			}
			else{
				ul.style.height = 'auto';
				foreach(ulItems, (item) => {
					item.style.height = 'auto';
				});
			}
			lastWindowWidth = window.innerWidth;
		}
	});
}

function CVLanguagesPlacementAndShowHide() {
	let cvBtn = document.querySelector('#cv-img');
	let cvLangBox = document.querySelector('#cv-lang-box');
	let cvLang = document.querySelector('#cv-languages');
	let cvLiAll = cvLang.querySelectorAll('.list__item');
	let cvImg = document.querySelector('#cv-img>img');
	let firstClick = true;

	function CVLanguagesPlacement() {
		cvLangBox.style.bottom = (window.innerHeight - cvBtn.getBoundingClientRect().bottom) + 'px';
		cvLangBox.style.left = cvBtn.clientWidth + 'px';
		cvLangBox.style.height = cvBtn.clientHeight + 'px';
		cvLiAll.width = 0;
		foreach(cvLiAll, (item) => {
			item.style.width = 'auto';
			item.style.height = cvBtn.clientHeight + 'px';
			cvLiAll.width += item.clientWidth;
			item.fullWidth = item.clientWidth;
			item.style.width = 0;
		});
	}

	function wrapUl() {
		cvLangBox.style.width = 0;
		foreach(cvLiAll, (item) => {
			item.style.width = 0;
		});
		cvImg.classList.remove('img-rotate360');
	}

	function CVLanguagesShowHide() {
		if (cvLangBox.style.width == 0 || cvLangBox.style.width == '0px'){
			cvLangBox.style.width = cvLiAll.width + 'px';
			foreach(cvLiAll, (item) => {
				item.style.width = item.fullWidth + 'px';
			});
			cvImg.classList.add('img-rotate360');
		}
		else {
			wrapUl();
		}
	}

	cvBtn.addEventListener('click', (event) => {
		if (firstClick) {
			CVLanguagesPlacement();
			firstClick = false;
		}
		CVLanguagesShowHide();
	});

	document.addEventListener('click', (event) => {
		if (!(event.target == cvBtn || event.target == cvBtn.children[0])) {
			wrapUl();
		}
	});
	
	window.addEventListener('resize', () => {
		if(!detectTouchDevice()){
			CVLanguagesPlacement();
		}
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

	foreach(document.querySelectorAll('.data-myref'), (item) => {
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
		if (detectTouchDevice()) {
			header.style.height = Number(window.innerHeight) + Number(increaseOfHeight) + 'px';
		}
		else {
			header.style.height = window.innerHeight + 'px';
		}
	}
	setHeight();
}


// **************************************************************************************************


window.onload = () => {

	chechIfMailIsSentAndDoMailAnimation();

	decreaseNavOnScroll();

	setClassViewportHeight();

	CVLanguagesPlacementAndShowHide();

	toggleNav();

	allowScrollingWhenXS();

	increaseHeadertHeightWhenXS();

	addAnimationClass('behind-to-front--left');
	addAnimationClass('behind-to-front--right');

	setTimeout(startJumpingLetters, 500);

	navigateByAnimation(300);
	
	disableClickedFormButtonAndSubmitForm('my-form');
	
	validateForm('my-form', false);
}