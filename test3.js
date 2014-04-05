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

var counter1 = 25 //counter for first pattern
var counter2 = 0 //counter for second pattern
var counter3 = 25

var check = 0

var choose = 1

var score = 0;

var PAUSE = 0;
var offset = 0;
var offsetSwitch = 1;
var realOffset = 0



console.log(canvasWidth)
console.log(canvasHeight)



var background = new Array()

    for(var x = 0; x < columnSize; x++){
    background.push(new Array());
        background[x].push(-1)
        background[x].push(0)
    };


background[101][100] = 1;
background[101][101] = 1;
background[99][101] = 1;
background[100][103] = 1;
background[101][104] = 1;
background[101][105] = 1;
background[101][106] = 1;



drawRedCircle = function(){
   
	  context.beginPath();
      context.arc(150,50, radius*10, 0, 2 * Math.PI, false);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 0;
      context.stroke();
}

drawGreenCircle = function(){
   
	  context.beginPath();
      context.arc(150,50, radius*10, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 0;
      context.stroke();
}



drawBackground = function(x, y, length) {
    
   
     context.beginPath();
      context.fillStyle = "#E6E6FA";
    context.strokeStyle = "#E6E6FA";
      context.rect(x, y, 5, length);
      context.fill();
      context.lineWidth = 0;
      context.stroke();
}

updateBoard = function(){
    


       if(PAUSE){
           return 0
	} 
    

    
//bug check   // drawCircle(50*radius*2+radius,50*radius*2+radius)
    
    switch(choose){
        case 1:
            var columnList = pattern1()
            break;
        case 2:
            var columnList = pattern2()
            break;
        case 3:
            var columnList = pattern3()
    }
    
    if (offsetSwitch != 0) { //chance of changing offset switch to normal
        if (Math.random() > 0.8){
            offsetSwitch = 0
        }
    }
    
    if (Math.random() > 0.9) { //random to make it positive or negative
        if (Math.random() > 0.5) {
            
        offsetSwitch = -1
        }
        else {
            offsetSwitch = 1
        }
    }
    
    if (columnList[0] == 75+offset){ //randomize pattern
        if (Math.random() < 0.5){
            choose = 1
    }
            else {
            choose = 2
        }
    }
    
    for(var x = 0; x< columnSize; x++) {

		        background[x-1] = background[x];
                //background[y][x] = 0 //update this
                if (x == columnSize-1) {
                   
                    background[x-1] = columnList
                    if (offsetSwitch != 0){
                        offset += offsetSwitch
                        
                    }
                    else if (offset > 0){ //offset is 0
                        offset--
                        }
                    else if (offset < 0){
                        offset++
                        }
                    
                   
                    background[x-1][0] -= offset
                    }
	};

}

pattern1 = function() {
    var column = new Array()

    counter1++    
 
    if (counter1 < 50) {
    column.push(50+counter1)
    column.push(80)
    }
        else{
        column.push(150-counter1)
        column.push(80)
        
        if (counter1 > 99) {
            counter1 = 0 
        }
        
    }
    return column
}

pattern2 = function(){
    var column = new Array()

    counter2++
 
    if (counter2 < 50) {
    column.push(75-counter2/2)
    column.push(counter2*4+80)
        }
        else{
        column.push(25+counter2/2)
        column.push(480-counter2*4)
        
        if (counter2 > 99) {
            counter2 = 0 
        }
        
    }
    return column
    
}



drawPieces = function(){
   
    c.clearRect(0, 0, canvasWidth, canvasHeight);

    
	if(check == 0){
        
        score-= score/10;
        context.fillStyle = "red"
        scoreDisplay()
        //drawRedCircle()
        
    }
    else {
        score++;
        context.fillStyle = "black"
        scoreDisplay()
        //drawGreenCircle()
        
    }
    

    
    for(var x = 0; x<rowSize; x++){
        
                drawBackground(x*radius*2+radius, background[x][0]*radius*2+radius, background[x][1])   
        
		
            
        
	}
}


run = function(){
   // c.translate(-10,0)
    
    
  
	drawPieces()
	updateBoard()
   // c.translate(0,0)
    
    

}


function scoreDisplay() {
    context.font = "bold 90px Arial";
    context.fillText(Math.floor((score/5)), 40, 90);
}


main = function(){
	setInterval(run, 15);
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
    
    var pixelData = canvas.getContext('2d').getImageData(mouseX, mouseY, 1, 1).data;
   
    
    var mouseR = pixelData[0]
    var mouseG = pixelData[1]
    var mouseB = pixelData[2]
   //var a= pixelData[3]
    //console.log("This is red val: ", mouseR)
    //console.log("This is green val: ", mouseG)
    
    if(mouseR!=230 && mouseG!=230 && mouseB !=250){
        check=0
    //    console.log("You're outsisde the line conrad....")
        
}
    else{
        check =1
    }
}

window.onload = main