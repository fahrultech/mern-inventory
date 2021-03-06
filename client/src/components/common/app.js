/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable new-parens */
/* eslint-disable strict */
/* eslint-disable no-unused-expressions */
/**
* Theme: Appzia Admin Template
* Author: Themesdesign
* Module/App: Main Js
*/
import jQuery from 'jquery'
window.$ = jQuery
window.jQuery = jQuery

const App = () => {
!function($) {
    "use strict";
    class Sidemenu {
        constructor() {
            this.$body = $("body"),
            this.$openLeftBtn = $(".open-left"),
            this.$menuItem = $("#sidebar-menu a");
        }
        openLeftBar() {
            $("#wrapper").toggleClass("enlarged");
            $("#wrapper").addClass("forced");
            if ($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
                $("body").removeClass("fixed-left").addClass("fixed-left-void");
            }
            else if (!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
                $("body").removeClass("fixed-left-void").addClass("fixed-left");
            }
            if ($("#wrapper").hasClass("enlarged")) {
                $(".left ul").removeAttr("style");
            }
            else {
                $(".subdrop").siblings("ul:first").show();
            }
            toggle_slimscroll(".slimscrollleft");
            $("body").trigger("resize");
        }
        //menu item click
        menuItemClick(e) {
            $.each($(this).parent("li").parent("ul").children("li").children("a"), function(key, value){
                if($(value).hasClass("active")){
                    $(value).removeClass("active")
                }
            });
            $(this).addClass("active");
            if (!$("#wrapper").hasClass("enlarged")) {
                if ($(this).parent().hasClass("has_sub")) {
                    e.preventDefault();
                }
                if (!$(this).hasClass("subdrop")) {
                    // hide any open menus and remove all other classes
                    $("ul", $(this).parents("ul:first")).slideUp(350);
                    $("a", $(this).parents("ul:first")).removeClass("subdrop");
                    $("#sidebar-menu .pull-right i").removeClass("mdi-minus").addClass("mdi-plus");
                    // open our new menu and add the open class
                    $(this).next("ul").slideDown(350);
                    $(this).addClass("subdrop");
                    $(".pull-right i", $(this).parents(".has_sub:last")).removeClass("mdi-plus").addClass("mdi-minus");
                    $(".pull-right i", $(this).siblings("ul")).removeClass("mdi-minus").addClass("mdi-plus");
                }
                else if ($(this).hasClass("subdrop")) {
                    $(this).removeClass("subdrop");
                    $(this).next("ul").slideUp(350);
                    $(".pull-right i", $(this).parent()).removeClass("mdi-minus").addClass("mdi-plus");
                }
            }
        }
        //init sidemenu
        init() {
            var $this = this;
            //bind on click
            $(".open-left").click(function (e) {
                e.stopPropagation();
                $this.openLeftBar();
            });
            // LEFT SIDE MAIN NAVIGATION
            $this.$menuItem.on('click', $this.menuItemClick);
            // NAVIGATION HIGHLIGHT & OPEN PARENT
            $("#sidebar-menu ul li.has_sub a.active").parents("li:last").children("a:first").addClass("active").trigger("click");
        }
    }

    //init Sidemenu
    $.Sidemenu = new Sidemenu, $.Sidemenu.Constructor = Sidemenu

}(window.jQuery),


function($) {
    "use strict";

    class FullScreen {
        constructor() {
            this.$body = $("body"),
                this.$fullscreenBtn = $("#btn-fullscreen");
        }
        //turn on full screen
        // Thanks to http://davidwalsh.name/fullscreen
        launchFullscreen(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            }
            else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
            else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
            else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
        exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
        //toggle screen
        toggle_fullscreen() {
            var $this = this;
            var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
            if (fullscreenEnabled) {
                if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                    $this.launchFullscreen(document.documentElement);
                }
                else {
                    $this.exitFullscreen();
                }
            }
        }
        //init sidemenu
        init() {
            var $this = this;
            //bind
            $this.$fullscreenBtn.on('click', function () {
                $this.toggle_fullscreen();
            });
        }
    }
     //init FullScreen
    $.FullScreen = new FullScreen, $.FullScreen.Constructor = FullScreen

}(window.jQuery),

