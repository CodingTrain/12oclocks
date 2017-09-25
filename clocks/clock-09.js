// This is the clocks-as-pixels clock
var clock09 = function(sketch) {
  sketch.setup = function() {

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
            // TODO: Draw minature clocks here.
            sketch.ellipse(x + (5*size) * col - (10*size), y + (5 * size) * row - (15 * size), 5*size, 5*size);
            sketch.push();
            sketch.fill(0);

            sketch.ellipse(x + (5*size) * col - (10*size), y + (5 * size) * row - (15 * size), 1*size, 1*size);
            sketch.pop();
        }
      }
    }

  // By @haideralipunjabi
  function drawTime(hour,minute){
    // Prefixing 0 before minute < 10
    if(minute.length === 1) minute = "0" + minute;

    // Calculating multiplying factor to size of each dot, so that clock fills whole space.
    // Calculated by divinding availavle space(width) by required space (no. of cols * size of dot(5) )
    // No. of cols = (No. of characters * No. of cols of each character)   + Spaces in between characters + cols to leave before and after clock
    // Here, No. of characters = 5, No. of cols of each character = 5, Spaces in between characters = 4, cols to leave before and after = 6 (3 before & 3 after)

    size = sketch.width / (35 * 5)

    // Spacing between characters (Size of dot * calculated size)

    spacing = 5 * size;

    // For each character in hour, draw that character

    for (let i = 0; i < hour.length; i++){
       drawCharacter(hour[hour.length -1 - i], sketch.width/2 - (spacing * (i + 1) * 6), sketch.height/2,size);
    }

    // Draw the : in between hour and minute
    drawCharacter(":", sketch.width/2, sketch.height/2,size);

    // For each character in minute, draw that character
    for (let i = 0; i < minute.length; i++){
       drawCharacter(minute[i], sketch.width/2 + (spacing * (i+1) * 6) , sketch.height/2,size);

    }
  }

}
