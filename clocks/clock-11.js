// This is the 3D rotating pixel clock
var clock11 = function(sketch) {
  sketch.setup = function() {

  }

  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(255);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.text('clock 11', sketch.width/2, sketch.height/2);
  }
}
