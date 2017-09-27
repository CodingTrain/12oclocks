window.addEventListener('load', function() {
  var clocks = new Array(12).fill(0).map(function(_, i) {
    i++;
    var rendersEveryFrame = [1, 3, 6, 8, 9, 11].indexOf(i) >= 0;
    if (i < 10) {
      i = "0" + i
    } else {
      i = "" + i;
    }
    return {
      container: document.getElementById("clock-" + i),
      fn: window["clock" + i],
      rendersEveryFrame: rendersEveryFrame,
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
        sketch.noLoop();
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
        old_resize.apply(this, arguments);
      }
    }, data.container);
  });

  var last_render_second = -1;
  var must_redraw = false;

  window.addEventListener('resize', function() {
    must_redraw = true;
  });

  function animate() {
    var date = new Date();
    var second = date.getSeconds();
    if(second !== last_render_second) {
      must_redraw = true;
    }
    last_render_second = second;
    clocks.forEach(function(data) {
      if(data.rendersEveryFrame || must_redraw) {
        // Note that frameCount is broken in p5.js version 0.5.14
        // See https://github.com/processing/p5.js/issues/2192
        data.p5.frameCount += 1;
        data.p5.redraw();
      }
    });
    must_redraw = false;
    window.requestAnimationFrame(animate);
  }
  window.requestAnimationFrame(animate);
});
