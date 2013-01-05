Simple pie chart drawer
======

I needed something like this recently. Since I couldn't find anything that worked good enough I decided to create my own script to draw simple animated pie charts.

The pie charts are created using pure css (thanks to this [CSS3 Pie Chart article from Atomic Noggin](http://atomicnoggin.ca/blog/2010/02/20/pure-css3-pie-charts/).) and animated with css `transition` and `transform`. A simple js function automates it and makes it easy to customize.

Usage
------

Use the `pieChart` object containing the pie chart drawing functions (either include the js file or copy the code itself in your own files). Include the css file (or paste its contents where you need them)

To define a pie chart you use an array containing all desired pieces. Each piece is itslef an array depicting fill degrees and color.

    var piePieces = [
      [ 30, '#f0a' ],
      [ 15, 'lime' ],
      [ 60, 'rgba(100,0,255,0.8)' ],
      [ 120, 'red' ],
      [ 90, '#fc3' ],
    ];

* any color definition is ok (random one will be generated if none specified)
* fill degrees may not add up to 360 which will result in a partial chart
* fill degrees may exceed 360 in total but it will make the chart overlap itself
* a piece spanning over 90 degrees will be split into smaller ones seemlesly to avoid a css `clip` limitation

Then you initiate the animated drawing like so:

    pieChart.draw( 'myChartId', piePieces, 2500, 30 );

This method takes the following arguments:
* node id - the id of an html element to host the chart
* pieces - pie chart pieces defined in the way shown above
* animation time - _(optional)_ the time for the whole chart to be completed
* offset degrees - _(optional)_ in cases where you need it to start animating from a different position

Future development
------

Currently the pie chart drawer has only limited functionality and may one day grow into a wider range module. 
It will currently not work on IE :(

Future development may include:
* labeling of pie pieces
* different animations
* pie piece sliding off-center when triggered

Any feedback will be welcome!