// This is the time as a clock-hand
var clock07 = function(sketch) {
  sketch.setup = function() {

  }

  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(255);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.text('clock 7', sketch.width/2, sketch.height/2);
  }
}
