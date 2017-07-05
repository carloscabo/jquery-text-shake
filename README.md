# JQuery textShake v0.1
JQuery plugin that provides some animations to show text

![Smple](sample.gif)

# Requirements

- JQuery 1.7+

# Usage
```
$(element).textShake(); // Default options
```

Available options.

```
$(element).textShake({
  letter_delay: 60,
  split_words: 8,
  autoplay: true,
  fix_heght: false,
  onComplete: function( obj ) {
    console.log(obj);
  }
});
```



