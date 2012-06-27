class this.SidetapStandard
  
  @ios_5 = false
  
  constructor: () ->
    @stp = @detect_primary_element("sidetap")
    @stp_nav = @detect_primary_element("stp-nav")
    @stp_content = @detect_primary_element("stp-content")
    @full_heights = $(".stp-full-height")
    
    @set_up_observers()
  
  detect_primary_element: (css_class) ->
    el = $(".#{css_class}")
    console?.warn("Sidetap: too many elements of class \"#{css_class}\". There must be only one.") if el.length > 1
    el.addClass("stp-full-height")
    el.first()

  getScrollTop: ->
    scrollTop = window.pageYOffset || document.compatMode is "CSS1Compat" && document.documentElement.scrollTop || document.body.scrollTop || 0
  
  set_up_observers: ->
    @set_window_size()
    $(window).resize @set_window_size

    $(".nav-toggle").click (evt) => @toggle_nav(evt)

  set_window_size: =>
    @full_heights.css("minHeight", window.innerHeight)
    if @stp.hasClass("nav-showing") then @set_nav_showing() else @set_nav_hiding()

  toggle_nav: (e) =>
    e?.preventDefault()
    @stp_content.on "webkitAnimationEnd", @nav_toggle_complete
    
    if(@stp.hasClass("nav-showing"))
      @stp_content.removeClass("showing-nav").addClass("hide-nav")
      @set_nav_hiding()
    else
      @stp_nav.show()
      @stp_content.removeClass("hide-nav").addClass("showing-nav")
      @set_nav_showing()
    @stp.toggleClass("nav-showing")

    if @ios_5
      @set_window_size() if @address_bar_showing
      window.scrollTo(0, 1)

  nav_toggle_complete: =>
    @stp_content.off "webkitAnimationEnd", @nav_toggle_complete
    @stp_nav.hide() unless @stp_content.hasClass("showing-nav")

  set_nav_showing: ->
    @stp_nav.css("maxHeight", "none")
    @stp_content.css("maxHeight", @stp_nav.height())

  set_nav_hiding: ->
    @stp_content.css("maxHeight", "none")
    @stp_nav.css("maxHeight", @stp_content.height())
  
  scroll_to: (element) ->
    $("body").scrollTop(element.offset().top - 10)
  
  show_section: (element, options = {}) ->
    @stp_content.find(".stp-content-panel").not(".hidden").addClass("hidden")
    element.removeClass("hidden").show()
    options.callback.apply() if options.callback?
