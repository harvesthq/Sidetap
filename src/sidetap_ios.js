(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  this.SidetapIos = (function() {
    __extends(SidetapIos, SidetapStandard);
    function SidetapIos() {
      this.down_from_top_complete = __bind(this.down_from_top_complete, this);
      this.in_from_left_complete = __bind(this.in_from_left_complete, this);
      this.in_from_right_complete = __bind(this.in_from_right_complete, this);
      this.up_from_bottom_complete = __bind(this.up_from_bottom_complete, this);
      this.set_window_size_2 = __bind(this.set_window_size_2, this);      $("body").addClass("ios");
      this.ios_5 = true;
      SidetapIos.__super__.constructor.call(this);
    }
    SidetapIos.prototype.set_up_observers = function() {
      this.set_window_size();
      $("header h1").click(__bind(function(evt) {
        return this.show_address_bar(evt);
      }, this));
      $(window).on("orientationchange", __bind(function(evt) {
        return this.set_window_size(evt);
      }, this));
      $(".nav-toggle").click(__bind(function(evt) {
        return this.toggle_nav(evt);
      }, this));
      return $("#stp-overlay").click(__bind(function(evt) {
        return this.toggle_nav(evt);
      }, this));
    };
    SidetapIos.prototype.show_address_bar = function(evt) {
      this.address_bar_showing = true;
      $(".stp-full-height").css("minHeight", 160);
      return setTimeout(this.set_window_size_2, 1);
    };
    SidetapIos.prototype.set_window_size = function() {
      this.address_bar_showing = false;
      $("body").css("paddingBottom", "5000px");
      window.scrollTo(0, 1);
      return setTimeout(this.set_window_size_2, 50);
    };
    SidetapIos.prototype.set_window_size_2 = function() {
      $(".stp-full-height").css("minHeight", window.innerHeight);
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
      return element.on("webkitAnimationEnd", this.up_from_bottom_complete).removeClass("hidden").addClass("slideup-in");
    };
    SidetapIos.prototype.up_from_bottom_complete = function() {
      this.slide_up_previous = $(".stp-content-panel").not(".slideup-in").addClass("hidden");
      $(".slideup-in").off("webkitAnimationEnd", this.up_from_bottom_complete).removeClass("slideup-in");
      return this.animation_callback();
    };
    SidetapIos.prototype.in_from_right = function(element) {
      $(".stp-content-panel").not(".hidden").addClass("slide-out");
      return element.on("webkitAnimationEnd", this.in_from_right_complete).removeClass("hidden").addClass("slide-in");
    };
    SidetapIos.prototype.in_from_right_complete = function() {
      $(".slide-out").addClass("hidden");
      $(".slide-in").off("webkitAnimationEnd", this.in_from_right_complete).removeClass("slide-in");
      return this.animation_callback();
    };
    SidetapIos.prototype.in_from_left = function(element) {
      $(".stp-content-panel").not(".hidden").addClass("slide-out reverse");
      return element.on("webkitAnimationEnd", this.in_from_left_complete).removeClass("hidden slide-out").addClass("slide-in reverse");
    };
    SidetapIos.prototype.in_from_left_complete = function() {
      $(".slide-out").removeClass("slide-in reverse").addClass("hidden");
      $(".slide-in").off("webkitAnimationEnd", this.in_from_left_complete).removeClass("slide-in reverse");
      return this.animation_callback();
    };
    SidetapIos.prototype.down_from_top = function(element) {
      var slide_down;
      slide_down = this.stp_content.find(".stp-content-panel").not(".hidden");
      element.removeClass("hidden");
      return slide_down.on("webkitAnimationEnd", this.down_from_top_complete).addClass("slideup-out-reverse");
    };
    SidetapIos.prototype.down_from_top_complete = function() {
      var slide_down;
      slide_down = $(".slideup-out-reverse");
      slide_down.off("webkitAnimationEnd", this.down_from_top_complete).removeClass("slideup-out-reverse").hide();
      slide_down.addClass("hidden").show();
      return this.animation_callback();
    };
    SidetapIos.prototype.animation_callback = function() {
      if (this.pending_callback) {
        this.pending_callback.call();
      }
      return this.pending_callback = null;
    };
    return SidetapIos;
  })();
}).call(this);
