$( function() {
  var visitors = $('#visitors').epoch({
      type: 'time.area', axis:['left', 'bottom', 'right'],
      data: [ { values: [{ time:Date.now()/1000, y:0 }] }],
  });
  var pages = $('#pages').epoch({type: 'bar'});
  var touch = $('#touch').epoch({type: 'time.gauge'});
  var video = $('#video').epoch({type: 'time.gauge'});
} );
