// This is the Conway's Game of Life clock

// In this clock, the current clock text is used to seed an
// instance of Conway's Game of Life.
// See wikipedia https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

var clock06 = function(sketch) {
  sketch.setup = function() {
    
  }

  sketch.draw = function() {
    if(sketch.GameOfLife === null || sketch.GameOfLife === undefined)
    {
      sketch.GameOfLife = {
        Speed:50,
        NextStep:-1,
        Instance: new GameOfLife(63, 30)
      };
    }

    // The simulation runs slower than the canvas draw speed.
    // So, we should only redraw the clock if the simulation has updated.
    if(sketch.GameOfLife.NextStep < sketch.millis())
    {
      // Update next run step
      sketch.GameOfLife.NextStep = sketch.millis() + sketch.GameOfLife.Speed;

      let grid = sketch.GameOfLife.Instance.GetGrid();
      let gridHeight = grid.length;
      let gridWidth = grid[0].length;

      // Places the clock text in the center of the grid.
      // 47 and 7 are magic numbers, for the width and height of the clock text. Doesn't change.
      let clockOffsetX = Math.floor((gridWidth - 47) / 2);
      let clockOffsetY = Math.floor((gridHeight - 7) / 2);

      var clockText = MakeClockText(sketch.hour(), sketch.minute(), sketch.second(), clockOffsetX, clockOffsetY);
      // Apply clock text to the simulation
      sketch.GameOfLife.Instance.EnableCells(clockText, true);
      // Step the simulation forward
      sketch.GameOfLife.Instance.Update();
      // Clear clock text from the simulation, for drawing purposes.
      sketch.GameOfLife.Instance.EnableCells(clockText, false);


      
      let cellWidth = sketch.width / gridWidth;
      let cellHeight = sketch.height / gridHeight;
      let cellSize = Math.min(cellWidth, cellHeight);
      // used for centering to the sketch
      let paddingX = (sketch.width - Math.floor(cellSize * gridWidth)) / 2;
      let paddingY = (sketch.height - Math.floor(cellSize * gridHeight)) / 2;
  
      // begin drawing
      sketch.background(31);
      sketch.fill(150,150,150);
      sketch.noStroke();
      // draw the current grid
      for(let y = 0; y < grid.length; y++)
      {
        for(let x = 0; x < grid[0].length; x++)
        {
          if(grid[y][x] === true)
          {
            
            sketch.rect(paddingX + Math.floor(cellSize*x + 1), 
                          paddingY + Math.floor(cellSize*y + 1), 
                          Math.floor(cellSize - 2), 
                          Math.floor(cellSize - 2));
          }
        }
      }

      // draw the clock text
      sketch.fill(255,255,1);
      sketch.ellipseMode(sketch.CORNER)
      for(let i = 0; i < clockText.length; i++)
      {
        sketch.ellipse(paddingX + Math.floor(clockText[i].x * cellSize), 
                        paddingY + Math.floor(clockText[i].y * cellSize), 
                        Math.floor((cellSize)-1), 
                        Math.floor((cellSize)-1));
      }
    }
  }

  function MakeClockText(hour, minute, second, offsetX, offsetY)
  {
    let vectors = new Array();
    //hours
    hour = hour % 12 === 0 ? 12 : hour % 12;
    if (hour >= 10) {
      vectors = vectors.concat(MakeCharacterText(Math.floor(hour/10), offsetX, offsetY));
    }
    offsetX += 5 + 1;
    vectors = vectors.concat(MakeCharacterText(hour % 10, offsetX, offsetY));

    //colon
    offsetX += 5 + 1;
    vectors = vectors.concat(MakeCharacterText(":", offsetX, offsetY));

    //minutes
    offsetX += 5 + 1;
    vectors = vectors.concat(MakeCharacterText(Math.floor(minute/10), offsetX, offsetY));
    offsetX += 5 + 1;
    vectors = vectors.concat(MakeCharacterText(minute % 10, offsetX, offsetY));

    //colon
    offsetX += 5 + 1;
    vectors = vectors.concat(MakeCharacterText(":", offsetX, offsetY));

    //seconds
    offsetX += 5 + 1;
    vectors = vectors.concat(MakeCharacterText(Math.floor(second/10), offsetX, offsetY));
    offsetX += 5 + 1;
    vectors = vectors.concat(MakeCharacterText(second % 10, offsetX, offsetY));

    return vectors;
  }

  function MakeCharacterText( char, offsetX, offsetY)
  {
    let vectors = new Array();
    let dots = font[char];

    for(let y=0; y < dots.length; y++)
      for(let x=0; x<dots[y].length; x++)
        if(dots[y][x] === 1)
          vectors.push(new p5.Vector(x + offsetX, y + offsetY));
    return vectors;
  }
}

