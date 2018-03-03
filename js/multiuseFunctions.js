'use strict';

function getRandomInt(x, y) {
	return Math.floor(Math.random() * (y - x)) + x;
}

function sign(x) {
	if (x > 0) return 1;else if (x < 0) return -1;else return 0;
}

function windowScrollY() {
	return document.body.scrollTop || document.documentElement.scrollTop;
}

function foreach(array, callback) {
	for (var i = 0; i < array.length; i++) {
		callback.call(array, array[i], i);
	}
}

function scrollToY(y, speed) {
	var currentY = windowScrollY();
	var distanceToScroll = y - currentY;
	var interval = Math.max(10, Math.round(speed / Math.abs(distanceToScroll)));
	var dy = distanceToScroll / speed * interval;
	dy = Math.round(distanceToScroll / speed * interval);
	var previousY = currentY + 1; // just different from currentY
	var scroll = setInterval(function () {
		distanceToScroll = y - currentY;
		if (Math.abs(distanceToScroll) <= Math.abs(dy / 2) || previousY == currentY) {
			clearInterval(scroll);
		}
		previousY = currentY;
		window.scrollBy(0, dy);
		currentY = windowScrollY();
	}, interval);
}

function navigateByAnimation(speed) {
	foreach(document.querySelectorAll('.data-myref'), function (item) {
		item.addEventListener('click', function () {
			var href = item.getAttribute('data-myref');
			var destinationElementY = Math.floor(document.querySelector(href).getBoundingClientRect().y + windowScrollY());
			scrollToY(destinationElementY - 150, speed);
		});
	});
}

function detectTouchDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints;
}