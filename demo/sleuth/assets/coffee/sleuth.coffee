$(document).ready () ->

  st = sidetap()

  # content panels
  gallery    = $('#gallery')
  thumbnails = gallery.find('.thumbnails')
  detail     = $('#detail')
  about      = $('#about')

  # navigation structure
  $('header .menu').click st.toggle_nav

  $('header .info'    ).click () -> st.show_section(about,   {animation: 'upfrombottom'})
  $('#about  a.cancel').click () -> st.show_section(gallery, {animation: 'downfromtop'})
  $('#detail a.back'  ).click () -> st.show_section(gallery, {animation: 'infromleft'})


  $.getJSON 'assets/json/images.json', (images) ->

    # show the default section
    render_thumbnails(st.stp_nav.find('a.selected').text(), images)

    st.stp_nav.find('nav a').click () ->
      $(this).addClass('selected').siblings().removeClass('selected')
      st.toggle_nav()

      render_thumbnails($(this).text(), images)
      no


  render_thumbnails = (section, images) ->
    thumbnails.empty()
    thumbnails.append($("<li><a href='javascript:void(0)'><img src='#{img.url_q}' alt='' /></a></li>")) for img in images[section]

    gallery.find('h1').text(section + ' Bears')

    # gallery interaction
    $('#gallery .thumbnails a').click () ->
      show_image($(this).find('img').prop('src'))


  show_image = (src) ->
    st.show_section(detail, {animation: 'infromright'})
    detail.find('.stp-content-body img').prop('src', src)
