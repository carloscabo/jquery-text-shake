$(window).load(function() {
  // We use "load" instead of "ready" to be sure the fontfaces in the demo are loaded

  $('.text-1').textShake({
    letter_delay: 200, // ms
    onComplete: function( el ) {

      console.log(el);
      $('.text-3').textShake({
        letter_delay: 10,
        fix_height: true,
        onComplete: function() {
          console.log('done!');
        }
      });

    }
  });

  // Default options
  $('.text-2').textShake({
    fix_height: true
  });

  // $('.text-3').textShake({
  //   direction: -1
  // });


});
