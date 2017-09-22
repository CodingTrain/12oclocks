// This is the Conway's Game of Life clock
var clock06 = function(sketch) {
  sketch.setup = function() {

  }

  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(255);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.text('clock 6', sketch.width/2, sketch.height/2);
  }
}
