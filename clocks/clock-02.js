// This is the overlaid circles clock
var clock02 = function(sketch) {
  sketch.setup = function() {

  }

  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(255);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.text('clock 2', sketch.width/2, sketch.height/2);
  }
}
