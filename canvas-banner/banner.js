var CanvasBanner = function(canvas, imgData){
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.canvas.width = window.innerWidth;
  this.imgData = imgData;
  this.onloadImage(imgData);
  window.addEventListener('load', this.init.bind(this), false);
}

CanvasBanner.prototype = {
  constructor: CanvasBanner,

  init: function(){
    this.canvas.height = this.getImageWH();
    this.initImage();
    this.test = 0;
    this.animate();
  },

  animate: function(){
    this.test += 10;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(var i = 0; i < this.imgs.length; i++){
      this.drawImage(this.imgs[i], i * this.canvas.width - this.test );
    }

    if(this.test == 400) return;
    setTimeout(this.animate.bind(this), 16);
  },

  initImage: function(){
    for(var i = 0; i < this.imgs.length; i++){
      this.drawImage(this.imgs[i], i * this.canvas.width);
    }
  },

  drawImage: function(img, x){
    this.context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, x, 0 , this.canvas.width, this.canvas.height);
  },

  getImageWH: function(){
    this.imgs[0].style.display = 'inline-block';
    var H = this.imgs[0].offsetHeight;
    this.imgs[0].style.display = 'none';
    return H;
  },

  onloadImage: function(imgData){
    this.imgs = [];
    for(var i = 0; i < imgData.length; i++){
      var img = new Image();
      img.src = imgData[i]['src'];
      img.width = this.canvas.width;
      img.style.display = 'none';
      document.body.appendChild(img);
      this.imgs.push(img);
    }
  }
}