$(document).ready () ->

  st = sidetap()

  # content panels
  gallery    = $('#gallery')
  thumbnails = gallery.find('.thumbnails')
  detail     = $('#detail')
  about      = $('#about')

  # navigation structure
  $('header .menu').click st.toggle_nav
  $('header .info').click st.toggle_nav

  $('#detail a.back').click () ->
    st.show_section gallery,
      animation: 'infromleft'


  $.getJSON('assets/json/images.json', (images) ->
    st.stp_nav.find('nav a').click () ->
      render_gallery(images[$(this).text()])
  )


  render_gallery = (images) ->

    thumbnails.empty()
    st.toggle_nav()

    # gallery interaction
    $('#gallery .thumbnails a').click () ->
      st.show_section(detail, {animation: 'infromright'})
      detail.find('.stp-content-body img').prop('src', '')
