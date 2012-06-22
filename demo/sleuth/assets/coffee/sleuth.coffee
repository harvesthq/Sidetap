$(document).ready () ->

  st = sidetap()

  # content panels
  gallery = $('#gallery')
  detail  = $('#detail')
  about   = $('#about')


  # navigation structure
  $('header .menu').click st.toggle_nav
  $('header .info').click st.toggle_nav

  $('#detail a.back').click () ->
    st.show_section gallery,
      animation: 'infromleft'


  # gallery interaction
  $('#gallery .thumbnails a').click () ->
    st.show_section detail,
      animation: 'infromright'

    detail.find('.stp-content-body img').prop('src', $(this).find('img').prop('src'))

    no



