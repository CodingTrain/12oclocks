// This is the zoom and fade clock
var clock08 = function(sketch) {
  sketch.setup = function() {

  }

  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(255);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.text('clock 8', sketch.width/2, sketch.height/2);
  }
}
