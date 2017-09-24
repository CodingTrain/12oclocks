// This is the pendulum clock
var clock01 = function(sketch) {
  sketch.setup = function() {

  }

  sketch.draw = function() {
    sketch.background(0);

    let angle = sketch.map(sketch.millis() % 2000, 0, 2000, 0, sketch.PI * 2);

    sketch.translate(sketch.width/2, 0);

    sketch.push();
    {
      sketch.rotate(sketch.sin(angle) * 0.5);
      sketch.translate(0, sketch.height - 50);

      sketch.fill(255);
      drawClock(sketch.hour(), sketch.minute());
    }
    sketch.pop();

    sketch.push();
    {
      sketch.rotate(-sketch.sin(angle) * 0.5);
      sketch.translate(0, sketch.height - 50);

      sketch.fill(128);
      drawPeriod(sketch.hour());
    }
    sketch.pop();
  }

  function drawClock(hour, minute) {
    hour %= 12;
    if (hour == 0) {
      hour = 12;
    }

    if (hour >= 10) {
      drawCharacter(sketch.floor(hour / 10), -60, 0);
    }
    drawCharacter(hour % 10, -30, 0);

    drawCharacter(':', 0, 0);

    drawCharacter(sketch.floor(minute / 10), 30, 0);
    drawCharacter(minute % 10, 60, 0);
  }

  function drawPeriod(hour) {
    if (hour < 12) {
      drawCharacter('A', -15, 0);
    } else {
      drawCharacter('P', -15, 0);
    }
    drawCharacter('M', 15, 0);
  }

  function drawCharacter(character, x, y) {
    let dots = font[character];
    for (let row = 0; row < dots.length; row++) {
      for (let col = 0; col < dots[row].length; col++) {
        if (dots[row][col] === 1)
          sketch.ellipse(x + 5 * col - 10, y + 5 * row - 15, 5, 5);
      }
    }
  }
}
