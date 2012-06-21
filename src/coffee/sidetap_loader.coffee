###
  Constructor function for Sidetap
###

this.sidetap = () ->
  return new SidetapStandard()

  ios5 = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/) && window.SharedWorker
  return if ios5 then new SidetapIos() else new SidetapStandard()