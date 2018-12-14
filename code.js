

var animate = /*window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||*/
function(callback) { window.setTimeout(callback, 1) };
var canvas=document.createElement ("canvas");
var ctx;
ctx=canvas.getContext("2d");


var width=1000;
var height=1000;
canvas.width=width;
canvas.height=height;

var X=0;
var Y=0;

var comp=new Complex();

var step = function(){
	
	for(Y=0;Y<height;Y++){
		for(X=0;X<width;X++){
			comp.r=(X-width/2)/(width/4);
			comp.i=(Y-height/2)/(height/4);
	
		ctx.beginPath();
		ctx.arc(X,Y, 1, 0, 2 * Math.PI);
		ctx.strokeStyle = getColor(appartiene(comp));
		ctx.stroke();
		}
	}
	
	/*comp.r=(X-width/2)/(width/4);
			comp.i=(Y-height/2)/(height/4);
	
		ctx.beginPath();
		ctx.arc(X,Y, 1, 0, 2 * Math.PI);
		ctx.strokeStyle = getColor(appartiene(comp));
		ctx.stroke();
	*/
	
	X++;
	if(X>width){
		X=0;
		Y++;
	}
	if(Y>height){
		return;
	}
	
	
	animate(step);
};

function complexProduct(c1,c2){
	c3=new Complex(c1.r*c2.r-c1.i*c2.i,c1.r*c2.i+c2.r*c1.i);
	return c3;
}

function complexSum(c1,c2){
	c3=new Complex(c1.r+c2.r,c1.i+c2.i);
	return c3;
}

function appartiene(c){
	x=new Complex();
	x=c;
	var i;
	for(i=0;i<100;i++){
		if(modulo(x)>2){
			return i;
		}
		x=complexSum(complexProduct(x,x),c);
	}
	
	return 0;
}

function modulo(c){
	return Math.sqrt(c.r*c.r+c.i*c.i);
}

function Complex(r,i){
	this.r=r;
	this.i=i;
}

function getColor(n){
	var color;
	switch(Math.floor(getBaseLog(2,n))){
		case 0:color="#ffffff";break;
		case 1:color="#ff0000";break;
		case 2:color="#00ff00";break;
		case 3:color="#0000ff";break;
		case 4:color="#ffff00";break;
		case 5:color="#ff00ff";break;
		case 6:color="#00ffff";break;
		default:color="#000000";break;
	}
	return color;
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

window.onload=function(){
document.body.appendChild(canvas);
animate(step);
};
