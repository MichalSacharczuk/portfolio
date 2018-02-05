window.addEventListener('load', () => {

	var myCanvas = document.getElementById('background-balls');

	function setCanvasWidthAndHeight() {
		myCanvas.width = myCanvas.parentElement.clientWidth;
		myCanvas.height = windowScrollY() + document.querySelector('#section-contact').getBoundingClientRect().y + 10;
	}

	setCanvasWidthAndHeight();

	var c = myCanvas.getContext('2d');

	var t = 0;
	var x, y;

	let colors2 = [
		'#D5FBFF',
		'#cbe7ea',
		'#647678',
		'#59D8E5',
		'#2F3738'
	];

	function Line(x, y, lengthRatio, lineWidth){
		this.x = x;
		this.y = y;
		this.color = colors2[getRandomInt(0, colors2.length)];

		this.draw = function(){
			this.xLength = myCanvas.width * lengthRatio;
			c.beginPath();
			c.moveTo(this.x,this.y);
			c.lineTo(this.x + this.xLength, this.y + this.xLength * .5);
			c.lineWidth = lineWidth;
			c.strokeStyle = this.color;
			c.stroke();
		}
	}

	var lines = [];
	for (var i = 0; i < 100; i++) {
		var x = myCanvas.width * (- 0.2 + 1.1 * Math.random());
		var y = myCanvas.height * (0 + 1 * Math.random());
		var lengthRatio = .1 + .6 * Math.random();
		var lineWidth = 1 + 2 * Math.random();
		lines.push(new Line(x, y, lengthRatio, lineWidth));
	}

	function drawLines() {
		c.clearRect(0,0,myCanvas.width,myCanvas.height);
		for (var i = lines.length - 1; i >= 0; i--) {
			lines[i].draw();
		}
	}

	drawLines();
	// console.log(lines);

	window.addEventListener('resize', () => {
		setCanvasWidthAndHeight();
		drawLines();
	});
});