function startJumpingLetters() {
	// jumping letters:
	let bouncingLettersElements = document.getElementsByClassName('bouncing-letters');
	for (let blId = 0; blId < bouncingLettersElements.length; blId++) {
		bouncingLettersElements[blId].style.opacity = 1;
		let element = bouncingLettersElements[blId];
		let letters = element.innerHTML.split("");
		element.innerHTML = "";
		// console.log(letters);
		for (var i = 0; i < letters.length; i++) {
			if (letters[i] == " "){
				letters[i] = '_';
				element.innerHTML += '<div class="bouncing-letter" style="opacity: 0;">' + letters[i] + '</div>';
			} 
			else 
				element.innerHTML += '<div class="bouncing-letter">' + letters[i] + '</div>';
		}
	}

	// perspective shadow effect:
	headerTitleBouncingLetters = document.querySelectorAll('.header__title .bouncing-letter');
	decreaseNavOnScroll();
	//

	// const startHfactor = 2;
	let bouncingLetters = document.getElementsByClassName('bouncing-letter');
	for (let blId = 0; blId < bouncingLetters.length; blId++) {
		let element = bouncingLetters[blId];
		element.style.bottom = Math.random() * 100 + window.innerHeight / 2 + 'px';
		element.dh = 0;
		element.h = Number(element.style.bottom.split('px')[0]);
		// element.style.transform = 'scaleY(' + startHfactor + ')';
	}
		
	let t = 0;
	const a = -0.2;
	const damping = .4;
	const scalingH = 150;
	let makeLettersBounce = setInterval(function(){
		for (let blId = 0; blId < bouncingLetters.length; blId++) {
			let element = bouncingLetters[blId];
			// console.log(element.dh);
			if (element.h + element.dh > 0){
				element.dh += a;
				// if (element.h + element.dh > 1 && element.h + element.dh < scalingH){
				// 	element.style.transform = 'scaleY(' + (startHfactor - (scalingH - (element.h + element.dh)) / scalingH * (startHfactor - 1)) + ')';
				// }
			}
			else if (Math.abs(element.dh) > 1e-30){
				element.dh = -element.dh * damping;
			}
			else{
				clearInterval(makeLettersBounce);
				// console.log("END");
			}
			element.h += element.dh;
			element.style.bottom = element.h + 'px';
		}
		t++;
	},10);
}

function attachLiClickToAClick(){
	var navLi = document.querySelectorAll('nav.nav li')
	for (var i = navLi.length - 1; i >= 0; i--) {
		navLi[i].onclick = function() {
			this.children[0].click();
		}
	}
}

function decreaseNavOnScroll(){
	let headerTitle = document.querySelector('.header__title');
	let headerTitleTop = window.innerHeight / 2;

	function toggleNavClasses(){
		let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		let windowScrollTopToMoveTitleToNav = window.innerHeight / 3;
		if (scrollTop > windowScrollTopToMoveTitleToNav){
			document.querySelector('nav.nav--default').classList.add('nav--scrolled');
			document.querySelector('.header__title').classList.add('header__title--scrolled');
			document.querySelector('.header__title').classList.remove('centered');
			headerTitle.style.top = 0 + 'px';

			// perspective shadow effect:
			if (headerTitleBouncingLetters)
				removePerspectiveText(headerTitleBouncingLetters);
		}
		else{
			document.querySelector('nav.nav--default').classList.remove('nav--scrolled');
			document.querySelector('.header__title').classList.remove('header__title--scrolled');
			document.querySelector('.header__title').classList.add('centered');
			headerTitle.style.top = headerTitleTop - scrollTop + 'px';
			
			// perspective shadow effect:
			if (headerTitleBouncingLetters)
				makePerspectiveText(headerTitleBouncingLetters, 8, '#0f1f21'); //#647678 //#0f1f21 //#0e1213
		}
	}

	toggleNavClasses();

	document.addEventListener('scroll', () => {
		toggleNavClasses();
		// console.log(document.body.scrollTop || document.documentElement.scrollTop);
		// console.log(document.querySelector('body').getBoundingClientRect().y);
		// console.log("");
	});

	addEventListener('resize', () => {
		headerTitleTop = window.innerHeight / 2;
		toggleNavClasses();
	});
}

function makePerspectiveText(lettersArray,maxShadowFactor,shadowColor){
	let length = lettersArray.length;
	let middleOfLength = (length - 1) / 2;
	let shadowFactorMultiplier = maxShadowFactor / middleOfLength;
	for (var i = 0; i < lettersArray.length; i++) {
		let letter = lettersArray[i];
		let currentShadowFactor = Math.floor((middleOfLength - i) * shadowFactorMultiplier);
		let textShadow = "";
		let lighter = Math.min(0, currentShadowFactor);
		let greater = Math.max(0, currentShadowFactor);
		for (let n = lighter; n <= greater; n++) {
			textShadow += n + "px 0 0 " + shadowColor;
			if (n < greater)
				textShadow += ", ";
		}
		letter.style.textShadow = textShadow;
	}
}
function removePerspectiveText(lettersArray){
	for (var i = 0; i < lettersArray.length; i++) {
		lettersArray[i].style.textShadow = 'none';
	}
}


// **************************************************************************************************


// perspective shadow effect:
let headerTitleBouncingLetters;

window.onload = () => {

	setTimeout(startJumpingLetters, 500);

	attachLiClickToAClick();

	decreaseNavOnScroll();

}

// **************************************************************************************************
// **************************************************************************************************

// ZROBIĆ FUNKCJE ZARZĄDZAJĄCE CSSAMI W JEDNEJ DUŻEJ FUNKCJI I UŻYĆ JEJ W "window.resize"

// **************************************************************************************************
// **************************************************************************************************
