// This is the rotated grid clock
// Author: Haider Ali Punjabi
// Mail: haideralipunjabi@hackesta.org 
// Github: haideralipunjabi
// using font.js from https://github.com/CodingTrain/12oclocks/pull/2/ by @FantasyTeddy

var clock09 = function(sketch) {
  sketch.setup = function() {

  }

  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(177);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    drawTime(sketch.hour().toString(), sketch.minute().toString(), 1.7);
    // drawTime("4","48"); // Testing hour & minute as shown at http://cmuems.com/2016/60212/wp-content/uploads/2016/09/maeda-all.gif
  
  }
  
  // Copied from https://github.com/CodingTrain/12oclocks/pull/2/ by @FantasyTeddy
  // size parameter/argument added by @haideralipunjabi 
  function drawCharacter(character, x, y, size) {
      let dots = font[character];
      for (let row = 0; row < dots.length; row++) {
        for (let col = 0; col < dots[row].length; col++) {
          if (dots[row][col] === 1)
            sketch.ellipse(x + (5*size) * col - (10*size), y + (5 * size) * row - (15 * size), 5*size, 5*size);
            sketch.push();
            sketch.fill(0);
            
            sketch.ellipse(x + (5*size) * col - (10*size), y + (5 * size) * row - (15 * size), 1*size, 1*size);
            sketch.pop();
        }
      }
    }
    
  // By @haideralipunjabi
  function drawTime(hour,minute, size){
    //Prefixing 0 before minute < 10
    if(minute.length === 1) minute = "0" + minute;
    
    //  Spacing between characters
    spacing = 28;
    
    //For each character in hour, draw that character
    for (let i = 0; i < hour.length; i++){
       drawCharacter(hour[i], spacing + (spacing * i * size), sketch.height/2,size);        
    }
    
    //Draw the : in between hour and minute
    drawCharacter(":", spacing + (spacing * hour.length * size), sketch.height/2,size);
    
    //For each character in minute, draw that character
    for (let i = 0; i < minute.length; i++){
       drawCharacter(minute[i], spacing + (spacing * (hour.length + 1 + i) * size) , sketch.height/2,size);
        
    }
  }

}
