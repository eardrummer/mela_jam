var socket;
var numClients = 1;

function setup() {
 	createCanvas(600, 400);
  background(51);
	socket = io.connect();

	socket.on('numClients', clientCounter);
	socket.on('mouse', newDrawing);
}

function clientCounter(n){
	numClients = n;
	console.log("client count is" + numClients);
}

function newDrawing(data){
  fill(200,0,0);
	ellipse(data.x, data.y, 10, 10);
}

function mouseDragged(){

	fill(255);
	ellipse(mouseX, mouseY, 10, 10)

	var data = {
		x: mouseX,
		y: mouseY
	}
	socket.emit('mouse', data);
}

function draw() {

	noStroke();
	fill(255)
	text("Number of jammers : " + numClients, 20, 20 )

}
