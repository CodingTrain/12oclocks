// This is the double circle clock
var clock03 = function(sketch) {
  // "radial grid" parameters
  let diameter_step;
  const radial_step = 360/(6*6); // 6 characters of (5 width + 1 "blank" between each)

  sketch.setup = function() {
    sketch.angleMode(sketch.DEGREES);
    sketch.noStroke();

    // disc divided in 10 parts (top line empty, 7 others for the digit and the two smaller diameters empty)
    diameter_step = sketch.height/10;
  }

  sketch.draw = function() {
    // angle of rotation of the display
    let angle = sketch.map(sketch.millis() % 60000, 0, 60000, 0, 360);

    // Get current time
    let h = sketch.hour() % 12 === 0 ? 12 : sketch.hour() % 12;
    let m = sketch.minute();
    // convert to string and add space before minutes and hours if they are less than two characters
    if (h < 10) {
      h = ' '+h;
    }
    if (m < 10) {
      m = '0'+m;
    }

    // final text to display, for example "12:34 "
    let text = h+':'+m+' ';

    // draw
    sketch.background(0);
    for (let i = 6; i >= 0; i--) { // i loop all 7 lines of a character in reverse
      for (let j = 0; j < 5; j++) { // j loop all 5 columns of a character
        for (let k = 0; k < 6; k++) { // k loop all characters of the text
            // color of the arc depending on the item in the list
            if (text[k] == ' ') { // if it is a space, make it black
              sketch.fill(0);
            } else if (font[text[k]][6-i][j] == 1) {
              sketch.fill(255);
            } else {
              sketch.fill(0);
            }

            // display left arc, layer by layer for each columns so only a small "square" is left to be seen
            sketch.arc(0, sketch.height/2, // arc centered on the left center of the screen
            diameter_step*(i+3), diameter_step*(i+3), // with a diameter corresponding to the line i of the caracter
            radial_step*(angle + k*6 + j), // starting at the current rotation + character position k + column j of the caracter
            radial_step*(angle + k*6 + j+1)); // ending +1 further
            //...and right arc
            sketch.arc(sketch.width, sketch.height/2, diameter_step*(i+3), diameter_step*(i+3), radial_step*(angle+k*6+j), radial_step*(angle+k*6+j+1));
        }
        sketch.fill(0);
        sketch.ellipse(0, sketch.height/2, diameter_step*(i+2));
        sketch.ellipse(sketch.width, sketch.height/2, diameter_step*(i+2));
      }
    }
  }
}
