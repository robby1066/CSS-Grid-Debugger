// grid debug utilities
// little utility to overlay a vertical and horizontal grid over your page layout to make sure everything is lining up

// Foundation Grid Debug
// overlay columns(#) rows on top of your design
// 'columns' should match the total number of columns your grid allows for (default 12)

// there should be some cooresponding CSS somewhere that looks like this:
//
// DIV.grid-debug {
//   position: fixed; width: 100%; height: 100%;  top: 0; left: 0;  z-index: 10000;
// }
// DIV.grid-debug DIV.row, DIV.grid-debug DIV.columns {
//   height: 100%;
// }
// DIV.grid-debug DIV.columns DIV {
//   background: #ccc; opacity: 0.2; height: 100%;
// }
// DIV.vertical-baseline-row {
//   border-bottom: 1px solid #d05800; opacity: 0.4;
// }
// DIV.grid-debug.inverted DIV.vertical-baseline-row {
//   border-bottom: 1px solid #fff;
// }

var GRID = {
  'defaults': {
    'columncount': 12,
    'baselineheight': '9px',
    'framework': 'foundation'
  },
  'css': {
    'div-grid-debug': 'position: fixed; width: 100%; height: 100%;  top: 0; left: 0;  z-index: 10000;',
    'column-height': 'height: 100%;',
    'column-style': 'background: #ccc; opacity: 0.2; height: 100%;',
    'baseline-row-styles': 'border-bottom: 1px solid #d05800; opacity: 0.4; margin-bottom: -1px;',
    'inverted-baseline-row-styles': 'border-bottom: 1px solid #fff; opacity: 0.4; margin-bottom: -1px;'
  },
  'columns': function(columncount, framework) {
    if (typeof(columncount) == 'undefined') {
      columncount = this.get_value('columncount');
    }
    if (typeof(framework) == 'undefined') {
      framework = this.get_value('framework');
    }
    
    if (framework == 'foundation') {
      var column_class="large-1 small-1 columns",
          row_class="row",
          container_class = "";
    } else if (framework == 'bootstrap') {
      var column_class="span1",
          container_class = "container",
          row_class="row";
    } else if (framework == 'bootstrap-fluid') {
      var column_class="span1",
          row_class="row-fluid",
          container_class = "container-fluid";
    }
    
    jQuery('body').append('<div id="column-grid-debug" class="grid-debug" style="'+ this.css['div-grid-debug'] +'"><div class="'+ container_class +'" style="'+ this.css['column-height'] +'"><div class="'+ row_class +'" style="'+ this.css['column-height'] +'"></div></div></div>');
    
    var grid_container = jQuery('DIV#column-grid-debug DIV.'+row_class);
    
    for(var i=0;i<columncount;i++){
      jQuery(grid_container).append('<div class="'+ column_class +'" style="'+ this.css['column-height'] +'"><div style="'+ [this.css['column-height'], this.css['column-style']].join(' ') +'"></div></div>');
    }
    
    this.init_keystrokes();
  },
  'baseline': function(baselineheight) {
    if (typeof(baselineheight) == 'undefined') {
      baselineheight = this.get_value('baselineheight');
    }
    jQuery('body').append('<div id="baseline-grid-debug" class="grid-debug" style="'+ this.css['div-grid-debug'] +'"></div>');
    
    var grid_container = jQuery('DIV#baseline-grid-debug');
    for(var i=0;i<150;i++){
      jQuery(grid_container).append('<div class="vertical-baseline-row" style="'+ ['height: '+ baselineheight+';', this.css['baseline-row-styles']].join(' ') +'"></div>');
    }
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
        
        if (event.keyCode == 38) {
          // shift grid down
          jQuery(baseline_grid_container).css('top', (top - 1) + 'px');
        } else if (event.keyCode == 40) {
          // shift grid up
          // console.log((top--) + 'px');
          jQuery(baseline_grid_container).css('top', (top + 1) + 'px');
        } else if (event.keyCode == 16) {
          // shift key pressed, invert baseline colors
          jQuery(grid_container).toggleClass('inverted');
        }
      }
      
      if (event.keyCode == 27) {
        // ESC key clears baseline
        GRID.clear();
      }
    });
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