//portlets
function($) {
    "use strict";
    /**
        Portlet Widget
        */
    class Portlet {
        constructor() {
            this.$body = $("body"),
                this.$portletIdentifier = ".portlet",
                this.$portletCloser = '.portlet a[data-toggle="remove"]',
                this.$portletRefresher = '.portlet a[data-toggle="reload"]';
        }
        //on init
        init() {
            // Panel closest
            var $this = this;
            $(document).on("click", this.$portletCloser, function (ev) {
                ev.preventDefault();
                var $portlet = $(this).closest($this.$portletIdentifier);
                var $portlet_parent = $portlet.parent();
                $portlet.remove();
                if ($portlet_parent.children().length === 0) {
                    $portlet_parent.remove();
                }
            });
            // Panel Reload
            $(document).on("click", this.$portletRefresher, function (ev) {
                ev.preventDefault();
                var $portlet = $(this).closest($this.$portletIdentifier);
                // This is just a simulation, nothing is going to be reloaded
                $portlet.append('<div class="panel-disabled"><div class="loader-1"></div></div>');
                var $pd = $portlet.find('.panel-disabled');
                setTimeout(function () {
                    $pd.fadeOut('fast', function () {
                        $pd.remove();
                    });
                }, 500 + 300 * (Math.random() * 5));
            });
        }
    }

    //
    $.Portlet = new Portlet, $.Portlet.Constructor = Portlet

}(window.jQuery),

//main app module
 function($) {
    "use strict";

    class MoltranApp {
        constructor() {
            this.VERSION = "1.0.0",
                this.AUTHOR = "ThemesDesign",
                this.SUPPORT = "#",
                this.pageScrollElement = "html, body",
                this.$body = $("body");
        }
        //initializing tooltip
        initTooltipPlugin() {
            $.fn.tooltip && $('[data-toggle="tooltip"]').tooltip();
        }
        //initializing popover
        initPopoverPlugin() {
            $.fn.popover && $('[data-toggle="popover"]').popover();
        }
        //initializing nicescroll
        initNiceScrollPlugin() {
            //You can change the color of scroll bar here
            $.fn.niceScroll && $(".nicescroll").niceScroll({ cursorcolor: '#9d9ea5', cursorborderradius: '0px' });
        }
        //on doc load
        //initilizing
        init() {
            var $this = this;
            this.initTooltipPlugin(),
                this.initPopoverPlugin(),
                this.initNiceScrollPlugin(),
                //document load initialization
                $(document).ready($this.onDocReady);
            //creating portles
            $.Portlet.init();
            //init side bar - left
            $.Sidemenu.init();
            //init fullscreen
            $.FullScreen.init();
        }
    }

    $.MoltranApp = new MoltranApp, $.MoltranApp.Constructor = MoltranApp

}(window.jQuery),

//initializing main application module
function($) {
    "use strict";
    $.MoltranApp.init();
}(window.jQuery);
/* ------------ some utility functions ----------------------- */
//this full screen
var toggle_fullscreen = function () {

}
function executeFunctionByName(functionName, context /*, args */) {
  var args = [].slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(this, args);
}
var w,h,dw,dh;
var changeptype = function(){
    w = $(window).width();
    h = $(window).height();
    dw = $(document).width();
    dh = $(document).height();

    if(jQuery.browser.mobile === true){
        $("body").addClass("mobile").removeClass("fixed-left");
    }

    if(!$("#wrapper").hasClass("forced")){
      if(w > 1024){
        $("body").removeClass("smallscreen").addClass("widescreen");
          $("#wrapper").removeClass("enlarged");
      }else{
        $("body").removeClass("widescreen").addClass("smallscreen");
        $("#wrapper").addClass("enlarged");
        $(".left ul").removeAttr("style");
      }
      if($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")){
        $("body").removeClass("fixed-left").addClass("fixed-left-void");
      }else if(!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")){
        $("body").removeClass("fixed-left-void").addClass("fixed-left");
      }

  }
  toggle_slimscroll(".slimscrollleft");
}
var debounce = function(func, wait, immediate) {
  var timeout, result;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
}

function resizeitems(){
  if($.isArray(Menufunction)){
    for (var i = 0; i < Menufunction.length; i++) {
        window[Menufunction[i]]();
    }
  }
}

function initscrolls(){
    if(jQuery.browser.mobile !== true){
      //SLIM SCROLL
      $('.slimscroller').slimscroll({
        height: 'auto',
        size: "5px"
      });

      $('.slimscrollleft').slimScroll({
          height: 'auto',
          position: 'right',
          size: "5px",
          color: '#7A868F',
          wheelStep: 5
      });
  }
}
function toggle_slimscroll(item){
    if($("#wrapper").hasClass("enlarged")){
      $(item).css("overflow","inherit").parent().css("overflow","inherit");
      $(item).siblings(".slimScrollBar").css("visibility","hidden");
    }else{
      $(item).css("overflow","hidden").parent().css("overflow","hidden");
      $(item).siblings(".slimScrollBar").css("visibility","visible");
    }
}

$(document).ready(function() {
    $("#sidebar-menu a").each(function() {
        if (this.href === window.location.href) {
            //$(this).addClass("active");
            //$(this).parent().addClass("active"); // add active to li of the current link
            //$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
            //$(this).parent().parent().prev().trigger('click'); // click the item to make it drop
        }
    });
});

// App Init
var Menufunction = [];
}
export default App