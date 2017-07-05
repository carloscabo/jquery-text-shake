$(window).load(function() {
  // We use "load" instead of "ready" to be sure the fontfaces in the demo are loaded

  console.log('load');

  // Default options


  $('.text-2').textShake();

});

$(document).ready(function(){
  // La magia aquí
  $('.text-1').textShake();
});
