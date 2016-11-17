var selectedTileType;
var canvasTiles = [];
var mouseDownInterval;
var mouseX;
var mouseY;

function doTestDraw(canvas, cw, ch, tw, th) {
  preLoadImages();
  var tiles = [];
  for (x = 0; x < cw / tw; x++) {
    for (y = 0; y < ch / th; y++) {
      var tile = Object.create(tileObject);
      tile.x = x * tw;
      tile.y = y * th;
      tile.width = tw;
      tile.height = th;
      tile.type = tileTypes.grass;
      // tiles.push(tile);
      canvasTiles.push(tile);
    }
  }
  // for (t of tiles) {
  for (t of canvasTiles) {
    t.draw(canvas);
  }
}

$(document).ready(function(){
  //init selected tile type
  selectedTileType = tileTypes.grass;

  //run test draw
  doTestDraw(document.getElementById("canvas"), 300, 300, 16, 16);

  //draw tile selections
  createTileSelect();

  //init mouseCoords
  mouseX = 0;
  mouseY = 0;

  //set Apply button click event
  $('#btnApply').click(function(){
    $('#canvas').prop('width', $('#input-width').val());
    $('#canvas').prop('height', $('#input-height').val());
    doTestDraw(document.getElementById("canvas"), $('#canvas').prop('width'), $('#canvas').prop('height'), $('#input-tilesz').val(), $('#input-tilesz').val());
  });

  //set Download button click events
  $('#btnSave').click(function(){
    console.log('saving...');
    var canvas = document.getElementById("canvas");
        canvas.toBlob(function(blob) {
            saveAs(blob, "output.png");
        }, "image/png");
  });

  //handle mouse move
  $(document).mousemove(function(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
  });

  //set canvas mouseDown event
  $('#canvas').mousedown(function(event) {
    mouseDownInterval = setInterval(function() {
      var canvas = document.getElementById("canvas");
      var cx = mouseX - canvas.getBoundingClientRect().left;
      var cy = mouseY - canvas.getBoundingClientRect().top;
	    $('#xspan').text("X: " + cx);
	    $('#yspan').text("Y: " + cy);
      for (tile of canvasTiles) {
	  if (tile.intersectsWith(cx, cy)) {
            tile.type = selectedTileType;
            tile.draw(canvas);
	    break;		  
	  }
        }
    }, 100);
  });

  //set canvas mouseUp event
  $('#canvas').mouseup(function(event) {
    clearInterval(mouseDownInterval);
  });

  //ser canvas mouseLeave event
  $('#canvas').mouseleave(function(event) {
    clearInterval(mouseDownInterval);
  });

});
