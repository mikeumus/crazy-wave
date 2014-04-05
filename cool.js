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

var testX = canvasWidth
var test = new Array()

test.push(100)
test.push(50)

console.log(canvasWidth)
console.log(canvasHeight)


var pieces = new Array()

for (var y = 0; y < rowSize; y++) {
	pieces.push(new Array());
	for(var x = 0; x < columnSize; x++){
		pieces[y].push(0);
	}
};

var background = new Array()

for (var y = 0; y < rowSize; y++) {
	background.push(new Array());
		for(var x = 0; x < columnSize; x++){
		background[y].push(0);
		}
};
	

background[101][100] = 1;
background[101][101] = 1;
background[99][101] = 1;
background[100][103] = 1;
background[101][104] = 1;
background[101][105] = 1;
background[101][106] = 1;

drawCircle = function(x, y){
	  context.beginPath();
      context.arc(x,y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 0;
      context.stroke();
}

drawBackground = function(x, y) {
      context.beginPath();
      context.fillStyle = 'blue';
      context.arc(x,y, radius, 0, 2 * Math.PI, false);
      context.fill();
      context.lineWidth = 0;
      context.stroke();
}

updateBoard = function(){
    

	for (var y = 0; y < rowSize; y++) {
		for(var x = 0; x < columnSize; x++){
		pieces[y][x] = 0;
		}
	};
//       if(PAUSE){
//           return 0
//	} 
    

    
//bug check   // drawCircle(50*radius*2+radius,50*radius*2+radius)
    
    
    
    var columnList = pattern1()
    

    
    for(var x = 0; x< columnSize; x++) {
		for (var y = 0; y < rowSize; y++){

		        background[y][x-1] = background[y][x];
                //background[y][x] = 0 //update this
                if (x == columnSize-1) {
                    drawCircle(70*radius*2+radius,70*radius*2+radius)
                    
                    background[y][x-1] = columnList[y]
                }
        
		}
	};
    
    testX--;

}

pattern1 = function() {
    var column = new Array()
    


    for (var y = 0; y < rowSize; y++) {
	   column.push(0);
	
    };
    
    drawCircle(50*radius*2+radius,50*radius*2+radius)
    
    column[100] = 1
    column[108] = 1
    column[107] = 1
    column[106] = 1
    column[105] = 1
    column[104] = 1
    column[103] = 1
    column[102] = 1
    column[101] = 1
    
     
    column[150] = 1
    column[158] = 1
    column[157] = 1
    column[156] = 1
    column[155] = 1
    column[154] = 1
    column[153] = 1
    column[152] = 1
    column[151] = 1
    
    

    return column
}

drawPieces = function(){
	//c.clearRect(0, 0, canvasWidth, canvasHeight);
    
 
    
	for(var y = 0; y<rowSize; y++){
		for(var x = 0; x<rowSize; x++){
			if(pieces[y][x]==1){
				drawCircle(x*radius*2+radius,y*radius*2+radius)
			}
            else if(background[y][x]==1){
                //if(x > rowSize-10){
                drawBackground(x*radius*2+radius,y*radius*2+radius)   
              //  }
            }
        
	}
}
}

run = function(){
    var imageData = context.getImageData(1, 0, context.canvas.width-1, context.canvas.height);
    context.putImageData(imageData, 1, 1);
    // now clear the right-most pixels:
   // context.clearRect(context.canvas.width-1, 0, 1, context.canvas.height);
	drawPieces()
	//updateBoard()
    
    

}


main = function(){
	setInterval(run, 20);
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