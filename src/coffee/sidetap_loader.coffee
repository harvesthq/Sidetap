###
  Constructor function for Sidetap
###

this.sidetap = () ->
  ios5 = window.SharedWorker and navigator.userAgent.match(/^((?!android).)*webkit.*$/i)
  return if ios5 then new SidetapIos() else new SidetapStandard()