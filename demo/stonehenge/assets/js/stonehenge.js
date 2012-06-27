(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $(document).ready(function() {
    var about, bigger_badder_squares, detail, gallery, photo, render_thumbnails, show_image, show_thumbnails, st, thumbnails;
    bigger_badder_squares = function() {
      var category, i, image, list, _results;
      _results = [];
      for (category in images) {
        list = images[category];
        _results.push((function() {
          var _len, _results2;
          _results2 = [];
          for (i = 0, _len = list.length; i < _len; i++) {
            image = list[i];
            image.url_s = image.url_s.replace(/_s\.jpg$/, '_q.jpg');
            _results2.push(images[category][i] = image);
          }
          return _results2;
        })());
      }
      return _results;
    };
    Harvey.attach('only screen and (min-width: 420px)', {
      setup: bigger_badder_squares
    });
    Harvey.attach('only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 3/2), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5)', {
      setup: bigger_badder_squares
    });
    st = sidetap();
    gallery = $('#gallery');
    thumbnails = gallery.find('.thumbnails');
    detail = $('#detail');
    photo = detail.find('figure');
    about = $('#about');
    $('header .menu').click(st.toggle_nav);
    $('header .info').click(function() {
      return st.show_section(about, {
        animation: 'upfrombottom'
      });
    });
    $('#about  a.cancel').click(function() {
      return st.show_section(gallery, {
        animation: 'downfromtop'
      });
    });
    $('#detail a.back').click(function() {
      return st.show_section(gallery, {
        animation: 'infromleft'
      });
    });
    show_thumbnails = function(section, images) {
      var i, img, loaded, thumbs, total, _len, _ref, _results;
      thumbnails.empty().addClass('loading');
      gallery.find('h1').text(section);
      thumbs = [];
      total = images[section].length;
      loaded = 0;
      _ref = images[section];
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        img = _ref[i];
        _results.push(thumbs.push($("<img src='" + img.url_s + "' />").load(function() {
          loaded++;
          if (loaded === total) {
            return render_thumbnails(images[section]);
          }
        })));
      }
      return _results;
    };
    render_thumbnails = function(images) {
      var i, img, _len;
      thumbnails.removeClass('loading').hide();
      for (i = 0, _len = images.length; i < _len; i++) {
        img = images[i];
        thumbnails.append($("<li" + ((i + 1) % 4 === 0 ? ' class="right"' : '') + ">\n  <a href='#'><img src='" + img.url_s + "' alt='" + i + "' /></a>\n</li>"));
      }
      thumbnails.fadeIn('fast');
      return thumbnails.find('a').click(function() {
        show_image(images[$(this).find('img').prop('alt')]);
        return false;
      });
    };
    show_image = __bind(function(img) {
      st.show_section(detail, {
        animation: 'infromright'
      });
      photo.addClass('loading');
      $("<img src='" + img.url_z + "' />").load(function() {
        photo.removeClass('loading').hide();
        photo.find('img').replaceWith(this);
        return photo.fadeIn('fast');
      });
      photo.find('cite').html(img.title);
      return photo.find('[rel="author"]').prop('href', "http://flickr.com/photos/" + img.owner + "/" + img.id).html(img.ownername);
    }, this);
    show_thumbnails(st.stp_nav.find('a.selected').text(), images);
    return st.stp_nav.find('nav a').click(function() {
      $(this).addClass('selected').siblings().removeClass('selected');
      st.toggle_nav();
      show_thumbnails($(this).text(), images);
      return false;
    });
  });
}).call(this);
