// grid debug utilities
// little utility to overlay a vertical and horizontal grid over your page layout to make sure everything is lining up

var GRID = {
  'defaults': {
    'columncount': 12,
    'baselineheight': '9px',
    'framework': 'foundation' // currently supported: ['foundation','bootstrap','bootstrap-fluid']
  },
  'css': [
    'DIV.grid-debug { position: fixed; width: 100%; height: 100%;  top: 0; left: 0;  z-index: 10000; }',
    'DIV.grid-debug-row, DIV.grid-debug DIV.grid-debug-column, DIV.grid-debug-container { height: 100%; }',
    'DIV.grid-debug DIV.grid-debug-column DIV { background: #ccc; opacity: 0.2; height: 100%; }',
    'DIV.vertical-baseline-row { border-bottom: 1px solid #d05800; opacity: 0.4; margin-bottom: -1px; }',
    'DIV.grid-debug.inverted DIV.vertical-baseline-row { border-bottom: 1px solid #fff; }',
    'DIV.vertical-baseline-row:hover { opacity: 1 }'
  ],
  'columns': function() {
    var columncount = this.get_value('columncount');
    
    switch(this.get_value('framework')) {
      case 'foundation':
        var column_class="large-1 small-1 columns", row_class="row", container_class = "";
        break;
      case 'bootstrap':
        var column_class="span1", container_class = "container", row_class="row";
        break;
      case 'bootstrap-fluid':
        var column_class="span1", row_class="row-fluid", container_class = "container-fluid";
        break;
    }
    
    jQuery('body').append('<div id="column-grid-debug" class="grid-debug"><div class="'+ container_class +' grid-debug-container"><div class="'+ row_class +' grid-debug-row"></div></div></div>');
    
    var grid_container = jQuery('DIV#column-grid-debug DIV.grid-debug-row');
    
    for(var i=0;i<columncount;i++){
      jQuery(grid_container).append('<div class="'+ column_class +' grid-debug-column"><div></div></div>');
    }
    this.init_css();
    this.init_keystrokes();
  },
  'baseline': function() {
    var baselineheight = this.get_value('baselineheight');

    jQuery('body').append('<div id="baseline-grid-debug" class="grid-debug"></div>');
    
    var grid_container = jQuery('DIV#baseline-grid-debug');
    for(var i=0;i<150;i++){
      jQuery(grid_container).append('<div class="vertical-baseline-row" style="height: '+ baselineheight +'"></div>');
    }
    this.init_css();
    this.init_keystrokes();
  },
  // set up some keystroke actions to deal with the grid
  // shift key inverts the colors
  // up arrow moves baseline up one pixel
  // down arrow moves baseline down one pixel
  // esc key clears the grid
  'init_keystrokes': function() {
    // bind some keyboard shortcuts to the document to jog the grid up and down if you only care about how the grid applies to a single section
    jQuery(document).bind('keydown', function(event) { 
      var baseline_grid_container = jQuery('DIV#baseline-grid-debug'),
          column_grid_container = jQuery('DIV#column-grid-debug');
      
      if (baseline_grid_container.length == 1) {
        var top = Number(jQuery(baseline_grid_container).css('top').replace('px', ''));
        
        if (event.keyCode == 187) {
          // shift grid down
          jQuery(baseline_grid_container).css('top', (top - 1) + 'px');
        } else if (event.keyCode == 189) {
          // shift grid up
          jQuery(baseline_grid_container).css('top', (top + 1) + 'px');
        } else if (event.keyCode == 16) {
          // shift key pressed, invert baseline colors
          var baselineheight = GRID.get_value('baselineheight');
          jQuery(baseline_grid_container).toggleClass('inverted');
        } else {
          console.log(event.keyCode);
        }
      }
      
      if (event.keyCode == 27) {
        // ESC key clears everything
        GRID.clear();
      }
    });
  },
  'init_css': function() {
    var debug_css = jQuery('HEAD STYLE#grid-debug');
    if (debug_css.length == 0) {
      jQuery('HEAD').append(function() {
        return '<style id="grid-debug">'+ GRID.css.join(' ') + '</style>';
      })
    }
  },
  // get a value from a data attribute with a fallback to the default value
  'get_value': function(key) {
    var this_script = jQuery('SCRIPT[src$="grid_debug.js"]');
    var val = this.defaults[key];
    if (this_script.length == 1) {
      val = this_script.data(key) || val;
    }
    return val;
  },
  'clear': function() {
    jQuery('DIV.grid-debug').remove();
    jQuery(document).unbind('keydown');
  }
}