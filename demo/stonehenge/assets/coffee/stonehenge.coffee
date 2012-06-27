$(document).ready () ->

  bigger_badder_squares = () ->

    for category, list of images
      for image, i in list
        image.url_s = image.url_s.replace /_s\.jpg$/, '_q.jpg'
        images[category][i] = image

  # use high-res thumbnail images on devices with higher pixel density
  Harvey.attach 'only screen and (min-width: 420px)', setup: bigger_badder_squares
  Harvey.attach 'only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 3/2), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5)', 
    setup: bigger_badder_squares


  st = sidetap()

  # content panels
  gallery    = $('#gallery')
  thumbnails = gallery.find('.thumbnails')

  detail     = $('#detail')
  photo      = detail.find('figure')

  about      = $('#about')

  # navigation structure
  $('header .menu').click st.toggle_nav

  $('header .info'    ).click () -> st.show_section(about,   {animation: 'upfrombottom'})
  $('#about  a.cancel').click () -> st.show_section(gallery, {animation: 'downfromtop'})
  $('#detail a.back'  ).click () -> st.show_section(gallery, {animation: 'infromleft'})



  show_thumbnails = (section, images) ->
    thumbnails.empty().addClass('loading')
    gallery.find('h1').text(section)

    thumbs = []

    total  = images[section].length
    loaded = 0

    # preload tumbnails
    thumbs.push $("<img src='#{img.url_s}' />").load(() ->
      loaded++
      render_thumbnails(images[section]) if loaded is total
    ) for img, i in images[section]


  render_thumbnails = (images) ->
    thumbnails.removeClass('loading').hide()

    thumbnails.append $("""
      <li#{if (i + 1) % 4 is 0 then ' class="right"' else ''}>
        <a href='#'><img src='#{img.url_s}' alt='#{i}' /></a>
      </li>"""
    ) for img, i in images

    thumbnails.fadeIn('fast')

    thumbnails.find('a').click () ->
      show_image(images[$(this).find('img').prop('alt')])
      no


  show_image = (img) =>
    st.show_section(detail, {animation: 'infromright'})

    photo.addClass('loading')

    $("<img src='#{img.url_z}' />").load(() ->
      photo.removeClass('loading').hide()

      photo.find('img').replaceWith(this)

      photo.fadeIn('fast')
    )

    # show meta info for the current image
    photo.find('cite').html(img.title)
    photo.find('[rel="author"]')
          .prop('href', "http://flickr.com/photos/#{img.owner}/#{img.id}")
          .html(img.ownername)


  # show the default section
  show_thumbnails(st.stp_nav.find('a.selected').text(), images)

  st.stp_nav.find('nav a').click () ->
    $(this).addClass('selected').siblings().removeClass('selected')
    st.toggle_nav()

    show_thumbnails($(this).text(), images)
    no
