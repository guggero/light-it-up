# light-it-up

Draw SVG lightning bolts on to any element, creating a flash effect.

## Usage

Just add the library and call the `flash` function:

```html
<html style="height: 100%">
<head>
  <script src="https://raw.githubusercontent.com/guggero/light-it-up/master/index.js"></script>
</head>
<body>
<button onclick="flash({duration: 500})">Flash for 0.5s</button>
</body>
</html>
```

Have a look at the [demo](demo.html) too

### Options:

```javascript
{
  element: document.getElementById('foo'), // element to render into, default: document.body
  duration: 1000, // duration of flash effect in milliseconds, default 800
  zIndex: 9999, // CSS property 'z-index' of the inserted <div>, default 1000
  colorFlash: '#ffffff', // color of the flash, default rgba(255, 255, 255, 1)
  colorBlur: '#333333', // color of the blur effect, default rgba(192, 192, 255, 1)
}
```

##  Credits

This code was initially written by [robtex](https://github.com/robtex)
for [moneni.com](https://moneni.com/) and was refactored into an NPM library
with his permission.
