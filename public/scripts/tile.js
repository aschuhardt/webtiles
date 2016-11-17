var tileTypes = {
  grass:  'grass',
  stone:  'stone',
  dirt:   'dirt',
  sand:   'sand',
  none:   'none'
};

var tileObject = {
  x:          0,
  y:          0,
  width:      0,
  height:     0,
  type:       tileTypes.none,
  getImage:   function() {
                return mapTileImage(this.type);
              },
  intersectsWith: function(x, y) {
	if (x >= this.x && y >= this.y) {
		if (x <= this.x + this.width && y <= this.y + this.height) {
			return true;
                  }
                }
                return false;
	      },
  draw:       function(canvas) {
                var ctx = canvas.getContext('2d');
                var imgx = this.x;
                var imgy = this.y;
                var imgw = this.width;
                var imgh = this.height;
                ctx.drawImage(selectTileImageData(this.type), imgx, imgy, imgw, imgh);
              }
};

var tileImages = {
  grass:  [
    '/images/16 16 Dark Grass.png',
    '/images/16 16 Light Grass.png',
    '/images/16 16 Grass.png'
  ],
  stone: [
    '/images/16 16 Dark Stone.png',
    '/images/16 16 Light Stone.png',
    '/images/16 16 Stone.png'
  ],
  dirt: [
    '/images/16 16 Dirt.png'
  ],
  sand: [
    '/images/16 16 Sand.png',
    '/images/16 16 Dark Sand.png',
    '/images/16 16 Bright Sand.png'
  ],
  none: [
    '/images/16 16 Void.png'
  ]
};

var tileImageData = {
  grass: [],
  stone: [],
  dirt:  [],
  sand:  [],
  none:  []
};



function preLoadImages() {
  for (type in tileImages) {
    if (tileImages.hasOwnProperty(type)) {
      for (src of tileImages[type]) {
        tileImageData[type].push(loadImage(src));
      }
    }
  }
}

function loadImage(src) {
  var img = new Image();
  img.src = src;
  return img;
}

function selectTileImage(imageArr) {
  return encodeURI(imageArr[Math.floor(Math.random() * imageArr.length)]);
}

function selectTileImageData(type) {
  var imageArr = tileImageData[type];
  return imageArr[Math.floor(Math.random() * imageArr.length)];
}

function mapTileImage(tileType) {
  switch (tileType) {
    case tileTypes.grass:
      return selectTileImage(tileImages.grass);
      break;
    case tileTypes.stone:
      return selectTileImage(tileImages.stone);
      break;
    case tileTypes.dirt:
      return selectTileImage(tileImages.dirt);
      break;
    case tileTypes.sand:
      return selectTileImage(tileImages.sand);
      break;
    case tileTypes.none:
      return selectTileImage(tileImages.none);
      break;
  }
}

function createTileSelect() {
  var container = document.getElementById('tileSelect');
  for (type in tileTypes) {
    if (tileTypes.hasOwnProperty(type)) {
      var newImg = document.createElement('img');
      newImg.setAttribute('src', mapTileImage(type));
      newImg.setAttribute('class', 'selTile');
      newImg.setAttribute('id', type);
      container.appendChild(newImg);
      $(document).on('click', '#' + type, function() {
        selectedTileType = this.id;
      });
    }
  }
}
