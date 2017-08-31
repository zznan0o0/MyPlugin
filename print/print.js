var Print = function(){
  this.init();
}

Print.prototype = {
  constructor: Print,

  init: function(){
    this.prop = {
      iframe: this.createiframe()
    };
    this.prop.iframe.style.display = 'none';
    document.body.appendChild(this.prop.iframe)
    this.prop.iframe.contentDocument.head.innerHTML = document.head.innerHTML;
  },

  createiframe: function(){
    return document.createElement('iframe')
  },

  print: function(content){
    if(content){
      this.prop.iframe.contentDocument.body.innerHTML = content;
    }
    else{
      this.prop.iframe.contentDocument.body.innerHTML = document.body.innerHTML;
    }
    
    this.prop.iframe.contentWindow.addEventListener('load', function () {
        this.prop.iframe.style.display = 'block';
        this.prop.iframe.contentWindow.print();
        this.prop.iframe.style.display = 'none';
    }.call(this))
  }
}