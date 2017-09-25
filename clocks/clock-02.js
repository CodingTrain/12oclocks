// This is the overlaid circles clock
var clock02 = function(sketch) {
  sketch.setup = function() {

  }

  sketch.draw = function() {
    let strokeWeight = 2;
    let radius = 15;
    sketch.background(0);
    sketch.fill(255);

    // set up current working area
    // the clock is 11 cells wide by 7 cells tall
    if(sketch.width / sketch.height > 11/7)
    {
      // restrict based on height
      // make the sketch have 10 cells of height (7 for the clock, 3 for edge padding) 
      radius = sketch.height / 10; 
    }
    else{
      // restrict based on width
      // make the sketch have 14 cells of width (11 for the clock, 3 for edge padding) 
      radius = sketch.width / 14; 
    }
    if(radius < 15)
      strokeWeight = 1;

    let centerX = sketch.width/2 + radius/2;
    let centerY = sketch.height/2 + radius/2;
    sketch.strokeWeight(strokeWeight);
    sketch.ellipseMode(sketch.CENTER);
    DrawHour(sketch, sketch.hour(), centerX, centerY, radius, strokeWeight);
    DrawMinute(sketch, sketch.minute(), centerX, centerY, radius, strokeWeight);
    DrawSecond(sketch, sketch.second(), centerX, centerY, radius, strokeWeight);
  }
  /**
   * Draw the hour value.  If the hour is less than 10, then the value will be centered.
   * 
   * @param {p5} sketch Current sketch
   * @param {number} hour Target value
   * @param {number} centerX Current center offset for x
   * @param {number} centerY Current center offset for y
   * @param {number} cellWidth Width for a single dot to occupy
   * @param {number} strokeWidth Current strokeWidth, used for padding 
   */
  function DrawHour(sketch, hour, centerX, centerY, cellWidth, strokeWidth)
  {
    hour = hour%12;
    let ones = hour%10;
    sketch.stroke(255,0,0);
    sketch.noFill();
    if(hour>=10)
    {
      let tens = Math.floor(hour/10);
      DrawCharacter(sketch, tens, centerX - (cellWidth * 5.5), centerY - Math.floor((cellWidth * 7)/2), cellWidth, cellWidth);
      DrawCharacter(sketch, ones, centerX + (cellWidth/2), centerY - Math.floor((cellWidth * 7)/2), cellWidth, cellWidth);
    }
    else
    {
      DrawCharacter(sketch, ones, Math.floor((centerX - (cellWidth * 5 / 2))), centerY - Math.floor((cellWidth * 7)/2), cellWidth, cellWidth);
    }
  }

  /**
   * Draw the minute value.
   * 
   * @param {p5} sketch Current sketch
   * @param {number} minute Target value
   * @param {number} centerX Current center offset for x
   * @param {number} centerY Current center offset for y
   * @param {number} cellWidth Width for a single dot to occupy
   * @param {number} strokeWidth Current strokeWidth, used for padding 
   */
  function DrawMinute(sketch, minute, centerX, centerY, cellWidth, strokeWidth)
  {
    let ones = minute%10;
    let tens = Math.floor(minute/10);
    sketch.stroke(255,255,0);
    sketch.noFill();

    DrawCharacter(sketch, tens, centerX - (cellWidth * 5.5), centerY - Math.floor((cellWidth * 7)/2), cellWidth, cellWidth-(strokeWidth*3));
    DrawCharacter(sketch, ones, centerX + (cellWidth/2), centerY - Math.floor((cellWidth * 7)/2), cellWidth, cellWidth-(strokeWidth*3));
  }

  /**
   * Draw the minute value.
   * 
   * @param {p5} sketch Current sketch
   * @param {number} second Target value
   * @param {number} centerX Current center offset for x
   * @param {number} centerY Current center offset for y
   * @param {number} cellWidth Width for a single dot to occupy
   * @param {number} strokeWidth Current strokeWidth, used for padding 
   */
  function DrawSecond(sketch, second, centerX, centerY, cellWidth, strokeWidth)
  {
    let ones = second%10;
    let tens = Math.floor(second/10);
    sketch.stroke(0,0,255);
    sketch.noFill();

    DrawCharacter(sketch, tens, centerX - (cellWidth * 5.5), centerY - Math.floor((cellWidth * 7)/2), cellWidth, cellWidth -(strokeWidth*6));
    DrawCharacter(sketch, ones, centerX + (cellWidth/2), centerY - Math.floor((cellWidth * 7)/2), cellWidth, cellWidth -(strokeWidth*6));
  }
/**
 * 
 * 
 * @param {p5} sketch Current sketch
 * @param {number|string} char The SINGLE CHARACTER to draw
 * @param {number} offsetX Current offset for x
 * @param {number} offsetY Current offset for y
 * @param {number} cellWidth Width for a single dot to occupy
 * @param {number} radius Current strokeWidth, used for padding 
 */
  function DrawCharacter(sketch, char, offsetX, offsetY, cellWidth, radius)
  {
    let dots = font[char];
    for(let y = 0; y < dots.length; y++)
      for(let x = 0; x < dots[y].length; x++)
        if(dots[y][x] === 1)
          sketch.ellipse(x*cellWidth + offsetX, y*cellWidth + offsetY, radius);
  }
}