var GameOfLife = (function () {
  /**
   * Constructor
   * @param {number} width In cells
   * @param {number} height In cells
   */
  function GameOfLife(width, height) {
    this.CellWidth = width;
    this.CellHeight = height;

    // The grids are two dimensional arrays of boolean values.
    // We need two, so that updating from one frame to the next doesn't cascade changes.
    // Also, it's nice to reuse the same grids, since it can be pretty memory heavy
    // if the grid is particularly big.
    this.gridFront = new Array();
    this.gridBack = new Array();
    for(var y = 0; y < this.CellHeight; y++)
    {
      this.gridFront[y] = new Array();
      this.gridBack[y] = new Array();
      for(var x=0; x < this.CellWidth; x++)
      {
        this.gridFront[y][x] = false;
        this.gridBack[y][x] = false;
      }
    }
  }

  /**
   * Fetches the current grid
   */
  GameOfLife.prototype.GetGrid = function () {
    return this.gridFront;
  };

  /**
   * Step the simulation forward
   */
  GameOfLife.prototype.Update = function () {
    // Flip the front and back layers
    let temp = this.gridFront;
    this.gridFront = this.gridBack;
    this.gridBack = temp;

    let neighborCount = 0;
    for(let y=0; y<this.CellHeight; y++)
    {
      for(let x=0; x<this.CellWidth; x++)
      {
        neighborCount = this.CountLiveNeighbors(x, y, this.gridBack);
        if(neighborCount === 3 || (neighborCount === 2 && this.gridBack[y][x] === true ))
        {
          this.gridFront[y][x] = true;
        }
        else
          this.gridFront[y][x] = false;
      }
    }
  };

  /**
   * Counts the neighbors (including corners), not including self
   * @param {number} x X position
   * @param {number} y Y position
   * @param {boolean[][]} grid Grid to target
   */
  GameOfLife.prototype.CountLiveNeighbors = function(x, y, grid)
  {
    let liveNeighbors = 0;

    if(x >= 0 && 
        x < this.CellWidth &&
        y >= 0 && 
        y < this.CellHeight)
    {
      row_min = Math.max(0, x - 1);
      row_max = Math.min(this.CellWidth-1, x + 1);
      col_min = Math.max(0, y - 1);
      col_max = Math.min(this.CellHeight-1, y + 1);

      for (nY = col_min; nY <= col_max; nY++) 
      {
        for (nX = row_min; nX <= row_max; nX++) 
        {
          if ((nX !== x || nY !== y) && grid[nY][nX] === true)
          {
            liveNeighbors++;
          }
        }
      }
    }

    return liveNeighbors;
  };


  /**
   * Change state of target cells
   * @param {p5.Vector[]} cells Cells to be changed
   * @param {boolean} isLive Whether to set as alive, or dead
   */
  GameOfLife.prototype.EnableCells = function (cells, isLive) {
    for(let i = 0; i < cells.length; i++)
    {
      if(cells[i].x >= 0 && 
          cells[i].x < this.CellWidth &&
          cells[i].y >= 0 && 
          cells[i].y < this.CellHeight)
      {
        this.gridFront[cells[i].y][cells[i].x] = isLive;
      }
    }
  };

  return GameOfLife;
}());