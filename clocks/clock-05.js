// This is the overlapping rotated numbers clock
// font sizes can be tweaked at the three occurences of: size = ..;

var clock05 = function(sketch) {
  sketch.setup = function() {

  }

  sketch.draw = function() {
  	let h = sketch.hour() % 12;
  	let m = sketch.minute();
  	let s = sketch.second();

    sketch.background(150);
    sketch.translate(sketch.width/2,sketch.height/2);

    // -- draw hours -- 
    let size = 10;
	sketch.fill(0);

	sketch.push();
		sketch.rotate(2*sketch.PI*h/12);
		if (h >= 10) {
		    sketch.translate(-3*size, 0);
		    drawCharacter(sketch.floor(h/10), size);
		    sketch.translate(6*size, 0);
		    drawCharacter(h%10, size);
		} else {
			drawCharacter(h, size);
		}
	sketch.pop();

    // -- draw minutes --
    size = 9.5;
	sketch.fill(255);

    sketch.push();
		sketch.rotate(2*sketch.PI*m/60);
		if (m >= 10) {
		    sketch.translate(-3*size, 0);
		    drawCharacter(sketch.floor(m/10), size);
		    sketch.translate(6*size, 0);
		    drawCharacter(m%10, size);
		} else {
			drawCharacter(m, size);
		}
	sketch.pop();

    // -- draw minutes --
    size = 6;
	sketch.fill(231,0,0);

    sketch.push();
		sketch.rotate(2*sketch.PI*s/60);
		if (s >= 10) {
		    sketch.translate(-3*size, 0);
		    drawCharacter(sketch.floor(s/10), size);
		    sketch.translate(6*size, 0);
		    drawCharacter(s%10, size);
		} else {
			drawCharacter(s, size);
		}
	sketch.pop();
  }

  function drawCharacter(character, size) {
    let dots = font[character];

    sketch.push();
    sketch.noStroke();
    for (let row = 0; row < dots.length; row++) {
      for (let col = 0; col < dots[row].length; col++) {
        if (dots[row][col] === 1) {
          sketch.rect(size * col - size*2.5, size * row - size*3.5, size, size);
      	}
      }
    }
    sketch.pop();
  }
}
