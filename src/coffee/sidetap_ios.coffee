class this.SidetapIos extends SidetapStandard
  constructor: () ->
    $("body").addClass("ios")
    @ios_5 = true
    super()
    
  set_up_observers: ->
    @set_window_size()
    $("header h1").click (evt) => @show_address_bar(evt)
    $(window).on "orientationchange", (evt) => @set_window_size(evt)

    $(".nav-toggle").click (evt) => @toggle_nav(evt)
    $("#stp-overlay").click (evt) => @toggle_nav(evt)

  show_address_bar: (evt) ->
    @address_bar_showing = true
    @full_heights.css("minHeight", 160)
    setTimeout(@set_window_size_2, 1)
  
  set_window_size: ->
    @address_bar_showing = false
    $("body").css("paddingBottom","5000px")
    window.scrollTo(0, 1)
    setTimeout(@set_window_size_2,50)
  
  set_window_size_2: =>
    @full_heights.css("minHeight", window.innerHeight)
    $("body").css("paddingBottom","0")
    if @stp.hasClass("nav-showing") then @set_nav_showing() else @set_nav_hiding()

  scroll_to: (element) ->
    parent = element.parents(".stp-content-body").first()
    oldscrolltop = parent.scrollTop()
    
    # get the correct offset based on top scroll
    parent.scrollTop(0)
    offset = element.offset().top - 98
    parent.scrollTop(oldscrolltop)
    
    parent.stop().animate({scrollTop: offset}, "slow")

  show_section: (element, options = {}) ->
    animation = if options.animation? then options.animation else "default"
    @pending_callback = options.callback if options.callback?
    
    if animation is "upfrombottom"
      @up_from_bottom(element)
    else if animation is "downfromtop"
      @down_from_top(element)
    else if animation is "infromright"
      @in_from_right(element)
    else if animation is "infromleft"
      @in_from_left(element)
    else
      @stp_content.find(".stp-content-panel").not(".hidden").addClass("hidden")
      element.removeClass("hidden").show()
      @animation_callback()
  
  up_from_bottom: (element) ->
    element.on("webkitAnimationEnd", @up_from_bottom_complete).removeClass("hidden").addClass("up-from-bottom")

  up_from_bottom_complete: =>
    @slide_up_previous = $(".stp-content-panel").not(".up-from-bottom").addClass("hidden")
    $(".up-from-bottom").off("webkitAnimationEnd", @up_from_bottom_complete).removeClass("up-from-bottom")
    @animation_callback()

  down_from_top: (element) ->
    slide_down = @stp_content.find(".stp-content-panel").not(".hidden")
    element.removeClass("hidden")
    slide_down.on("webkitAnimationEnd", @down_from_top_complete).addClass("down-to-bottom")

  down_from_top_complete: =>
    slide_down = $(".down-to-bottom")
    slide_down.off("webkitAnimationEnd", @down_from_top_complete).removeClass("down-to-bottom").hide()
    slide_down.addClass("hidden").show()
    @animation_callback()

  in_from_right: (element) ->
    $(".stp-content-panel").not(".hidden").addClass("slide-out-to-left")
    element.on("webkitAnimationEnd", @in_from_right_complete).removeClass("hidden").addClass("slide-in-from-right")

  in_from_right_complete: =>
    $(".slide-out-to-left").addClass("hidden").removeClass("slide-out-to-left")
    $(".slide-in-from-right").off("webkitAnimationEnd", @in_from_right_complete).removeClass("slide-in-from-right")
    @animation_callback()

  in_from_left: (element) ->
    $(".stp-content-panel").not(".hidden").addClass("slide-out-to-right")
    element.on("webkitAnimationEnd", @in_from_left_complete).removeClass("hidden").addClass("slide-in-from-left")

  in_from_left_complete: =>
    $(".slide-out-to-right").removeClass("slide-out-to-right").addClass("hidden")
    $(".slide-in-from-left").off("webkitAnimationEnd", @in_from_left_complete).removeClass("slide-in-from-left")
    @animation_callback()
  
  animation_callback: ->
    if @pending_callback
      @pending_callback.call() 
    @pending_callback = null