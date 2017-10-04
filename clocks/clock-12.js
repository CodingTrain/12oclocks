// This is the cube clock
var clock12 = function(sketch) {
  // color of the top face
  const topColor = [255, 0, 0, 127];
  // color of the front faces
  const frontColor = [255, 255, 255, 127];
  // color of the back faces
  const backColor = [200, 200, 200, 127];
  // scale of the cube
  let scale = 1.1;

  // The axes of the three different coordinate systems.
  // The normalized x axis (1, 0) will be mapped to the first vector;
  // the normalized y axis (0, 1) will be mapped to the second vector.
  sketch.angleMode(sketch.DEGREES);
  const axes = {
    top_bottom: [
      sketch.createVector(1, 0).rotate(30),
      sketch.createVector(1, 0).rotate(150) // vec(0,1).rot(60) doesn't work :/
    ],
    left_right: [
      sketch.createVector(1, 0).rotate(-30),
      sketch.createVector(0, 1).mult(6 / 7)
    ],
    front_back: [
      sketch.createVector(1, 0).rotate(30),
      sketch.createVector(0, 1).mult(6 / 7)
    ]
  };

  // Some constants for calculation
  const EDGE_LENGTH = 77;
  const ZERO = () => sketch.createVector(0, 0);
  const UP_VECTOR = axes.front_back[1].copy().mult(-EDGE_LENGTH);
  const LEFT_VECTOR = axes.top_bottom[1].copy().mult(EDGE_LENGTH);
  const RIGHT_VECTOR = axes.top_bottom[0].copy().mult(EDGE_LENGTH);

  // Origin of the 6 coordinate systems
  const origin = {
    top: ZERO().add(UP_VECTOR),
    bottom: ZERO(),

    left: ZERO().add(LEFT_VECTOR).add(UP_VECTOR),
    right: ZERO().add(LEFT_VECTOR).add(RIGHT_VECTOR).add(UP_VECTOR),

    front: ZERO().add(LEFT_VECTOR).add(UP_VECTOR),
    back: ZERO().add(UP_VECTOR)
  };


  sketch.setup = function() {
    sketch.noStroke()
  }

  sketch.draw = function() {
    scale = sketch.min(sketch.height, sketch.width) / 200;
    // clear screen
    sketch.background(0);

    // grab time
    let h = sketch.hour() % 12;
    let m = sketch.minute();
    let s = sketch.second();

    // format time
    h = "" + (h == 0 ? 12 : h);
    m = (m < 10 ? "0" : "") + m;
    s = (s < 10 ? "0" : "") + s;

    // draw the faces in the right order with the corresponding coordinate system
    drawNumber(s, backColor, axes.top_bottom, origin.bottom);
    drawNumber(h, backColor, axes.front_back, origin.back);
    drawNumber(m, backColor, axes.left_right, origin.left);
    drawNumber(m, frontColor, axes.left_right, origin.right);
    drawNumber(h, frontColor, axes.front_back, origin.front);
    drawNumber(s, topColor, axes.top_bottom, origin.top);
  }

  /**
   * Draws the number with the given color at the given coordinate system.
   * The origin is relative to the center of the canvas.
   *
   * @param {String}       number  The number to be displayed.
   * @param {double[4]}    color   The rgba-color of the number.
   * @param {p5.Vector[2]} axes    The axes of the targeted coordinate system.
   * @param {p5.Vector}    origin  The relative origin of the number.
   */
  function drawNumber(number, color, axes, origin) {
    // set the fill color
    sketch.fill(color);

    sketch.push();
    // Move the cube to the center and apply the corresponding
    // coordinate system and scale.
    sketch.translate(sketch.width * 0.5, sketch.height * 0.45);
    sketch.applyMatrix(
      axes[0].x, axes[0].y,
      axes[1].x, axes[1].y,
      origin.x * scale, origin.y * scale
    );
    sketch.scale(scale * 7, scale * 11);

    // draw the first number
    fontShapes.draw(sketch, number.charAt(0));

    // draw the second number if available.
    if (number.length > 1) {
      sketch.translate(6, 0);
      fontShapes.draw(sketch, number.charAt(1));
    }

    sketch.pop();
  }
}
