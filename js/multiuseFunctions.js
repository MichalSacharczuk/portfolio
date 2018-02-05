function getRandomInt(x, y){
	return Math.floor(Math.random() * (y - x)) + x;
}

function sign(x){
	if (x > 0) return 1;
	else if (x < 0) return -1;
	else return 0;
}
	
function windowScrollY(){
	return document.body.scrollTop || document.documentElement.scrollTop;
}

function foreach(array, callback){
	for (let i = 0; i < array.length; i++) {
		callback.call(array, array[i], i);
	}
}

function scrollToY(y, speed){
	let currentY = windowScrollY();
	let distanceToScroll = y - currentY;
	let interval = Math.max(10, Math.round(speed / Math.abs(distanceToScroll)));
	let dy = distanceToScroll / speed * interval;
	dy = Math.round(distanceToScroll / speed * interval);
	let previousY = currentY + 1; // just different from currentY
	let scroll = setInterval( () => {
		distanceToScroll = y - currentY;
		if (Math.abs(distanceToScroll) <= Math.abs(dy / 2) || previousY == currentY){
			clearInterval(scroll);
		}
		previousY = currentY;
		window.scrollBy(0, dy);
		currentY = windowScrollY();
	} ,interval);
}

function navigateByAnimation(speed) {
	foreach(document.querySelectorAll('.href'), (item) => {
		item.addEventListener('click', () => {
			let href = item.getAttribute('href');
			let destinationElementY = Math.floor(document.querySelector(href).getBoundingClientRect().y + windowScrollY());
			scrollToY(destinationElementY - 150, speed);
		});
	});
}

