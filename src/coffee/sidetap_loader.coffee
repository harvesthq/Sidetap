###
  Constructor function for Sidetap
###

this.sidetap = () ->
  ios5 = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/) && window.SharedWorker
  return if ios5 then new SidetapIos() else new SidetapStandard()