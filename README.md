CSS-Grid-Debugger
=================

A little console utility to make building grid-based designs easier

## Designing with a grid system is great. Implementing the details can be hard

CSS frameworks like Foundation and Twitter Bootstrap (among others) make building layouts with a well-defined grid system easy. Even with these powerful tools, it's sometimes it's a bit difficult to translate complex designs to a functional HTML version. It's easy for the details to get missed, espectially when dealing with responsive designs that need to work across multiple screen sizes. This library provides some overlays to help make sure your designs are lining up to a vertical and horizontal grid. It has support for horizontal baseline grids (default 9px baseline), and vertical grids (currently Foundation and Twitter Bootstrap supported).

Check out the [demo page here](http://robby1066.github.io/CSS-Grid-Debugger/).

## Adding the script

Include the grid_debug.js script in your document. If you need to override the defaults, you can pass them using data attributes in the script tag.

    <!-- include grid_debug.js anywhere in your document -->
    <script src="grid_debug.js" data-columns=12 data-baselineheight="18px" data-framework='foundation'></script>
    
You can include this anywhere in your document.

### Setting default values

There are a few configuration options you can set:

- *columncount* - the number of columns your grid system uses (default value == 12)
- *baselineheight* - A CSS-valid height for the grid. Remember to include px, %, or em units! (default value == '9px')
- *framework* - Which grid framework are you using. Currently Foundation 4 and Twitter Bootstrap are supported (options = ['foundation', 'bootstrap', 'bootstrap-fluid'] default value == 'foundation')

There are two ways to set default values for your environment:

#### Data Attributes on the script tag

    <script src="path/to/grid_debug.js" data-columns=12 data-baselineheight="18px" data-framework='foundation'></script>

**Note:** the data attribute detection relies on the file name ending with "grid_debug.js". If you're using a system that compiles multiple files into a single file, this won't work for you.   

#### Set the config values with Javascript (in code or in the console)

    <script src="grid_debug.js"></script>
    <script>
      GRID.defaults.columncount = 8;
      GRID.defaults.baselineheight = '2em';
      GRID.defaults.framework = 'bootstrap-fluid';
    </script>

It's probably much easier to set these in code rather than in the console. That way, you won't have to enter options over and over again as you refresh the pages.

#### Set the values directly from the commands in the console

    GRID.columns(16);
    GRID.baseline('1em');

## Usage

As you are working on your design, you can use the following commands from the console:

**GRID.baseline(grid_height)** - overlay the baseline grid. You may optionally pass in a CSS-valid height for the grid (remember to include px, %, or em units). I

**GRID.columns(column_count)** - overlay the columns using your chosen grid framework

**GRID.clear()** - clear any overlays

### Keyboard shortcuts

When the grids are visible, you can press ESC to clear them. For the baseline grids, the following keyboard commands are available:

- **up arrow** - jog the grid up by one pixel at a time
- **down arrow** - jog the grid down by one pixel at a time
- **shift key** - invert the colors on the grid. Useful on dark backgrounds.

### More information

http://en.wikipedia.org/wiki/Grid_(graphic_design)

http://www.thegridsystem.org/
