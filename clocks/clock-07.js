//alebas96

function setup() {

	angleMode(DEGREES);
	 pixelFont= loadFont('libraries/Minecraft.ttf');
	
}
let pixelFont;
const fontSize=30;

var dots = function(){

	fill(0);
}


function draw() {
	background(0);
	let hh = hour();
	let mm = minute();
	let ss = second();

	translate(width/2, height/2);
	scale(0.5	);
	let angle = map(ss,0,60,0,360);
	rotate(angle);

	fill(255);
	fill(255);
	textFont(pixelFont,fontSize);
	textAlign(CENTER);

	if(hh%12>0){
		fill(150);
		text("PM",0,0+fontSize);
		fill(255);
		text(hh%12,0,0+fontSize*2.5);
	}
	else{
		fill(150);
		text("AM",0,0+fontSize);
		fill(255);
		text(hh,2,0,0+fontSize*2.5);
	}
	fill(255);
	var mm2= nf(mm,2);
	text(mm2.toString().charAt(0),0,0+fontSize*4.5);
	text(mm2.toString().charAt(1),0,0+fontSize*5.5);
	fill(255,0,0);
	if(frameCount%60===	0){

		text(":",0,0+fontSize*3.5);

	}



}
