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
    $(".stp-full-height").css("minHeight", 160)
    setTimeout(@set_window_size_2, 1)
  
  set_window_size: ->
    @address_bar_showing = false
    $("body").css("paddingBottom","5000px")
    window.scrollTo(0, 1)
    setTimeout(@set_window_size_2,50)
  
  set_window_size_2: =>
    $(".stp-full-height").css("minHeight", window.innerHeight)
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
    element.on("webkitAnimationEnd", @up_from_bottom_complete).removeClass("hidden").addClass("slideup-in")

  up_from_bottom_complete: =>
    @slide_up_previous = $(".stp-content-panel").not(".slideup-in").addClass("hidden")
    $(".slideup-in").off("webkitAnimationEnd", @up_from_bottom_complete).removeClass("slideup-in")
    @animation_callback()

  in_from_right: (element) ->
    $(".stp-content-panel").not(".hidden").addClass("slide-out")
    element.on("webkitAnimationEnd", @in_from_right_complete).removeClass("hidden").addClass("slide-in")

  in_from_right_complete: =>
    $(".slide-out").addClass("hidden")
    $(".slide-in").off("webkitAnimationEnd", @in_from_right_complete).removeClass("slide-in")
    @animation_callback()

  in_from_left: (element) ->
    $(".stp-content-panel").not(".hidden").addClass("slide-out reverse")
    element.on("webkitAnimationEnd", @in_from_left_complete).removeClass("hidden slide-out").addClass("slide-in reverse")

  in_from_left_complete: =>
    $(".slide-out").removeClass("slide-in reverse").addClass("hidden")
    $(".slide-in").off("webkitAnimationEnd", @in_from_left_complete).removeClass("slide-in reverse")
    @animation_callback()

  down_from_top: (element) ->
    slide_down = @stp_content.find(".stp-content-panel").not(".hidden")
    element.removeClass("hidden")
    slide_down.on("webkitAnimationEnd", @down_from_top_complete).addClass("slideup-out-reverse")
  
  down_from_top_complete: =>
    slide_down = $(".slideup-out-reverse")
    slide_down.off("webkitAnimationEnd", @down_from_top_complete).removeClass("slideup-out-reverse").hide()
    slide_down.addClass("hidden").show()
    @animation_callback()
  
  animation_callback: ->
    if @pending_callback
      @pending_callback.call() 
    @pending_callback = null