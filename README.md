CSS-Grid-Debugger
=================

A little console utility to make building grid-based designs easier

**April 2020:** 
- Rewrote the script to remove dependancies on jQuery and a css framework. 
- Columns are now rendered with [CSS Grid](https://www.w3schools.com/css/css_grid.asp).
- Added support for multiple breakpoints. (desktop, mobile, etc...)
- Refactored the way grid definitions are specified. Ditched data-attributes in favor of updating with a javascript object

## Designing with a grid system is great. Implementing the details can be hard

Even with CSS frameworks that have grid support, it's sometimes it's difficult to get the details right when building a complex design. This is especially true when dealing with responsive designs that need to work across multiple screen sizes. This lil' library provides some overlays to help make sure your designs are lining up to a vertical and horizontal grid. 

It has support for:

- overlaying a horizontal baseline grid (default 10px baseline)
- overlaying a vertical grid (default 12 columns with 20px gutters)

Check out the [demo page here](http://robby1066.github.io/CSS-Grid-Debugger/).

## Adding the script

Include the grid_debug.js script in your document. You will almost certainly need to override the defaults. you can do that immedately after including the script.

    <!-- include grid_debug.js anywhere in your document -->
    <script src="grid_debug.js"></script>

    <script>
        
        GRID.setBreakpoint('desktop', {
            'column-count': 8,
            'column-gutter': '40px',
            'column-margin': '60px',
            'baseline-height': '10px'
        });

        GRID.setBreakpoint('mobile', {
            'column-count': 4,
            'column-gutter': '20px',
            'column-margin': '20px',
            'baseline-height': '10px'
        });

        // Use mobile breakpoint when appropriate
        if (window.innerWidth < 999) {
            GRID.use('mobile');
        }

        // Show the grids when the page loads.
        GRID.columns();
        GRID.baseline();
    </script>
    
    
You can include this anywhere in your document.

### Setting default values for each breakpoint

There are a few configuration options you can set:

- *columncount* - the number of columns your grid system uses (default value == 12)
- *baselineheight* - A CSS-valid height for the grid. Remember to include px, %, or em units! (default value == '9px')
- *framework* - Which grid framework are you using. Currently Foundation 4 and Twitter Bootstrap are supported (options = ['foundation', 'bootstrap', 'bootstrap-fluid'] default value == 'foundation')

- *width* - Can use any valid units (default: '100%')
- *column-count* - How many columns are in your grid (default: 12),
- *column-gutter* - How wide should the gutter between columns be? (default: '20px')
- *column-margin* - Should there be a margin between the columns and the edges of the page? (default: '60px')
- *column-color* - What color should the columns be (default: '#ccc')
- *baseline-height* - What's the height of the baseline grid? (default: '10px')
- *baseline-color* - What color should the baseline grid lines be? (default:  '#d05800')
- *baseline-color-inverted* - When inverted, what color should the baseline grids be? (default: '#fff')

There are two ways to set default values for your environment:

#### Set the config values with Javascript (either in code or in the console)

    <script src="grid_debug.js"></script>
    <script>
        
        GRID.setBreakpoint('desktop', {
            'column-count': 8,
            'column-gutter': '40px',
            'column-margin': '60px',
            'baseline-height': '10px'
        });

        GRID.setBreakpoint('mobile', {
            'column-count': 4,
            'column-gutter': '20px',
            'column-margin': '20px',
            'baseline-height': '10px'
        });

    </script>

You can also set values in the Javascript console, but it's probably much easier to set these in code so you don't have to re-enter options over and over again as you refresh the pages.

## Usage

As you are working on your design, you can use the following commands from the console:

**GRID.baseline()** - overlay the baseline grid. You may optionally pass in a CSS-valid height for the grid (remember to include px, %, or em units). I

**GRID.columns()** - overlay the columns using your chosen grid framework

**GRID.clear()** - clear any overlays - called when the ESC key is pressed

**GRID.setBreakpoint(breakpoint, options)** - set values for a new or existing breakpoint. Any values you don't set will use the default values.

**GRID.use(breakpoint)** - select the breakpiont to use. The default is `desktop`, but you can define as many breakpoints as you like using `GRID.setBreakpoint`

### Keyboard shortcuts

When the grids are visible, you can **press ESC** to clear them. 

For the baseline grids, the following keyboard commands are available:

- **j key** - jog the grid up by one pixel at a time
- **k key** - jog the grid down by one pixel at a time
- **shift key** - invert the colors on the grid. Useful on dark backgrounds.

### More information

http://en.wikipedia.org/wiki/Grid_(graphic_design)

https://learncssgrid.com/

http://thinkingwithtype.com/grid/
