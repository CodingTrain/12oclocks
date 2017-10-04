// This is the 3D rotating pixel clock
var clock11 = function(sketch) {
  // Parameter of the ellipse path.
  // All values are relative to the canvas size;
  const ellipseX = 0.5;
  const ellipseY = 0.4;
  const ellipseHeight = 0.25;
  const ellipseWidth = 0.7;
  // Size of one dot
  const pointSize = 3;
  // Offset of the dots
  const xOffset = 3.5;
  const yOffset = 5;
  // Duration of one cycle in milliseconds
  const cycleDuration = 5000;
  // Keeps track of the offset on the ellipse path.
  // Values are between 0 and 1.
  let alpha = 0;

  sketch.setup = function() {
    sketch.angleMode(sketch.DEGREES);
  }

  sketch.draw = function() {
    // Clear screen
    sketch.background(150);

    // scale the points depending on the canvas
    sketch.strokeWeight(pointSize * sketch.height / 200);

    // Calculate the current offset
    alpha = (sketch.millis() % cycleDuration) / cycleDuration;

    // First draw the back half
    for(let i = 0; i < 11*5; i++) {
      drawColumn(i, false);
    }

    // Then draw the front half on top
    for(let i = 0; i < 11*5; i++) {
      drawColumn(i, true);
    }
  }

  /**
   * Draws one column of the global dot matrix. Also perform a simple
   * depth test. Depending on the value of 'drawFront' the front or the back
   * half is going to be discard.
   *
   * @param int   globalColumn  The index of column of the global dot matrix
   *                            that is going to be drawn.
   * @param bool  drawFront     Whether to draw the front or the back
   *                            half of the dot matrix.
   */
  function drawColumn(globalColumn, drawFront) {
    // Grab the current character
    let character = getTime().charAt(Math.floor(globalColumn / 5));
    // If the character is empty then skip it
    if(character == ' ')
       return;

    // get the dot matrix of the character
    let charMatrix = font[character];
    // get the local column index
    let column = globalColumn % 5;

    // shortcuts
    let height = sketch.height;
    let width = sketch.width;

    // if the aspect ration is to high, scale by height
    if(width/height > 2)
      width = height * 1.75;

    // calculate the center of the ellipse
    let centerX = ellipseX * sketch.width;
    let centerY = ellipseY * sketch.height;

    // calculate the position on a normatized circle.
    let relX =  sketch.cos(alpha*360 - globalColumn * xOffset);
    let relY = -sketch.sin(alpha*360 - globalColumn * xOffset);

    // Check if the column is at the back or front
    // and discard depending on 'bool drawFront'
    if(drawFront == (relY < 0))
       return;

    // calculate the current grayscale
    sketch.stroke(255 * sketch.map(relY, -1, 1, 0, 1));

    sketch.push();
    // set the position of the first dot
    sketch.translate(
      relX * width * ellipseWidth/2   + centerX,
      relY * height * ellipseHeight/2 + centerY
    );

    // draw the current column
    for(let i=0; i<7; i++) {
      if(charMatrix[i][column] == 1) {
        sketch.point(0, i * yOffset * sketch.height / 200);
      }
    }

    sketch.pop()
  }

  /**
   * Outputs the time at the correct format. The length of the string
   * is always 11. To ensure the length, a leading whitespace is added
   * if nedded.
   *
   * @return String   The current time as a string.
   */
  function getTime() {
    let h = sketch.hour() % 12;
    let m = sketch.minute();
    let s = sketch.second();
    let isAM = sketch.hour() < 12;

    h = "" + (h == 0 ? 12 : h);
    h = (h < 10 ? " " : "") + h;
    m = (m < 10 ? "0" : "") + m;
    s = (s < 10 ? "0" : "") + s;

    return h + ":" + m + ":" + s + " " + (isAM ? "A" : "P") + "M";
  }
}
