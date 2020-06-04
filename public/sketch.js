var socket;
var numClients = 1;

var w_main, h_main;

var scan_x;

var points_main = [];
var points_other = [];

var clearButton;
var tempoSlider;

function setup() {
 	createCanvas(windowWidth, windowHeight);
  background(51);
	socket = io.connect();

	socket.on('numClients', clientCounter);
	socket.on('mouse', newDrawing);

	w_main = windowWidth * 0.6;
	h_main = windowHeight * 0.3;
	scan_x = windowWidth/2 - w_main/2;


	clearButton = createButton("clear");
	clearButton.position(windowWidth/2 + w_main * 0.45, windowHeight/2 + h_main*0.6);
	clearButton.mousePressed(clearPoints);

	tempoSlider = createSlider(0.5, 10, 2);
	tempoSlider.position(windowWidth/2 - w_main/2, windowHeight/2 + h_main*0.6);

	frameRate(30);
}

function clientCounter(n){
	numClients = n;
	console.log("client count is" + numClients);
}

function newDrawing(data){

	points_other.push(createVector(data.x, data.y));
}

function mouseDragged(){

	stroke(0,0,0);
	noFill();
	rect(windowWidth/2 - w_main/2, windowHeight/2 - h_main/2, w_main, h_main);

	if(mouseX > (windowWidth/2 - w_main/2) + 10 && mouseX < (windowWidth/2 + w_main/2) - 10  && mouseY > (windowHeight/2 - h_main/2) + 10 && mouseY < (windowHeight/2 + h_main/2) - 10){

		points_main.push(createVector(mouseX, mouseY));

		var data = {
			x: mouseX,
			y: mouseY
		}
		socket.emit('mouse', data);
	}
}

function draw() {

	background(51);

	noStroke();
	fill(255)
	text("Number of jammers : " + numClients, 20, 20 )

	text("Tempo:", windowWidth/2 - w_main/2, windowHeight/2 + h_main*0.6);

	stroke(0,0,0);
	noFill();
	rect(windowWidth/2 - w_main/2, windowHeight/2 - h_main/2, w_main, h_main);

	stroke(0,0,100);
	line(scan_x, windowHeight/2 - h_main/2, scan_x, windowHeight/2 + h_main/2);

	updateScanX();

	// Draw the points
	for(let i = 0; i < points_main.length; i++){
		fill(255);
		ellipse(points_main[i].x, points_main[i].y, 10, 10)
	}

	for(let i = 0; i < points_other.length; i++){
		fill(200,0,0);
		ellipse(points_other[i].x, points_other[i].y, 10, 10);
	}

}

function updateScanX(){
	scan_x += tempoSlider.value();

	if(scan_x > windowWidth/2 + w_main/2){
		scan_x = windowWidth/2 - w_main/2;
	}
}

function clearPoints(){
	points_main = [];
}
