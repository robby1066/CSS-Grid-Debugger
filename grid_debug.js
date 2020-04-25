// grid debug utilities
// little utility to overlay a vertical and horizontal grid over your page layout to make sure everything is lining up

var GRID = {
  'defaults': {  // this 
      'width': '100%',
      'column-count': 12,
      'column-gutter': '20px',
      'column-margin': '60px',
      'column-color': '#ccc',
      'baseline-height': '10px',
      'baseline-color':  '#d05800',
      'baseline-color-inverted': '#fff'
  },
  'breakpoints': {
      'desktop': {}, // will just inherit from defaults unless anything is set
      'mobile': {} 
      // new breakpoint scan be added with `GRID.setBreakpoint`
  },
  'current_breakpoint': 'desktop',

  'css': [
      'DIV.grid-debug { position: fixed; width: 100%; height: 100%;  top: 0; left: 0; right: 0; margin: auto;  z-index: 10000; pointer-events: none; }',
      'DIV.grid-debug-row, DIV.grid-debug DIV.grid-debug-column, DIV.grid-debug-container { height: 100%; }',
      'DIV.vertical-baseline-row { border-bottom: 1px solid BASELINECOLOR; opacity: 0.4; box-sizing:border-box; }',
      'DIV.grid-debug.inverted DIV.vertical-baseline-row { border-bottom: 1px solid BASELINECOLORINVERTED; }',
      'DIV.vertical-baseline-row:hover { opacity: 1 }',
      'DIV#column-grid-debug { display: grid; grid-template-columns: repeat(COLUMNCOUNT, 1fr); grid-column-gap: COLUMNGUTTER; padding: 0 COLUMNMARGIN; width: calc(WIDTH - COLUMNMARGINDOUBLED); }',
      'DIV.grid-debug DIV.grid-debug-column { background: COLUMNCOLOR; opacity: 0.2; height: 100%; overflow: hidden; }',
  ],
  'columns': function() {
      var columncount = this.getValue('column-count');

      document.body.innerHTML+= '<div id="column-grid-debug" class="grid-debug"></div>';
          
      var grid_container = document.getElementById('column-grid-debug');
    
      for(var i=0;i<columncount;i++){
          grid_container.innerHTML+='<div class="grid-debug-column"><div>&nbsp;</div></div>';
      }
      this.initCss();
      this.initKeystrokes();
  },
  'baseline': function() {
      var baselineheight = this.getValue('baseline-height');
      document.body.innerHTML+= '<div id="baseline-grid-debug" class="grid-debug"></div>';
      
      var grid_container = document.getElementById('baseline-grid-debug');
      for(var i=0;i<150;i++){
          grid_container.innerHTML+='<div class="vertical-baseline-row" style="height: '+ baselineheight +'"></div>';
      }
      this.initCss();
      this.initKeystrokes();
  },
  // set up some keystroke actions to deal with the grid
  // shift key inverts the colors
  // up arrow moves baseline up one pixel
  // down arrow moves baseline down one pixel
  // esc key clears the grid
  'initKeystrokes': function() {
      // bind some keyboard shortcuts to the document to jog the grid up and down if you only care about how the grid applies to a single section
      document.addEventListener('keydown', this.handleKeypress);
  },
  'handleKeypress': function(event) {
      var baseline_grid_container = document.getElementById('baseline-grid-debug'),
          column_grid_container = document.getElementById('column-grid-debug');
      
      if (baseline_grid_container != null) {
        var top = Number(baseline_grid_container.style.top.replace('px', ''));
        
        if (event.keyCode == 74) {
          // shift grid down
          baseline_grid_container.style.top = (top - 1) + 'px'
        } else if (event.keyCode == 75) {
          // shift grid up
          baseline_grid_container.style.top = (top + 1) + 'px'
        } else if (event.keyCode == 16) {
          // shift key pressed, invert baseline colors
          baseline_grid_container.classList.toggle('inverted');
        }
      }
      
      if (event.keyCode == 27) {
        // ESC key clears everything
        GRID.clear();
      }
  },
  'initCss': function() {
      var debug_css = document.getElementById('grid-debug');
      if (debug_css == null) {
          let parsed_css = GRID.css.join(' ');
          
          parsed_css = parsed_css.replace('WIDTH', this.getValue('width'));
          parsed_css = parsed_css.replace('COLUMNCOUNT', this.getValue('column-count'));
          parsed_css = parsed_css.replace('COLUMNGUTTER', this.getValue('column-gutter'));
          parsed_css = parsed_css.replace('COLUMNMARGIN', this.getValue('column-margin'));
          parsed_css = parsed_css.replace('COLUMNCOLOR', this.getValue('column-color'));
          parsed_css = parsed_css.replace('BASELINEHEIGHT', this.getValue('baseline-height'));
          parsed_css = parsed_css.replace('BASELINECOLOR', this.getValue('baseline-color'));
          parsed_css = parsed_css.replace('BASELINECOLORINVERTED', this.getValue('baseline-color-inverted'));

          // set the width of 'COLUMNMARGINDOUBLED' to twice column margin
          var cm = this.getValue('column-margin');
          var cm_unit = '';
          if (cm.match(/\D+$/i) !== null) {
              cm_unit = cm.match(/\D+$/i)[0];
          }
          var cm_value = Number(cm.replace(cm_unit, ''));
          var cm_value_x2 = cm_value * 2;
          var cm_x2 = cm_value_x2 + cm_unit;
          parsed_css = parsed_css.replace('COLUMNMARGINDOUBLED', cm_x2);

          
          document.head.innerHTML+= '<style id="grid-debug">'+ parsed_css + '</style>';
      }
  },
  // get a value from a data attribute with a fallback to the default value
  'getValue': function(key) {
      // look for a value with the current breakpoint
      var val = null;
      if (typeof(this.breakpoints[this.current_breakpoint][key]) != 'undefined') {
          val = this.breakpoints[this.current_breakpoint][key];
      } else {
          val = this.defaults[key];
      }
      
      if (val === null) {
          console.log("ERROR: Could not get a value for " + key);
      }
      return val;
  },
  'clear': function() {
      document.querySelectorAll('DIV.grid-debug').forEach(function(element) {
          element.parentNode.removeChild(element);
      });
      document.removeEventListener('keydown', this.handle_keypress);

      document.querySelectorAll('HEAD STYLE#grid-debug').forEach(function(element) {
          element.parentNode.removeChild(element);
      });
  },
  'setBreakpoint': function(breakpoint, properties) {
      this.breakpoints[breakpoint] = properties;
  },
  'use': function(breakpoint) {
      // don't set to a non-existent breakpoint
      if (typeof(this.breakpoints[breakpoint]) !== 'undefined') {
          this.current_breakpoint = breakpoint;
      }
  },
  'info': function() {
      console.log("CSS GRID DEBUGGER IS LOADED:");
      console.log("- Set config variables to match your design (see GRID.defaults)");
      console.log("- Call GRID.baseline() to show the baseline grid");
      console.log("- Call GRID.columns() to show the vertical grid (make sure you have the correct CSS framework defined before doing that!)");
      console.log("- see https://github.com/robby1066/CSS-Grid-Debugger for more info");
  }
}