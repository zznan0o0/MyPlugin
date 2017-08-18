var Banner = function(){
  this.bannerImg = document.querySelector('.banner_img');
  this.bannerSelect = document.querySelector('.banner_select');
  this.bannerImgItem = this.bannerImg.querySelectorAll('li');
  this.props = {
    length: this.bannerImgItem.length,
    WIDTH: window.innerWidth,
    isStart: false,
    isMove: false,
    startX: 0,
    distant: 0,
    index: 0,
    timer: null,
    isAnimate: false,
    currentIndex: 0,
    toDistant: 0,
    traDistant: 0,
    currentOpacity: 1
  };

  this.init();
}

Banner.prototype = {
  constructor: Banner,

  init: function(){
    if(this.props.length > 1){
      this.initSelectItem(0);
      this.initImgItem(0);
      this.setTranslate3d(0, this)
      this.bindTouch();
      this.resetAlpha();
    }
  },

  initSelectItem: function(){
    var li = '';

    for(var i = 0; i < this.props.length; i++){
      li += '<li></li>';
    }

    this.bannerSelect.innerHTML = li;
    this.bannerSelectItem = this.bannerSelect.querySelectorAll('li');
    this.bannerSelectItem[0].className = 'on';
  },

  changeSelectItem: function(index, _this){
    for(var i = 0; i < _this.bannerSelectItem.length; i++){
      _this.bannerSelectItem[i].className = '';
    }

    _this.bannerSelectItem[index].className = 'on';
  },

  getSelectIndex: function(_this){
    for(var i = 0; i < _this.bannerSelectItem.length; i++){
      if(_this.bannerSelectItem[i].className === 'on'){
        break;
        return i;
      }
    }
  },

  initImgItem: function(index){
    //this.resetAlpha()
    for(var i = 0; i < this.props.length; i++){
      if(i - index >= 0){
        this.bannerImgItem[i].style.left = (i - index) * this.props.WIDTH + 'px';
      }
      else{
        this.bannerImgItem[i].style.left = (this.props.length + i - index) * this.props.WIDTH + 'px';
      }
    }

    this.bannerImg.style.width = this.props.length * this.props.WIDTH + 'px';
  },

  getTranslate3d: function(string){
    return parseInt(string.match(/translate3d\((.+)\)/)[1].split(',')[0]);
  },

  setTranslate3d: function(index, _this){
    _this.bannerImg.style.transform = 'translate3d(' + (- _this.props.WIDTH * index) + 'px, 0px, 0px)';
  },

  changeAlpha: function(currentIndex, value, isTouch){
    if(Math.abs(this.props.distant) < this.props.WIDTH / 3){
      this.props.opacity = 1;
      this.bannerImgItem[currentIndex].style.opacity = 1;
      return;
    }
    if(isTouch){
      this.props.opacity = 1 - value;
      this.bannerImgItem[currentIndex].style.opacity = this.props.opacity;
    }
    if(Math.abs(this.props.distant) > this.props.WIDTH / 3 && !isTouch){
      this.props.opacity -= value;
      this.bannerImgItem[currentIndex].style.opacity = this.props.opacity;
    }
  },

  resetAlpha: function(){
    this.props.opacity = 1;
    for(var i = 0; i < this.bannerImgItem.length; i++){
      this.bannerImgItem[i].style.opacity = 1;
    }
  },

  bindTouch: function(){
    var _this = this;
    this.bannerImg.addEventListener('touchstart', function(e){
      e.preventDefault();
      if(!_this.props.isAnimate){
        _this.props.isStart = true;
        _this.props.startX = e.changedTouches[0].clientX;
      }
    }, { passive: false });

    window.addEventListener('touchmove', function(e){
      e.preventDefault();
      if(_this.props.isStart && !_this.props.isAnimate){
        _this.props.isMove = true;
        var x = e.changedTouches[0].clientX;
        _this.props.distant = _this.props.startX - x;

        _this.changeAlpha(_this.props.currentIndex, Math.abs(_this.props.distant) / 500, true);
        if(Math.abs(_this.props.distant) > _this.props.WIDTH){
          _this.props.distant = _this.props.distant > 0 ? _this.props.WIDTH : -_this.props.WIDTH;
        }
        // <-
        if(_this.props.distant < 0 && _this.props.currentIndex == 0){
          _this.initImgItem(_this.props.length - 1);
          _this.setTranslate3d(1, _this);
          _this.props.index = 1;
        }
        else if(_this.props.distant > 0 && _this.props.currentIndex == _this.props.length - 1){
          _this.initImgItem(1);
          _this.setTranslate3d(_this.props.length - 2, _this);
          _this.props.index = _this.props.length - 2;
        }
        else{
          _this.setTranslate3d(_this.props.traDistant, _this);
          _this.initImgItem(0);
          _this.props.index = _this.props.currentIndex;
        }


        _this.bannerImg.style.transform = 'translate3d(' + (-_this.props.index * _this.props.WIDTH - _this.props.distant) + 'px, 0px, 0px)';
      }
    }, { passive: false });

    window.addEventListener('touchend', function(e){
      e.preventDefault();
      if(_this.props.isStart && _this.props.isMove && !_this.props.isAnimate){
        _this.props.isAnimate = true;
        //_this.animate(_this, 0)
        //-1
        if(_this.props.distant > 0){
          if(Math.abs(_this.props.distant) > _this.props.WIDTH / 3){
            var index = _this.props.length - 1;
            if(_this.props.index === index - 1 && _this.props.currentIndex === index){
              _this.animate(_this, index, function(){
                _this.changeSelectItem(0, _this);
                _this.initImgItem(0);
                _this.setTranslate3d(0, _this);
                _this.props.index = 0;
                _this.props.currentIndex = 0;
              });
            }
            else{
              index = _this.props.currentIndex + 1;
              _this.animate(_this, index, function(){
                _this.changeSelectItem(index, _this);
                _this.initImgItem(0);
                _this.props.index = index;
                _this.props.currentIndex = index;
              });
            }
          }
          else{
            if(_this.props.index === index - 1 && _this.props.currentIndex === index){
              index = _this.props.length - 1;
              _this.animate(_this, index - 1, function(){
                _this.initImgItem(0);
                _this.setTranslate3d(index, _this);
                _this.props.index = _this.props.currentIndex;
              });
            }
            else{
              _this.animate(_this, _this.props.index);
            }
          }
        }
        else{
          if(Math.abs(_this.props.distant) > _this.props.WIDTH / 3){
            if(_this.props.index === 1 && _this.props.currentIndex === 0){
              _this.animate(_this, 0, function(){
                var index = _this.props.length - 1;
                _this.changeSelectItem(index, _this);
                _this.initImgItem(0);
                _this.setTranslate3d(index, _this);
                _this.props.index = index;
                _this.props.currentIndex = index;
              });
            }
            else{
              var index = _this.props.currentIndex - 1;
              _this.animate(_this, index, function(){
                _this.changeSelectItem(index, _this);
                _this.props.index = index;
                _this.props.currentIndex = index;
              });
            }
          }
          else{
            if(_this.props.index === 1 && _this.props.currentIndex === 0){
              _this.animate(_this, 1, function(){
                _this.initImgItem(0);
                _this.setTranslate3d(0, _this);
                _this.props.index = _this.props.currentIndex;
              });
            }
            else{
              _this.animate(_this, _this.props.index);
            }
          }
        }
      }
    }, { passive: false });
  },

  animate: function(_this, index, fn){
    var distant = _this.props.WIDTH * (_this.props.index - index) + _this.props.distant;
    _this.props.toDistant = distant;
    clearInterval(_this.props.timer);
    _this.props.timer = setInterval(function(){
      var speed = _this.props.toDistant /10;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      _this.props.toDistant -= speed;
      _this.changeAlpha(_this.props.currentIndex, Math.abs(speed) / 300);
      var now = _this.getTranslate3d(_this.bannerImg.style.transform);
      _this.bannerImg.style.transform = 'translate3d(' + (now + speed) + 'px, 0px, 0px)';

      if(_this.props.toDistant < 1 && _this.props.toDistant >= 0 || _this.props.toDistant > -1 && _this.props.toDistant <= 0){
        _this.props.isAnimate = false;
        _this.props.isMove = false;
        _this.props.isStart = false;
        clearInterval(_this.props.timer);
        _this.resetAlpha();
        fn && fn();
      }
    }, 16)
  }
}

window.addEventListener('load', function(){
  new Banner();
})