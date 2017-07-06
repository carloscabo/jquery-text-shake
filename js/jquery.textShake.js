/*!
  JQuery textShake v0.1 by CarlosCabo 05/07/2017
  JQuery plugin that provides some animations to show text
  https://github.com/carloscabo/jquery-text-shake

  Usage:
  $element).textShake({ options });
*/
;(function ($, window, document, undefined) {
  "use strict";

  var
    pluginName = "textShake",
    defaults = {
      letter_delay: 60,
      split_words: 8,
      autoplay: true,
      fix_heght: false,
      onComplete: null,
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

      if (this.settings.fix_height) {
        this.$el.css('height', this.$el.height());
      }

      this._text = $el.text().replace(/^\s+|\s+$/g, ''); // Trim including breaklines
      this._len  = $el.text().length;
      $el.attr('data-text-shake', this._text).html('&nbsp;');

      if (this.settings.autoplay) {
        this.play();
      }

    },

    play: function (text) {
      var _t = this;

      clearInterval(_t._timer);
      this._pos = 1;
      _t.$el.attr('data-text-shake', _t._text).html('&nbsp;');

      _t._timer = setInterval(function(){
        if ( _t._pos > _t._len ) {
          _t.$el.text( _t._text );
          clearInterval( _t._timer );
          if (typeof _t.settings.onComplete === 'function') {
            _t.settings.onComplete( this );
          }
        } else {
          var
            _text = _t._text,
            shuffled = _text.split('').sort(function () { return 0.5 - Math.random() }).join('').replace(/\s\s+/g, ' ').substr(2, _t._pos);
          // console.log(shuffled);

          // Split long words with spaces
          if (_t.settings.split_words) {
            var
              words = shuffled.trim().split(' '),
              done = false;
            for (var i = 0, len = words.length; i < len; i++) {
              var
                word = words[i];
              if (word.length > _t.settings.split_words ) {
                // console.log(words);
                // debugger;
                // Replace every n char with space, splits the
                var word_splitted = word.replace(new RegExp('(' + '.'.repeat(_t.settings.split_words) + ').', 'g'), "$1 ").trim().split();
                // Replaces orginal word by spitted one
                Array.prototype.splice.apply(words, [i, 1].concat(word_splitted));

                done = true;
              }

            }
            if ( done ) {
              shuffled = words.join(' ');
            }
          }
          _t.$el.text( shuffled );
          _t._pos++;
        }
      }, _t.settings.letter_delay);

    }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( methodOrOptions ) {
    return this.each( function() {
      if ( typeof methodOrOptions === 'object' || !methodOrOptions ) {
        if ( !$.data(this, pluginName) ) {
          $.data(this, pluginName, new Plugin(this, methodOrOptions));
        }
      } else if ( Plugin[methodOrOptions] ) {
        return Plugin[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        $.error('Method ' + methodOrOptions + ' does not exist on jQuery.' + pluginName);
      }

    });
  };


})(jQuery, window, document);
