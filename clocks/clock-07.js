// This is the time as a clock-hand
var clock07 = function(sketch) {

  sketch.setup = function() {
    sketch.setFrameRate(1);
  }

  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(255);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);

    let hSpacing = sketch.height / 3;
    let spacing = (sketch.height / 2 - hSpacing) / 4;
    let h = sketch.hour();
    let m = sketch.minute();
    let s = sketch.second();
    let mod = h % 12;
    let angle = sketch.map(s, 0, 60, -sketch.PI, sketch.PI);
    let letterSqueeze = 0.6;

    let hIndicatorSize = sketch.width / 100;

    sketch.translate(sketch.width / 2, sketch.height / 2);
    sketch.rotate(angle);

    // draw AM PM
    sketch.textSize(hIndicatorSize);
    sketch.fill(100);

    sketch.translate(-hIndicatorSize * 3, 0);
    if (h > 12) {
      drawCharacter('A', hIndicatorSize, 1);
    } else {
      drawCharacter('P', hIndicatorSize, 1);
    }
    sketch.translate(hIndicatorSize * 6, 0);
    drawCharacter('M', hIndicatorSize, 1);
    sketch.translate(-hIndicatorSize * 3, 0);
    sketch.translate(0, hSpacing);

    // draw H
    hIndicatorSize *= .75;
    sketch.fill(255);
    if (mod < 10) {
      drawCharacter(mod, hIndicatorSize, letterSqueeze);
      sketch.translate(0, spacing * 2);
    } else {
      drawCharacter(sketch.floor(mod / 10), hIndicatorSize, letterSqueeze);
      sketch.translate(0, spacing);
      drawCharacter(mod % 10, hIndicatorSize, letterSqueeze);
      sketch.translate(0, spacing);
    }

    // draw M
    sketch.fill(255);
    if (m < 10) {
      drawCharacter(0, hIndicatorSize, letterSqueeze);
      sketch.translate(0, spacing);
      drawCharacter(m, hIndicatorSize, letterSqueeze);
    } else {
      drawCharacter(sketch.floor(m / 10), hIndicatorSize, letterSqueeze);
      sketch.translate(0, spacing);
      drawCharacter(m % 10, hIndicatorSize, letterSqueeze);
    }
  }

  function drawCharacter(character, size, letterSqueeze) {
    let dots = font[character];
    sketch.push();
    sketch.noStroke();
    for (let row = 0; row < dots.length; row++) {
      for (let col = 0; col < dots[row].length; col++) {
        if (dots[row][col] === 1) {
          sketch.rect(size * col - size * 2.5, (size * row - size * 2.5) * letterSqueeze, size, size * letterSqueeze);
        }
      }
    }
    sketch.pop();
  }
}
