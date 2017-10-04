// This is the clocks-as-pixels clock
var clock09 = function(sketch) {
  sketch.setup = function() {
    sketch.angleMode(sketch.DEGREES);
    sketch.ellipseMode(sketch.CENTER);
  };
  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(177);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    drawTime(get12Hour(sketch.hour()).toString(), sketch.minute().toString(),sketch.second.toString());
    // drawTime("4","48", "0"); // Testing hour & minute as shown at http://cmuems.com/2016/60212/wp-content/uploads/2016/09/maeda-all.gif
  };

  // Copied from https://github.com/CodingTrain/12oclocks/pull/2/ by @FantasyTeddy
  // size parameter/argument added by @haideralipunjabi
  function drawCharacter(character, x, y, size) {
      let dots = font[character];
      for (let row = 0; row < dots.length; row++) {
        for (let col = 0; col < dots[row].length; col++) {
          if (dots[row][col] === 1)
            drawClock(x + (5*size) * col - (10*size), y + (5 * size) * row - (15 * size), 5*size, 5*size);
        }
      }
    }

  // By @haideralipunjabi
  function drawTime(hour, minute, second){
    // Prefixing 0 before minute < 10
    if(minute.length === 1) minute = "0" + minute;

    // Calculating multiplying factor to size of each dot, so that clock fills whole space.
    // Calculated by divinding availavle space(width) by required space (no. of cols * size of dot(5) )
    // No. of cols = (No. of characters * No. of cols of each character)   + Spaces in between characters + cols to leave before and after clock
    // Here, No. of characters = 5, No. of cols of each character = 5, Spaces in between characters = 4, cols to leave before and after = 6 (3 before & 3 after)

    size = sketch.width / (35 * 5);

    // Spacing between characters (Size of dot * calculated size)

    spacing = 5 * size;

    // For each character in hour, draw that character

    for (let i = 0; i < hour.length; i++){
       drawCharacter(hour[hour.length -1 - i], sketch.width/2 - (spacing * (i + 1) * 6), sketch.height/2,size);
    }
    // Draw the : in between hour and minute
    drawCharacter(":", sketch.width/2, sketch.height/2,size);

    // For each character in minute, draw that character
    for (let i = 0; i < minute.length; i++){
       drawCharacter(minute[i], sketch.width/2 + (spacing * (i+1) * 6) , sketch.height/2,size);
    }
  }
  function drawClock(x, y, w, h)
  {
    let hr = get12Hour(sketch.hour());
    let mn = sketch.minute();
    let sc = sketch.second();
  	let secondAngle = sketch.map(sc, 0, 60, 0, 360) - 90;
  	let minuteAngle = sketch.map(mn, 0, 60, 0, 360) -90;
    let hourAngle = sketch.map(hr % 12, 0, 12, 0, 360) -90;
    sketch.stroke(200);
    sketch.strokeWeight(w * 0.05);
    // Draw the inner cirle
    sketch.fill(255);
    sketch.ellipse(x,y,w * 0.95,h * 0.95);
    // Draw the arms / arcs
    sketch.push();
      sketch.noStroke();
      sketch.fill(0);
      sketch.translate(x,y);
      // Draw the hour arm
      sketch.push();
        sketch.rotate(hourAngle);
        sketch.triangle(0,0,0.2 * w,-0.02 * w, 0.2 * w,0.02 * w);
      sketch.pop();
      // Draw the minute arm
      sketch.push();
        sketch.rotate(minuteAngle);
        sketch.triangle(0,0,0.45 * w,-0.02 * w,0.45 * w,0.02 * w);
      sketch.pop();
      // Draw the second arm
      sketch.push();
        sketch.noFill();
        sketch.stroke(255,0,0);
        sketch.strokeWeight(w * 0.05);
        sketch.arc(0,0,w * 0.8,w * 0.8,secondAngle - 5, secondAngle + 5);
      sketch.pop();
    sketch.pop();
  }
  function get12Hour(hour)
  {
    if(hour === 0) return 12;
    return hour > 12 ? hour-12 : hour;
  }
};
