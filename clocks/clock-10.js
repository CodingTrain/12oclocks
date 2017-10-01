// This is the rotated grid clock
var clock10 = function(sketch) {

  let colorRed, colorDarkRed, colorWhite, colorDefault;

  const relativeScale = 0.85;
  const xSpacing = 17;
  const ySpacing = 8;

  let scale;

  sketch.setup = function() {
    sketch.angleMode(sketch.DEGREES);
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
        drawDate(i*10 + j, scale, solid, true);
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
    drawDate(h, scale, solid, false);

    sketch.pop();
  }

  function drawMinute() {
    sketch.push();
    sketch.noFill();
    sketch.stroke(colorWhite);

    let m = sketch.minute();
    translateTo(m);
    drawDate(m, scale, outline, true);

    sketch.pop();
  }

  function drawSecond() {
    sketch.push();
    sketch.noFill();
    sketch.stroke(colorDarkRed);

    let s = sketch.second();
    translateTo(s);
    sketch.translate(-5.5 * scale, -3.5 * scale);

    drawDate(s, 2*scale, outline, true);
    drawDate(s, 2*scale, diagonal, true);

    sketch.translate(-scale, scale);
    sketch.noStroke();
    sketch.fill(colorRed);

    drawDate(s, 2*scale, solid, true);

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
      drawCharacter(number.charAt(0), scale, drawFunction);

    sketch.translate(6 * scale, 0);
    drawCharacter(number.charAt(1), scale, drawFunction);
    sketch.pop();
  }

  // Draws a character with the given drawFunction
  function drawCharacter(character, scale, drawFunction) {
    let dots = font[character.charAt(0)];

    for (let row = 0; row < dots.length; row++)
      for (let col = 0; col < dots[row].length; col++)
        if (dots[row][col] === 1)
          drawFunction(dots, col, row, scale);
  }

  // Draws the solid cell
  function solid(dots, x, y, scale) {
    sketch.rect(x * scale, y * scale, scale, scale);
  }

  // Draws the outlines of a cell depending on the neighbour
  function outline(dots, x, y, scale) {
    let checkTop = (y - 1 < 0 || dots[y - 1][x] == 0);
    let checkBottom = (y + 1 >= dots.length || dots[y + 1][x] == 0);
    let checkLeft = (x - 1 < 0 || dots[y][x - 1] == 0);
    let checkRight = (x + 1 >= dots[y].length || dots[y][x + 1] == 0);

    if (checkTop)
      sketch.line(x * scale, y * scale - 1, (x + 1) * scale - 1, y * scale - 1);

    if (checkBottom)
      sketch.line(x * scale, (y + 1) * scale, (x + 1) * scale - 1, (y + 1) * scale);

    if (checkLeft)
      sketch.line(x * scale - 1, y * scale, x * scale - 1, (y + 1) * scale - 1);

    if (checkRight)
      sketch.line((x + 1) * scale, y * scale, (x + 1) * scale, (y + 1) * scale - 1);
  }

  // Draws the diagonal lines of a cell depending on the neighbour
  function diagonal(dots, x, y, scale) {
    let checkTop = (y - 1 < 0 || dots[y - 1][x] == 0);
    let checkBottom = (y + 1 >= dots.length || dots[y + 1][x] == 0);
    let checkLeft = (x - 1 < 0 || dots[y][x - 1] == 0);
    let checkRight = (x + 1 >= dots[y].length || dots[y][x + 1] == 0);

    if (checkTop && checkLeft)
      sketch.line(x * scale, y * scale, (x - 0.5) * scale, (y + 0.5) * scale);

    if (checkTop && checkRight)
      sketch.line((x + 1) * scale, y * scale, (x + 0.5) * scale, (y + 0.5) * scale - 0.5);

    if (checkBottom && checkRight)
      sketch.line((x + 1) * scale, (y + 1) * scale - 1, (x + 0.5) * scale, (y + 1.5) * scale - 1);
  }

}
