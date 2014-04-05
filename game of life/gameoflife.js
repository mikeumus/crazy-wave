var canv = document.getElementById('canvas'),
c = canv.getContext('2d');
var context = c
var rowSize = 200
var columnSize = 200
var canvasWidth = $("canvas").width()
var canvasHeight = $("canvas").height()
canv.height = canvasHeight
canv.width  = canvasWidth
var radius = canvasWidth/(2*columnSize)

var PAUSE = 1;

console.log(canvasWidth)
console.log(canvasHeight)


var pieces = new Array()

for (var y = 0; y < rowSize; y++) {
	pieces.push(new Array());
	for(var x = 0; x < columnSize; x++){
		pieces[y].push(0);
	}
};

var pieces2 = new Array()

for (var y = 0; y < rowSize; y++) {
	pieces2.push(new Array());
		for(var x = 0; x < columnSize; x++){
		pieces2[y].push(0);
		}
};
	

pieces[101][100] = 1;
pieces[101][101] = 1;
pieces[99][101] = 1;
pieces[100][103] = 1;
pieces[101][104] = 1;
pieces[101][105] = 1;
pieces[101][106] = 1;

drawCircle = function(x, y){
	  context.beginPath();
      context.arc(x,y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 0;
      context.stroke();
}

updatePieces = function(){
	if(PAUSE){
		return 0
	}
	for (var y = 0; y < rowSize; y++) {
		for(var x = 0; x < columnSize; x++){
		pieces2[y][x] = 0;
		}
	
}

drawPieces = function(){
	c.clearRect(0, 0, canvasWidth, canvasHeight);
	for(var y = 0; y<rowSize; y++){
		for(var x = 0; x<rowSize; x++){
			if(pieces[y][x]==1){
				drawCircle(x*radius*2+radius,y*radius*2+radius)
			}
	}
}
}

run = function(){
	drawPieces()
	updatePieces()
}

main = function(){
	setInterval(run, 60);
}


canvas.onmousemove = function(e){
	var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
    pieces[Math.floor(mouseY/(radius*2))][Math.floor(mouseX/(radius*2))] = pieces[Math.floor(mouseY/(radius*2))][Math.floor(mouseX/(radius*2))]*-1+1 
}

window.onload = main