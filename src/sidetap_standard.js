(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.SidetapStandard = (function() {
    SidetapStandard.ios_5 = false;
    function SidetapStandard() {
      this.nav_toggle_complete = __bind(this.nav_toggle_complete, this);
      this.toggle_nav = __bind(this.toggle_nav, this);
      this.set_window_size = __bind(this.set_window_size, this);      this.stp = this.detect_primary_element("sidetap");
      this.stp_nav = this.detect_primary_element("stp-nav");
      this.stp_content = this.detect_primary_element("stp-content");
      this.stp_fake_header = this.detect_primary_element("stp-fake-header");
      this.set_up_observers();
    }
    SidetapStandard.prototype.detect_primary_element = function(css_class) {
      var el;
      el = $("." + css_class);
      if (el.length > 1) {
        if (typeof console !== "undefined" && console !== null) {
          console.warn("Sidetap: too many elements of class \"" + css_class + "\". There must be only one.");
        }
      }
      return el.first();
    };
    SidetapStandard.prototype.getScrollTop = function() {
      var scrollTop;
      return scrollTop = window.pageYOffset || document.compatMode === "CSS1Compat" && document.documentElement.scrollTop || document.body.scrollTop || 0;
    };
    SidetapStandard.prototype.set_up_observers = function() {
      this.set_window_size();
      $(window).resize(this.set_window_size);
      return $(".nav-toggle").click(__bind(function(evt) {
        return this.toggle_nav(evt);
      }, this));
    };
    SidetapStandard.prototype.set_window_size = function() {
      $(".stp-full-height").css("minHeight", window.innerHeight);
      if (this.stp.hasClass("nav-showing")) {
        return this.set_nav_showing();
      } else {
        return this.set_nav_hiding();
      }
    };
    SidetapStandard.prototype.toggle_nav = function(e) {
      e.preventDefault();
      this.stp_content.on("webkitAnimationEnd", this.nav_toggle_complete);
      if (this.stp.hasClass("nav-showing")) {
        this.stp_content.removeClass("showing-nav").addClass("hide-nav");
        this.set_nav_hiding();
      } else {
        this.stp_nav.show();
        this.stp_content.removeClass("hide-nav").addClass("showing-nav");
        this.set_nav_showing();
      }
      this.stp.toggleClass("nav-showing");
      if (this.ios_5) {
        if (this.address_bar_showing) {
          this.set_window_size();
        }
        return window.scrollTo(0, 1);
      }
    };
    SidetapStandard.prototype.nav_toggle_complete = function() {
      this.stp_content.off("webkitAnimationEnd", this.nav_toggle_complete);
      if (!this.stp_content.hasClass("showing-nav")) {
        return this.stp_nav.hide();
      }
    };
    SidetapStandard.prototype.set_nav_showing = function() {
      this.stp_nav.css("maxHeight", "none");
      return this.stp_content.css("maxHeight", this.stp_nav.height());
    };
    SidetapStandard.prototype.set_nav_hiding = function() {
      this.stp_content.css("maxHeight", "none");
      return this.stp_nav.css("maxHeight", this.stp_content.height());
    };
    SidetapStandard.prototype.scroll_to = function(element) {
      return $("body").scrollTop(element.offset().top - 10);
    };
    SidetapStandard.prototype.show_section = function(element, options) {
      if (options == null) {
        options = {};
      }
      this.stp_content.find(".stp-content-panel").not(".hidden").addClass("hidden");
      element.removeClass("hidden").show();
      if (options.callback != null) {
        return options.callback.apply();
      }
    };
    return SidetapStandard;
  })();
}).call(this);
