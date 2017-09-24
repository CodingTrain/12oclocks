// This is the rotated grid clock
var clock10 = function(sketch) {
  sketch.setup = function() {

  }

  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(255);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.text('clock 10', sketch.width/2, sketch.height/2);
  }
}
