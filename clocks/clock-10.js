// This is the rotated grid clock
let colorRed, colorWhite, colorDefault;
var clock10 = function(sketch) {
  sketch.setup = function() {
    sketch.angleMode(sketch.DEGREES);
  };

  sketch.draw = function() {
    colorRed = sketch.color(255, 0, 0);
    colorWhite = sketch.color(255, 255, 255);
    colorDefault = sketch.color(224, 224, 224);

    sketch.background(0);
    sketch.fill(224);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    drawGrid();
  };

  function drawCharacter(character, x, y, size, clr) {
    let dots = font[character];
    for (let row = 0; row < dots.length; row++) {
      for (let col = 0; col < dots[row].length; col++) {
        if (dots[row][col] === 1) {
          if (clr != colorDefault) {
            sketch.fill(clr);
            sketch.stroke(clr);
            if (clr === colorRed) {
              size = 0.6;
            }
          }

          sketch.ellipse(x + (5 * size) * col - (10 * size), y + (5 * size) * row - (15 * size), 5 * size, 5 * size);
        }
      }
    }
  }
  // drawGrid function draws the calendar
  function drawGrid() {
    let h = 35;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 10; j++) {
        sketch.push();
        sketch.rotate(20);
        sketch.translate(100 + i * 30, j * 15);
        drawDate(i, j, 0, 0, 0.2);
        sketch.pop();
      }
    }
  }
// drawDate draws each date in the grid/calendar
  function drawDate(i, j, x, y, size) {
    let colorI = colorDefault,
      colorJ = colorDefault;
    let h = sketch.hour() % 12 === 0 ? 12 : sketch.hour() % 12;
    if (i * 10 + j === h) {
      if (i !== 0) colorI = colorWhite;
      colorJ = colorWhite;
    }
    if (i * 10 + j === sketch.minute()) {
      colorI = colorWhite;
      colorJ = colorWhite;
    }
    if (i * 10 + j === sketch.second()) {
      colorI = colorRed;
      colorJ = colorRed;
    }
    drawCharacter(i.toString(), 0, 0, 0.4, colorI);
    drawCharacter(j.toString(), 55 * size, 0, 0.4, colorJ);

  }
}
