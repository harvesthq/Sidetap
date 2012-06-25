###
  Constructor function for Sidetap
###

this.sidetap = () ->
  ios5 = navigator.userAgent.match(/^((?!android).)*webkit.*$/i) && window.SharedWorker
  return if ios5 then new SidetapIos() else new SidetapStandard()