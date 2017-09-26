// This is the rotated grid clock
// Author: Haider Ali Punjabi
// Mail: haideralipunjabi@hackesta.org 
// Github: haideralipunjabi
// using font.js from https://github.com/CodingTrain/12oclocks/pull/2/ by @FantasyTeddy

var clock09 = function(sketch) {
  var cMillis = 0;
  var startAngleSecs = 0, startAngleMins = 0, startAngleHrs = 0;
  sketch.setup = function() {
    sketch.angleMode(sketch.DEGREES);

    	setInterval( function() {
    		cMillis += 10;
    		//equates to 1 step movement per 0.5 seconds
    		startAngleSecs += 0.12;
    		//rotates negatively, equates to 1 step movement per 3 seconds
    		startAngleMins -= 0.02;
    		//equates to 1 step movement per 10 seconds
    		startAngleHrs += 0.006
    } , 10);
  }

  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(177);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    drawTime(sketch.hour().toString(), sketch.minute().toString(), 1);
    // drawTime("4","48"); // Testing hour & minute as shown at http://cmuems.com/2016/60212/wp-content/uploads/2016/09/maeda-all.gif
    
  }
  
  // Copied from https://github.com/CodingTrain/12oclocks/pull/2/ by @FantasyTeddy
  // size parameter/argument added by @haideralipunjabi 
  function drawCharacter(character, x, y, size) {
      let dots = font[character];
      for (let row = 0; row < dots.length; row++) {
        for (let col = 0; col < dots[row].length; col++) {
          if (dots[row][col] === 1)
            drawClock(x + (5*size) * col - (10*size), y + (5 * size) * row - (15 * size), 5*size, 5*size);
            
        }
      }
    }
    
  // By @haideralipunjabi
  function drawTime(hour,minute){
    //Prefixing 0 before minute < 10
    if(minute.length === 1) minute = "0" + minute;
    
    //Calculating multiplying factor to size of each dot, so that clock fills whole space.
    //Calculated by divinding availavle space(width) by required space (no. of cols * size of dot(5) )
    //No. of cols = (No. of characters * No. of cols of each character)   + Spaces in between characters + cols to leave before and after clock
    //Here, No. of characters = 5, No. of cols of each character = 5, Spaces in between characters = 4, cols to leave before and after = 6 (3 before & 3 after)
      
    size = sketch.width / (35 * 5)
    
    //  Spacing between characters (Size of dot * calculated size)
     
    spacing = 5 * size;
    
    //For each character in hour, draw that character
    
    for (let i = 0; i < hour.length; i++){
       drawCharacter(hour[hour.length -1 - i], sketch.width/2 - (spacing * (i + 1) * 6), sketch.height/2,size);
    }
    
    //Draw the : in between hour and minute
    drawCharacter(":", sketch.width/2, sketch.height/2,size);
    
    //For each character in minute, draw that character
    for (let i = 0; i < minute.length; i++){
       drawCharacter(minute[i], sketch.width/2 + (spacing * (i+1) * 6) , sketch.height/2,size);
        
    }
  }
  function drawClock(x,y,w,h)
  {
    let hr = 9;
    let mn = sketch.minute();
    let sc = sketch.second();
  	let secondAngle = sketch.map(sc, 0, 60, 0, 360);
  	let minuteAngle = sketch.map(mn, 0, 60, 0, 360);
    let hourAngle = sketch.map(hr, 0, 12, 0, 360);
    let hourCoords = getPoint(x,y,10,hourAngle);
    sketch.fill(255);
    sketch.ellipse(x,y,w,h);
    sketch.push();
    sketch.stroke(255,0,0);
    sketch.fill(255,0,0);
    sketch.line(x,y,hourCoords.x, hourCoords.y);
    sketch.pop();
  }
  
  function getPoint(x,y,d,a)
  {
    a = Math.PI; 
    return {
      x: x + (d * (1 /sketch.sqrt(1 + (a * a)))),
      y: y + (d * (a /sketch.sqrt(1 + (a * a))))
    };
  }
}
