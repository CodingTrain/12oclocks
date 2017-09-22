window.addEventListener('load', function() {
  var clocks = new Array(12).fill(0).map(function(_, i) {
    i++;
    if (i < 10) {
      i = "0" + i
    } else {
      i = "" + i;
    }
    return {
      container: document.getElementById("clock-" + i),
      fn: window["clock" + i]
    }
  });

  clocks.forEach(function(data) {
    data.p5 = new p5(function(sketch) {
      // Original sketch
      data.fn(sketch);
      // Override setup
      var old_setup = sketch.setup || function() {};
      sketch.setup = function() {
        // Grab canvas element
        data.canvas = sketch.createCanvas(100, 100).elt;
        sketch.resize();
        old_setup.apply(this, arguments);
      }

      sketch.resize = function() {
        var container = data.canvas.getBoundingClientRect();
        sketch.resizeCanvas(container.width, container.height, false);
      }
      // Override resize
      var old_resize = sketch.windowResized || function() {};
      sketch.windowResized = function() {
        sketch.resize();
      }
    }, data.container);
  });
});
