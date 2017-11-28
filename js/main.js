function startJumpingLetters() {
	// jumping letters:
	let bouncingLettersElements = document.getElementsByClassName('bouncing-letters');
	for (let blId = 0; blId < bouncingLettersElements.length; blId++) {
		let element = bouncingLettersElements[blId];
		let letters = element.innerHTML.split("");
		element.innerHTML = "";
		// console.log(letters);
		for (var i = 0; i < letters.length; i++) {
			element.innerHTML += '<div class="bouncing-letter">' + letters[i] + '</div>';
		}
	}

	let bouncingLetters = document.getElementsByClassName('bouncing-letter');
	for (let blId = 0; blId < bouncingLetters.length; blId++) {
		let element = bouncingLetters[blId];
		element.style.bottom = Math.random() * 100 + window.innerHeight / 2 + 'px';
		element.dh = 0;
		element.h = Number(element.style.bottom.split('px')[0]);
	}
		
	let t = 0;
	const a = -0.2;
	const damping = .4;
	let makeLettersBounce = setInterval(function(){
		for (let blId = 0; blId < bouncingLetters.length; blId++) {
			let element = bouncingLetters[blId];
			// console.log(element.dh);
			if (element.h + element.dh > 0){
				element.dh += a;
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


window.onload = () => {

	startJumpingLetters();




}