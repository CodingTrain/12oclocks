// This is the rotated grid clock
var clock10 = function(sketch) {

  let colorRed, colorDarkRed, colorWhite, colorDefault;

  const relativeScale = 0.85;
  const xSpacing = 17;
  const ySpacing = 8;

  let scale;

  sketch.setup = function() {
    sketch.angleMode(sketch.DEGREES);
    sketch.strokeWeight(1.1);
  };

  sketch.draw = function() {
    colorRed = sketch.color(255, 0, 0);
    colorDarkRed = sketch.color(150, 0, 0);
    colorWhite = sketch.color(255, 255, 255);
    colorDefault = sketch.color(90, 90, 90);

    scale = sketch.height / (10 * ySpacing) * relativeScale;

    sketch.background(0);
    sketch.fill(224);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);

    sketch.push();
    sketch.rotate(10);
    sketch.translate(scale * 30, 0);
    drawGrid();
    drawHour();
    drawMinute();
    drawSecond()
    sketch.pop();
  };

  // drawGrid function draws the calendar
  function drawGrid() {
    sketch.push();
    sketch.noStroke();
    sketch.fill(colorDefault);

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 10; j++) {
        drawDate(i*10 + j, scale, drawShape, true);
        sketch.translate(0, ySpacing * scale);
      }
      sketch.translate(xSpacing * scale, -10 * ySpacing * scale);
    }

    sketch.pop();
  }

  function drawHour() {
    sketch.push();
    sketch.noStroke();
    sketch.fill(colorWhite);

    let h = sketch.hour12();
    translateTo(h);
    drawDate(h, scale, drawShape, false);

    sketch.pop();
  }

  function drawMinute() {
    sketch.push();
    sketch.noFill();
    sketch.stroke(colorWhite);

    let m = sketch.minute();
    translateTo(m);
    drawDate(m, scale, drawShape, true);

    sketch.pop();
  }

  function drawSecond() {
    sketch.push();
    sketch.noFill();
    sketch.stroke(colorDarkRed);

    let s = sketch.second();
    translateTo(s);
    sketch.translate(-5.5 * scale, -3.5 * scale);

    drawDate(s, 2*scale, drawShape, true);
    drawDate(s, 2*scale, drawDiagonal, true);

    sketch.translate(-scale, scale);
    sketch.noStroke();
    sketch.fill(colorRed);

    drawDate(s, 2*scale, drawShape, true);

    sketch.pop();
  }

  // Translate to a specific number on the grid
  function translateTo(number) {
    let n1 = Math.floor(number / 10);
    let n2 = number % 10;
    sketch.translate((n1 * xSpacing) * scale, (n2 * ySpacing) * scale);
  }

  // drawDate draws each date in the grid/calendar
  function drawDate(number, scale, drawFunction, leadingZero) {
    if(leadingZero)
      number = (number < 10 ? "0" : "") + number;
    else
      number = (number < 10 ? " " : "") + number;

    sketch.push()

    if(number.charAt(0) !== " ")
      drawFunction(number.charAt(0), scale);

    sketch.translate(6 * scale, 0);
    drawFunction(number.charAt(1), scale);
    sketch.pop();
  }

  // Draws the shape of a character
  function drawShape(character, scale) {
    fontShapes.draw(sketch, character, scale);
  }

  // Draws the diagonal lines of a character
  function drawDiagonal(character, scale) {
    let char = fontShapes[character.charAt(0)];

    for (let s = 0; s < char.length; s++)
      for (let v = 0; v < char[s].length; v++)
        sketch.line(
          char[s][v][0] * scale, char[s][v][1] * scale,
          (char[s][v][0] - 0.5) * scale, (char[s][v][1] + 0.5) * scale
        );
  }

}
