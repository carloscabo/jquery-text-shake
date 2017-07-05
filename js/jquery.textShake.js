/*!
  JQuery textShake v0.1 by CarlosCabo 05/07/2017
  JQuery plugin that provides some animations to show text
  https://github.com/carloscabo/jquery-text-shake

  Usage:
  $element).textShake({ options })
*/
;(function ($, window, document, undefined) {
  "use strict";

  var pluginName = "textShake",
    defaults = {
      letterdelay: 60,
      autoplay: true,
      callback: null
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.$el = $(element);

    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this._timer = null;
    this._text = '';
    this._pos = 0;
    this._len = 0;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function () {
      var
        $el = this.$el;
      this._text = $el.text();
      this._len = $el.text().length;
      this._pos = 1;
      $el.attr('data-text-rumble', this._text).html('&nbsp;');

      if (this.settings.autoplay) {
        this.play();
      }
    },
    play: function (text) {
      var _t = this;
      setTimeout(function(){

        _t._timer = setInterval(function(){
          if ( _t._pos > _t._len ) {
            _t.$el.text( _t._text );
            clearInterval( _t._timer );
          } else {
            var
              _text = _t._text,
              shuffled = _text.split('').sort(function () { return 0.5 - Math.random() }).join('').substr(2, _t._pos);
            _t.$el.text( shuffled );
            _t._pos++;
          }
        }, _t.settings.letterdelay);

      }, 100);
    }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" +
          pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);
