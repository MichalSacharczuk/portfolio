function insideout() {
	var insideoutLines = document.getElementById('insideoutLines');
	insideoutLines.width = insideoutLines.parentElement.clientWidth;
	insideoutLines.height = insideoutLines.parentElement.clientHeight;
	// insideoutLines.style.background = "linear-gradient(to bottom, #020210, #114)";
	// insideoutLines.style.background = "linear-gradient(to bottom, #000, #050515)";
	var canvasWidth = insideoutLines.width;
	var canvasHeight = insideoutLines.height;
	var x0 = canvasWidth / 2;
	var y0 = canvasHeight / 2;

	var c = insideoutLines.getContext('2d');

	var t = 0;

	var mouse = {angle1: 0, angle2: 0, angleChange: 0, spinFactor: 0};
	var mouseX = [];
	var mouseY = [];
	var totalSpinFactor = 0;
	var currentSpin = 0;

	function sign(x){
		if (x > 0) return 1;
		else if (x < 0) return -1;
		else return 0;
	}

	function getRandomInt(x, y){
		return Math.floor(Math.random() * (y - x)) + x;
	}

	function getAngleOfXYFromTheCenter(x, y, x0, y0){
		let dx = x - x0;
		let dy = y - y0;
		if (dx > 0)
			return Math.atan(dy / dx);
		else
			return Math.PI + Math.atan(dy / dx);
	}

	addEventListener('mousemove', function(event) {
		mouseX.push(event.clientX);
		mouseY.push(event.clientY);
		if (mouseX.length > 1){
			mouse.angle1 = getAngleOfXYFromTheCenter(mouseX[0], mouseY[0], x0, y0);
			mouse.angle2 = getAngleOfXYFromTheCenter(mouseX[1], mouseY[1], x0, y0);

			mouse.angleChange = mouse.angle2 - mouse.angle1;
			mouse.spinFactor = Math.sin(mouse.angleChange) ;
			if (Math.abs(mouse.spinFactor) > 0.01) 
				mouse.spinFactor = 0.01 * sign(mouse.spinFactor);

			mouseX = [];
			mouseY = [];

			// totalSpinFactor += mouse.spinFactor * 0.01;
			totalSpinFactor += mouse.spinFactor * 0.005;
		}
	});

	function logSpinData(){
		// console.log("angle 1: " + mouse.angle1);
		// console.log("angle 2: " + mouse.angle2);
		// console.log("angle change: " + mouse.angleChange);
		console.log("spin: " + mouse.spinFactor);
		// console.log("");
	}


	function Circle(x, y, radius){
		this.x = x;
		this.y = y;
		this.t = 0;
		
		this.radius = radius;
		this.startAngle = getAngleOfXYFromTheCenter(x, y, x0, y0);

		this.rndx = Math.random();
		this.rndy = Math.random();
		// var baseRgbNumber = 100;
		// var rgbRangeNumber = 155;
		// var rColor = baseRgbNumber+Math.floor(Math.random()*rgbRangeNumber);
		// var gColor = baseRgbNumber+Math.floor(Math.random()*rgbRangeNumber);
		// var bColor = baseRgbNumber+Math.floor(Math.random()*rgbRangeNumber);
		// this.ballColor = 'rgb(' + rColor + ',' + gColor + ',' + bColor + ')';

		let colors = [
			'#D5FBFF',
			'#9FBCBF',
			'#647678',
			// '#2F3738'
		];
		this.ballColor = colors[getRandomInt(0, 3)];

		// var dx = .05 * Math.cos(this.startAngle);
		// var dy = .05 * Math.sin(this.startAngle);

		var r = Math.pow((Math.pow((x - x0),2) + Math.pow((y - y0),2)), .5);
		var dx = .05 * x / r;
		var dy = .05 * y / r;
		this.dx = dx;
		this.dy = dy;
		this.dxdyPower = 1;
		// this.rndSgn = Math.floor(Math.random() * 2) * 2 - 1;
		
		this.lastXYwasSet = false;
		this.spinFactor = 0;

		// var noDrawRadius = Math.pow(canvasWidth * canvasHeight * 0.0001, 0.5)
		this.draw = function(){
			// if(Math.pow((this.x - x0),2) + Math.pow((this.y - y0),2) > noDrawRadius * noDrawRadius){
				c.beginPath();
				c.moveTo(this.lastX, this.lastY);
				c.lineTo(this.x,this.y);
				c.lineWidth = this.radius * 2;
				c.fillStyle = this.ballColor;
				c.strokeStyle = this.ballColor;
				c.stroke();

				// c.arc(this.x,this.y,this.radius,0,2*Math.PI);
				// c.fillStyle = this.ballColor;
				// c.fill();
			// }
		}

		this.setLastXYifNotSet = function(){
			if (!this.lastXYwasSet) {
				this.lastX = this.x;
				this.lastY = this.y;
				this.lastXYwasSet = true;
			}
		}

		this.update = function(){
			this.setLastXYifNotSet();

			if (this.x > canvasWidth - radius || this.x < radius || this.y > canvasHeight - radius || this.y < radius){
				this.lastX = x;
				this.lastY = y;
				this.x = x;
				this.y = y;
				this.t = 0;
				this.radius = radius;
				this.dx = dx;
				this.dy = dy;
				this.dxdyPower = 1;
			}
			this.x += this.dx;
			this.y += this.dy;
			this.t += 1;
			this.dx *= 1.03;
			this.dy *= 1.03;
			this.dxdyPower *= 1.03;
			// this.radius *= 1.015;
			this.radius *= 1.01;
		}

		// this.changeColor = function(t){
		// 	this.ballColor = 'rgb(' + (Math.floor(rColor - 100 * Math.sin(t * 0.05 + this.rndx * 10))) 
		// 				  + ',' + (Math.floor(gColor - 100 * Math.sin(t * 0.05 + this.rndy * 10))) 
		// 				  + ',' + (Math.floor(bColor - 100 * Math.sin(t * 0.05))) + ')';
		// }

		this.rotateAroundTheCenter = function(t){
			this.setLastXYifNotSet();

			this.spinFactor = currentSpin;

			var x0y0distance = Math.pow((Math.pow(this.x - x0, 2) + Math.pow(this.y - y0, 2)),0.5);

			// if (x0y0distance > noDrawRadius * 0.5){
				dx = .05 * (this.x - x0) / x0y0distance * this.dxdyPower;
				dy = .05 * (this.y - y0) / x0y0distance * this.dxdyPower;
				this.dx = dx;
				this.dy = dy;

				this.x = x0y0distance * Math.cos(this.t * this.spinFactor + this.startAngle) + x0;
				this.y = x0y0distance * Math.sin(this.t * this.spinFactor + this.startAngle) + y0;
			// }
		}
	}

	var circles = [];

	function animation() {
		requestAnimationFrame(animation);
		
		if (t < 500){
			var radius = .2;
			var x = Math.random() * x0 * 2;
			var y = Math.random() * y0 * 2;
			circles.push(new Circle(x, y, radius));
		}

		// c.fillStyle = 'rgba(0,0,15,.3)';
		// c.fillStyle = 'rgba(89,216,229,.3)';
		c.fillStyle = 'rgba(47,55,56,.3)';
		c.fillRect(0,0,canvasWidth,canvasHeight);

		currentSpin += (totalSpinFactor - currentSpin) * 0.05;

		for (var i = circles.length - 1; i >= 0; i--) {
			if (t < 2) console.log(Math.floor(circles[i].x) + " " + Math.floor(circles[i].y));
			circles[i].rotateAroundTheCenter(t);
			circles[i].update();
			// circles[i].changeColor(t);
			circles[i].draw();
			circles[i].lastXYwasSet = false;
		}
		
		t++;

		// if (t % 10 == 0){
		// 	console.log("total spin: " + totalSpinFactor);
		// 	console.log("current spin: " + currentSpin);
		// 	console.log(" ");
		// }

		if (t == Infinity) t = 0;
	}
	animation();
}


//full screen canvas:
insideoutLines.width = window.innerWidth;
insideoutLines.height = window.innerHeight;

insideout();
