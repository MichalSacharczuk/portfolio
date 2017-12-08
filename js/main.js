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
		for (i in letters){
			if (letters[i] == " "){
				letters[i] = '&nbsp;';
				element.innerHTML += '<div class="bouncing-letter bouncing-letter--space">' + letters[i] + '</div>';
			} 
			else
				element.innerHTML += '<div class="bouncing-letter">' + letters[i] + '</div>';
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

				// restoreTextContextWithoutSeparatedDivs();
				launchHeaderSubtitle();
			}
			element.h += element.dh;
			element.style.bottom = element.h + 'px';
		});
		t++;
	},10);

	// function restoreTextContextWithoutSeparatedDivs(){
	// 	foreach(document.getElementsByClassName('bouncing-letters'), (element, i) => {
	// 		element.innerHTML = textContents[i];
	// 	});
	// 	textContents = [];
	// }
}

function launchHeaderSubtitle(){
	document.querySelector('.opacity0').style.opacity = 1;
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
		}
		else{
			document.querySelector('nav.nav--default').classList.remove('nav--scrolled');
			document.querySelector('.header__title').classList.remove('header__title--scrolled');
			document.querySelector('.header__title').classList.add('centered');
			headerTitle.style.top = headerTitleTop - scrollTop + 'px';
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

function scrollToElement(y, speed){
	let currentY = document.body.scrollTop || document.documentElement.scrollTop;
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
			console.log("");
		}
		previousY = currentY;
		// console.log('prev: ',previousY);
		window.scrollBy(0, dy);
		currentY = document.body.scrollTop || document.documentElement.scrollTop;
		// console.log('curr: ',currentY);
	} ,interval);
}

function navigateByAnimation(speed) {
	foreach(document.querySelectorAll('.nav li'), (item) => {
		item.addEventListener('click', () => {
			let href = item.getAttribute('href');
			let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			let destinationElementY = Math.floor(document.querySelector(href).getBoundingClientRect().y + scrollTop);
			scrollToElement(destinationElementY - 90, speed);
		});
	});
}

// **************************************************************************************************


window.onload = () => {

	setTimeout(startJumpingLetters, 500);

	decreaseNavOnScroll();

	addAnimationClass('behind-to-front--left');
	addAnimationClass('behind-to-front--right');

	navigateByAnimation(300);

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