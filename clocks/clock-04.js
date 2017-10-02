// This is the pixelated clock with colourized history
var clock04 = function(sketch) {
  let clock = [];
  let baseWidth = 400;

  let numTimes = 25;

  let charWidthBase = 5;
  let charHeightBase = 5;
  let skewBase = 1.5;

  let idx = numTimes - 1;

  for (let i = 0; i < numTimes; i++) {
    clock.push(null);
  }

  sketch.draw = function() {
    catchUp();

    sketch.background(0);

    let scale = sketch.width / baseWidth;

    let charWidth = charWidthBase * scale;
    let charHeight = charHeightBase * scale;
    let skew = skewBase * scale;

    sketch.colorMode(sketch.HSB);


    // Translate so the clock ends up in the right spot
    let translateX = (sketch.width/2 - 25.5 * charWidth) + 2 * numTimes * charWidth;
    let translateY = (sketch.height/2 - 7 * charHeight) - 2 * numTimes * charHeight;
    sketch.translate(translateX, translateY);
    for (let i = idx + 1; i <= idx + clock.length; i++) {
      let j = i % clock.length;
      if (clock[j]) {
        let last = j === idx;
        drawClock(clock[j], charWidth, charHeight, skew, last);
      }
      sketch.translate(-2 * charWidth, 2 * charHeight);
    }
  }

  function drawClock(t, charWidth, charHeight, skew, last) {
    sketch.push()
    let timeString = t.h + ":" + pad(t.m) + ":" + pad(t.s);

    // If hour is a single digit;
    // translate by 1 char before starting
    if (t.h < 10) {
      sketch.translate(6 * charWidth, 6 * skew);
    }

    if (last) {
      sketch.stroke(0, 0, 100);
    } else {
      sketch.stroke(t.hue, 100, 100);
    }
    sketch.strokeWeight(1.25);
    sketch.noFill();
    for(let i = 0; i < timeString.length; i++) {
      drawCharacter(timeString[i], charWidth, charHeight, skew);
      sketch.translate(6 * charWidth, 5.5 * skew);
    }
    sketch.pop();
  }

  function drawCharacter(c, charWidth, charHeight, skew) {
    let cMatrix = font[c];
    let x = 0;
    let y = 0;
    for (let r = 0; r < cMatrix.length; r++) {
      let row = cMatrix[r];
      let firstY = y;
      for (let col = 0; col < row.length; col++) {
        if (row[col] == 1) {
          sketch.beginShape();
            sketch.vertex(x, y);
            sketch.vertex(x + charWidth, y + skew);
            sketch.vertex(x + charWidth, y + charHeight + skew);
            sketch.vertex(x, y + charHeight);
          sketch.endShape(sketch.CLOSE);
        }
        x += charWidth;
        y += skew;
      }
      y = firstY + charHeight;
      x = 0;
    }
  }

  function pad(num) {
    let n = num.toString();
    if (n.length == 2) {
      return n;
    } else {
      return "0"+n;
    }
  }

  function getTime() {
    let rightNow = {
      h: sketch.hour() % 12 === 0 ? 12 : sketch.hour() % 12,
      m: sketch.minute(),
      s: sketch.second(),
    };
    return rightNow;
  }

  function tick(t) {
    let newT;
    if (t === null) {
      newT = getTime();
      newT.hue = 5 * Math.floor(sketch.random(360 / 5));
    } else {
      // Returns time t + 1 second
      // And assigns the correct hue
      newT = {
        s: t.s + 1,
        m: t.m,
        h: t.h,
        hue: (t.hue + 5) % 360
      };
    }

    if (newT.s == 60) {
      newT.s = 0;
      newT.m += 1;
    }

    if (newT.m == 60) {
      newT.m = 0;
      if(newT.h === 12) {
        newT.h = 1;
      } else {
        newT.h = newT.h + 1;
      }
    }

    return newT;
  }

  function timeEquals(time1, time2) {
    if (time1 === time2) {
      return true;
    } else if(!time1 || !time2) {
      return false;
    } else {
      return time1.s === time2.s && time1.m === time2.m && time1.h === time2.h;
    }
  }

  function catchUp() {
    let time = getTime();
    let lastTime = clock[idx];
    // TODO: This could run up to 12 * 60 * 60 times... if someone leaves this
    // open for more than 24 hours. Testing seems to suggest this is not that
    // problematic.
    while (!timeEquals(time, lastTime)) {
      lastTime = tick(lastTime);
      idx = (idx + 1) % numTimes;
      clock[idx] = lastTime;
    }
  }
}
