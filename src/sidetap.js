(function() {
  /*
    Constructor function for Sidetap
  */  this.sidetap = function() {
    var ios5;
    ios5 = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/) && window.SharedWorker;
    if (ios5) {
      return new SidetapIos();
    } else {
      return new SidetapStandard();
    }
  };
}).call(this);
