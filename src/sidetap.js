var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

this.SidetapStandard = (function() {

  SidetapStandard.name = 'SidetapStandard';

  SidetapStandard.ios_5 = false;

  function SidetapStandard() {
    this.nav_toggle_complete = __bind(this.nav_toggle_complete, this);

    this.toggle_nav = __bind(this.toggle_nav, this);

    this.set_window_size = __bind(this.set_window_size, this);
    this.stp = this.detect_primary_element("sidetap");
    this.stp_nav = this.detect_primary_element("stp-nav");
    this.stp_content = this.detect_primary_element("stp-content");
    this.full_heights = $(".stp-full-height");
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
    el.addClass("stp-full-height");
    return el.first();
  };

  SidetapStandard.prototype.getScrollTop = function() {
    var scrollTop;
    return scrollTop = window.pageYOffset || document.compatMode === "CSS1Compat" && document.documentElement.scrollTop || document.body.scrollTop || 0;
  };

  SidetapStandard.prototype.set_up_observers = function() {
    var _this = this;
    this.set_window_size();
    $(window).resize(this.set_window_size);
    return $(".nav-toggle").click(function(evt) {
      return _this.toggle_nav(evt);
    });
  };

  SidetapStandard.prototype.set_window_size = function() {
    this.full_heights.css("minHeight", window.innerHeight);
    if (this.stp.hasClass("nav-showing")) {
      return this.set_nav_showing();
    } else {
      return this.set_nav_hiding();
    }
  };

  SidetapStandard.prototype.toggle_nav = function(e) {
    if (e != null) {
      e.preventDefault();
    }
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

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

this.SidetapIos = (function(_super) {

  __extends(SidetapIos, _super);

  SidetapIos.name = 'SidetapIos';

  function SidetapIos() {
    this.in_from_left_complete = __bind(this.in_from_left_complete, this);

    this.in_from_right_complete = __bind(this.in_from_right_complete, this);

    this.down_from_top_complete = __bind(this.down_from_top_complete, this);

    this.up_from_bottom_complete = __bind(this.up_from_bottom_complete, this);

    this.set_window_size_2 = __bind(this.set_window_size_2, this);
    $("body").addClass("ios");
    this.ios_5 = true;
    SidetapIos.__super__.constructor.call(this);
  }

  SidetapIos.prototype.set_up_observers = function() {
    var _this = this;
    this.set_window_size();
    $("header h1").click(function(evt) {
      return _this.show_address_bar(evt);
    });
    $(window).on("orientationchange", function(evt) {
      return _this.set_window_size(evt);
    });
    $(".nav-toggle").click(function(evt) {
      return _this.toggle_nav(evt);
    });
    return $("#stp-overlay").click(function(evt) {
      return _this.toggle_nav(evt);
    });
  };

  SidetapIos.prototype.show_address_bar = function(evt) {
    this.address_bar_showing = true;
    this.full_heights.css("minHeight", 160);
    return setTimeout(this.set_window_size_2, 1);
  };

  SidetapIos.prototype.set_window_size = function() {
    this.address_bar_showing = false;
    $("body").css("paddingBottom", "5000px");
    window.scrollTo(0, 1);
    return setTimeout(this.set_window_size_2, 50);
  };

  SidetapIos.prototype.set_window_size_2 = function() {
    this.full_heights.css("minHeight", window.innerHeight);
    $("body").css("paddingBottom", "0");
    if (this.stp.hasClass("nav-showing")) {
      return this.set_nav_showing();
    } else {
      return this.set_nav_hiding();
    }
  };

  SidetapIos.prototype.scroll_to = function(element) {
    var offset, oldscrolltop, parent;
    parent = element.parents(".stp-content-body").first();
    oldscrolltop = parent.scrollTop();
    parent.scrollTop(0);
    offset = element.offset().top - 98;
    parent.scrollTop(oldscrolltop);
    return parent.stop().animate({
      scrollTop: offset
    }, "slow");
  };

  SidetapIos.prototype.show_section = function(element, options) {
    var animation;
    if (options == null) {
      options = {};
    }
    animation = options.animation != null ? options.animation : "default";
    if (options.callback != null) {
      this.pending_callback = options.callback;
    }
    if (animation === "upfrombottom") {
      return this.up_from_bottom(element);
    } else if (animation === "downfromtop") {
      return this.down_from_top(element);
    } else if (animation === "infromright") {
      return this.in_from_right(element);
    } else if (animation === "infromleft") {
      return this.in_from_left(element);
    } else {
      this.stp_content.find(".stp-content-panel").not(".hidden").addClass("hidden");
      element.removeClass("hidden").show();
      return this.animation_callback();
    }
  };

  SidetapIos.prototype.up_from_bottom = function(element) {
    return element.on("webkitAnimationEnd", this.up_from_bottom_complete).removeClass("hidden").addClass("up-from-bottom");
  };

  SidetapIos.prototype.up_from_bottom_complete = function() {
    this.slide_up_previous = $(".stp-content-panel").not(".up-from-bottom").addClass("hidden");
    $(".up-from-bottom").off("webkitAnimationEnd", this.up_from_bottom_complete).removeClass("up-from-bottom");
    return this.animation_callback();
  };

  SidetapIos.prototype.down_from_top = function(element) {
    var slide_down;
    slide_down = this.stp_content.find(".stp-content-panel").not(".hidden");
    element.removeClass("hidden");
    return slide_down.on("webkitAnimationEnd", this.down_from_top_complete).addClass("down-to-bottom");
  };

  SidetapIos.prototype.down_from_top_complete = function() {
    var slide_down;
    slide_down = $(".down-to-bottom");
    slide_down.off("webkitAnimationEnd", this.down_from_top_complete).removeClass("down-to-bottom").hide();
    slide_down.addClass("hidden").show();
    return this.animation_callback();
  };

  SidetapIos.prototype.in_from_right = function(element) {
    $(".stp-content-panel").not(".hidden").addClass("slide-out-to-left");
    return element.on("webkitAnimationEnd", this.in_from_right_complete).removeClass("hidden").addClass("slide-in-from-right");
  };

  SidetapIos.prototype.in_from_right_complete = function() {
    $(".slide-out-to-left").addClass("hidden").removeClass("slide-out-to-left");
    $(".slide-in-from-right").off("webkitAnimationEnd", this.in_from_right_complete).removeClass("slide-in-from-right");
    return this.animation_callback();
  };

  SidetapIos.prototype.in_from_left = function(element) {
    $(".stp-content-panel").not(".hidden").addClass("slide-out-to-right");
    return element.on("webkitAnimationEnd", this.in_from_left_complete).removeClass("hidden").addClass("slide-in-from-left");
  };

  SidetapIos.prototype.in_from_left_complete = function() {
    $(".slide-out-to-right").removeClass("slide-out-to-right").addClass("hidden");
    $(".slide-in-from-left").off("webkitAnimationEnd", this.in_from_left_complete).removeClass("slide-in-from-left");
    return this.animation_callback();
  };

  SidetapIos.prototype.animation_callback = function() {
    if (this.pending_callback) {
      this.pending_callback.call();
    }
    return this.pending_callback = null;
  };

  return SidetapIos;

})(SidetapStandard);

/*
  Constructor function for Sidetap
*/

this.sidetap = function() {
  var ios5;
  ios5 = window.SharedWorker && navigator.userAgent.match(/^((?!android).)*webkit.*$/i);
  if (ios5) {
    return new SidetapIos();
  } else {
    return new SidetapStandard();
  }
};
