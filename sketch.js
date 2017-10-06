window.addEventListener('load', function() {
  var container = document.getElementById('container');
  var selected_clock = null;
  // Commits not to be used for ascertaining authorship
  var ignored_commits = [
    "a0eeb36461f61cfae0eaed308a1126bba62dbc7b",
    "0cdd085ccfcfe0d47f90b46a5aafd7bd21e8b97b",
    "2db7cf53228ccaa0a26741bb3790eacad5c5c444"
  ];

  var clocks = new Array(12).fill(0).map(function(_, i) {
    i++;
    var rendersEveryFrame = [1, 3, 6, 7, 8, 11].indexOf(i) >= 0;
    if (i < 10) {
      i = "0" + i
    } else {
      i = "" + i;
    }
    var id = "clock-" + i;
    var clock_container = document.getElementById(id);
    clock_container.addEventListener('click', change_hash.bind(null, id));
    return {
      container: clock_container,
      fn: window["clock" + i],
      id: id,
      rendersEveryFrame: rendersEveryFrame,
    }
  });

  clocks.forEach(function(data) {
    data.p5 = new p5(function(sketch) {
      // add the hour12 method to the sketch object
      sketch.hour12 = function() {
        let h = sketch.hour() % 12;
        return (h == 0 ? 12 : h);
      }
      data.over = false;
      // Original sketch
      data.fn(sketch);
      // Override setup
      var old_setup = sketch.setup || function() {};
      sketch.setup = function() {
        // Grab canvas element
        var canvas = sketch.createCanvas(100, 100);
        canvas.mouseOver(function(){
          data.over = true;
        }).mouseOut(function(){
          data.over=false
        });
        data.canvas = canvas.elt;
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
    var overContainer = container.classList.contains('single');
    clocks.forEach(function(data){
      if (data.over){
        overContainer = true;
        return;
      }
    });
    clocks.forEach(function(data) {
       if((data.over || data.container.classList.contains('selected'))
          || (!overContainer && (data.rendersEveryFrame || must_redraw))) {
        // Note that frameCount is broken in p5.js version 0.5.14
        // See https://github.com/processing/p5.js/issues/2192
        data.p5.frameCount += 1;
        data.p5.redraw();
      }
    });
    if (!overContainer) {
      must_redraw = false;
    }
    window.requestAnimationFrame(animate);
  }
  window.requestAnimationFrame(animate);

  function change_hash(hash_fragment) {
    if(window.location.hash === "#" + hash_fragment) {
      window.location.hash = "";
    } else {
      window.location.hash = hash_fragment;
    }
  }

  window.addEventListener('hashchange', on_hash_change);

  function on_hash_change() {
    var found = clocks.reduce(function(acc, data) {
      if(window.location.hash === "#" + data.id) {
        return data;
      }
      return acc;
    }, null);
    select_clock(found);
  }

  on_hash_change();

  function select_clock(clock_data) {
    selected_clock = clock_data;
    clocks.forEach(function(data) {
      data.container.classList.remove('selected');
    });
    if(clock_data === null) {
      container.classList.remove('single');
      clocks.forEach(function(data) {
        data.p5.resize();
      });
    } else {
      clock_data.container.classList.add('selected');
      container.classList.add('single');
      clock_data.p5.resize();
      update_contributors(clock_data);
    }
  }

  function update_contributors(clock_data) {
    refresh_contributors_gui();
    if (!clock_data.contributors) {
      fetch("https://api.github.com/repos/CodingTrain/12oclocks/commits?path=clocks/" + clock_data.id + ".js")
        .then(function(r) {
          return r.json();
        })
        .then(function(commits) {
          clock_data.contributors = commits.reverse().reduce(function(acc, commit) {
            // Don't include the original commit
            if(ignored_commits.indexOf(commit.sha) >= 0) {
              return acc;
            }
            if(acc.map(function(author) {
              return author.id;
            }).indexOf(commit.author.id) < 0) {
              acc.push(commit.author);
            }
            return acc;
          }, []);
          refresh_contributors_gui();
        });
    }
  }

  function refresh_contributors_gui() {
    var list = document.getElementById("contributor-list");
    while(list.firstChild) {
      list.removeChild(list.firstChild);
    }
    if(!selected_clock.contributors) {
      // TODO: Loading menu?
    } else {
      selected_clock.contributors.forEach(function(author) {
        var elem = document.createElement('li');
        var a = document.createElement('a');
        a.href = author.html_url;
        a.target = "_blank";
        a.innerHTML = author.login;
        elem.appendChild(a);
        list.appendChild(elem);
      });
    }
  }
});
