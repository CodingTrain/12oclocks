// This is the pixelated clock with colourized history
var clock04 = function(sketch) {
  sketch.setup = function() {

  }

  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(255);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.text('clock 4', sketch.width/2, sketch.height/2);
  }
}
