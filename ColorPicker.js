const body = document.querySelector('body');
const clickMeButton = document.querySelector('.clickme');
const titleAndColor = document.querySelector('header');
const hexButton = document.querySelector('.hexadecimal');
const rgbButton = document.querySelector('.rgb');
const hslButton = document.querySelector('.hsl');

let hexOn = true;
let rgbOn = false;
let hslOn = false;

let hexColor = '#FFFFFF';
let rgbColor = '(255, 255, 255)';
let hslColor = 'hsl(0, 0%, 100%)';

titleAndColor.innerText = `Color: ${hexColor}`;

hexButton.addEventListener('click', (event) => {
  if (!hexOn) {
    hexOn = true;
    rgbOn = false;
    hslOn = false;
    titleAndColor.innerText = `Color: ${hexColor}`
  }
});

rgbButton.addEventListener('click', (event) => {
  if (!rgbOn) {
    hexOn = false;
    rgbOn = true;
    hslOn = false;
    rgbColor = hexToRgb(hexColor);
    titleAndColor.innerText = `Color: ${rgbColor}`;
  }
})

hslButton.addEventListener('click', (event) => {
  if (!hslOn) {
    hexOn = false;
    rgbOn = false;
    hslOn = true;
    hslColor = hexToHsl(hexColor);
    titleAndColor.innerText = `Color: ${hslColor}`;
  }
})

clickMeButton.addEventListener('click', (event) => {

  body.style.backgroundColor = hexColorRandomizer();

  if (!clickMeButton.classList.contains('buttonClick')) {
    clickMeButton.classList.add('buttonClick');
  }

  if (!titleAndColor.classList.contains('headerAfter')) {
    titleAndColor.classList.add('headerAfter');
  }
});

function hexColorRandomizer() {
  hexColor = '#';
  while (hexColor.length < 7) {
    hexColor += hexCharRandomizer();
  }
  
  rgbColor = hexToRgb(hexColor);
  hslColor = hexToHsl(hexColor);

  if (hexOn) {
    titleAndColor.innerText = `Color: ${hexColor}`
  } else if (rgbOn) {
    titleAndColor.innerText = `Color: ${rgbColor}`
  } else if (hslOn) {
    titleAndColor.innerText = `Color: ${hslColor}`
  }
  
  return hexColor
}

function hexToRgb(hex) {
  // Remove the hash, if present
  hex = hex.replace(/^#/, '');

  // Parse the hex value into separate RGB components
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the RGB values as an object
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHsl(hex) {
  // Remove the hash, if present
  hex = hex.replace(/^#/, '');

  // Convert hex to RGB
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Convert RGB to HSL
  const rNormalized = r / 255;
  const gNormalized = g / 255;
  const bNormalized = b / 255;

  const cMax = Math.max(rNormalized, gNormalized, bNormalized);
  const cMin = Math.min(rNormalized, gNormalized, bNormalized);
  const delta = cMax - cMin;

  let h = 0;
  let s = 0;
  let l = (cMax + cMin) / 2;

    // calculate saturation
    if (delta !== 0) {
      if (l < 0.5) {
        s = delta / (cMax + cMin);
      } else {
        s = delta / (2 - cMax - cMin);
      }
  
      // calculate hue
      switch (cMax) {
        case rNormalized:
          h = ((gNormalized - bNormalized) / delta) % 6;
          break;
        case gNormalized:
          h = ((bNormalized - rNormalized) / delta) + 2;
          break;
        case bNormalized:
          h = ((rNormalized - gNormalized) / delta) + 4;
          break;
      }
  
      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }
  
    s = +(s * 100).toFixed(0);
    l = +(l * 100).toFixed(0);
  
    return `hsl(${h}, ${s}%, ${l}%)`;
  
}

function hexCharRandomizer() {
  const randomNum = Math.floor(Math.random() * 16);
  const hexChars = '0123456789ABCDEF'
  return hexChars[randomNum];
}