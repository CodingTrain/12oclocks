// This is the zoom and fade clock
var clock08 = function(sketch) {

  // Angle to use in sin calculation
  let angle = 0.0;
  // Amount to increment angle by
  const delta = 0.025;

  sketch.setup = function() {
  }

  sketch.draw = function() {

    let h = sketch.hour() % 12 === 0 ? 12 : sketch.hour() % 12;
    let m = sketch.minute();

    sketch.background(0);

    sketch.translate(sketch.width/2,sketch.height/2);

    // Map sin to scale
    let hScale = sketch.map(Math.sin(angle), -1, 1, 2, 10);
    let mScale = sketch.map(Math.sin(angle), -1, 1, 10, 2);

    // Hours
    sketch.translate(-sketch.width/4,0)
    sketch.fill(sketch.map(Math.sin(angle), -1, 1, 100, 255));
    sketch.push();
    if (h >= 10) {
        drawCharacter(sketch.floor(h/10), hScale);
        sketch.translate(6*hScale, 0);
        drawCharacter(h%10, hScale);
    } else {
        drawCharacter(h%10, hScale);
    }
    sketch.pop();

    // Minutes
    sketch.translate(sketch.width/2,0)
    sketch.fill(sketch.map(Math.sin(angle), -1, 1, 255, 100));
    sketch.push();
    if (m >= 10) {
        sketch.translate(-6*mScale, 0);
        drawCharacter(sketch.floor(m/10), mScale);
        sketch.translate(6*mScale, 0);
        drawCharacter(m%10, mScale);
    } else {
        sketch.translate(-6*mScale, 0);
        drawCharacter(0, mScale);
        sketch.translate(6*mScale, 0);
        drawCharacter(m%10, mScale);
    }
    sketch.pop();

    // Increase angle
    angle += delta;
  }

  function drawCharacter(character, size) {
    let dots = font[character];
    sketch.push();
    sketch.noStroke();
    for (let row = 0; row < dots.length; row++) {
      for (let col = 0; col < dots[row].length; col++) {
        if (dots[row][col] === 1) {
          if (joined(row, col + 1) && joined(row+1,col)) {
            sketch.rect(size * col - size*2.5, size * row - size*3.5, size + joined(row, col + 1), size);
            sketch.rect(size * col - size*2.5, size * row - size*3.5, size, size + joined(row + 1, col));
          } else {
            sketch.rect(size * col - size*2.5, size * row - size*3.5, size + joined(row, col + 1), size + joined(row + 1, col));
          }
        }
      }
    }
    sketch.pop();

    function joined(row, col) {
      if (row < 0 || row >= dots.length || col < 0 || col >= dots[row].length) {
        return false;
      }
      return dots[row][col] === 1;
    }
  }
}
