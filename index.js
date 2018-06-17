"use strict";

function flash(opts) {
  let options = opts || {};
  // apply default options
  let renderTarget = options.element || document.body;
  let duration = options.duration || 800;
  let zIndex = `${options.zIndex || 1000}`;
  let colorFlash = options.colorFlash || 'rgba(255, 255, 255, 1)';
  let colorBlur = options.colorBlur || 'rgba(192, 192, 255, 1)';

  let style = addStyles(colorFlash, colorBlur);
  let w = renderTarget.clientWidth;
  let h = renderTarget.clientHeight;
  let id = `lncontainer-${new Date().getTime()}`;
  let renderContainer = document.createElement('div');
  renderContainer.className = 'lncontainer';
  renderContainer.style.zIndex = zIndex;
  renderContainer.id = id;
  renderTarget.insertBefore(renderContainer, renderTarget.firstChild);

  drawSvgFlash(renderContainer, w, h);
  startAnimation('lnbox0', duration);
  startAnimation('lnbox1', duration);

  setTimeout(function () {
    renderTarget.removeChild(renderContainer);
    document.body.removeChild(style);
  }, duration);
}

function startAnimation(id, duration) {
  document.getElementById(id).style.animationDuration = `${duration / 1000}s`;
  document.getElementById(id).style.animationPlayState = 'running';
}

function drawSvgFlash(renderContainer, w, h) {
  let x = w / 2;
  let y = h / 2;
  let w2 = w / 2;
  let h2 = h / 2;
  let mm2 = Math.max(h2, w2);
  let mm2b = mm2 * Math.sqrt(2);
  let dlx;
  let dly;
  let coords = '';
  let svgs = ['', '', ''];
  let dist = 0;
  let lagom = mm2 / 20;
  let px, py;
  let dir = 0;

  drawPath();
  newPoint();
  let s = [];
  let lx = x;
  let ly = y;
  let ll = 0;
  for (let i = 0; i < 200; i++) {
    xy(x, y);
    if (ll === 10) {
      dist++;
      s.push([dist, dir, lx, ly, x, y]);
    }
    lx = x;
    ly = y;
    dir += 0.75 * 2 * Math.PI * (Math.random() - .5);
    x += Math.sin(dir) * lagom * 0.75 + px;
    y += Math.cos(dir) * lagom * 0.75 + py;
    if (ll > 3 && Math.random() < 0.01 && s.length > 0) {
      drawPath();
      dlx = 0;
      dly = 0;
      [dist, dir, lx, ly, x, y] = s[Math.floor(Math.random() * s.length)];
      xy(lx, ly);
      xy(x, y);
      ll = 0;
    }
    ll++;
  }
  drawPath();
  dlx = 0;
  dly = 0;

  renderContainer.innerHTML = `
    <svg class="lnbox lnbox1" id="lnbox1" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f1" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
        <filter id="f2" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
        <filter id="f3" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
      </defs>
      ${svgs[1]}
    </svg>
    <svg class="lnbox lnbox0" id="lnbox0" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f1" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
        <filter id="f2" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
        <filter id="f3" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
      </defs>
      ${svgs[0]}
    </svg>`;

  function drawPath() {
    let b = '';
    if (dist > 1) {
      b = ' b';
    }
    if (dist > 2) {
      b = ' c';
    }
    if (coords) {
      svgs[1] += `<path  class='ln ln1${b}' d="m ${coords}" fill="none"/>`;
      svgs[0] += `<path  class='ln ln0${b}' d="m ${coords}" fill="none"/>`;
    }
    coords = '';
    dlx = 0;
    dly = 0;
  }

  function xy(x, y) {
    let dx = Math.floor(x - dlx);
    let dy = Math.floor(y - dly);
    coords += ' ' + dx;
    coords += ' ' + dy;
    dlx += dx;
    dly += dy;
  }

  function newPoint() {
    dir = 2 * Math.PI * Math.random();
    dir = 0.5 * Math.PI * (Math.random() - .5);
    px = Math.sin(dir) * lagom * .5;
    py = Math.cos(dir) * lagom * .5;
    x = Math.sin(dir) * -mm2b + w2;
    y = Math.cos(dir) * -mm2b + h2;
  }
}

function addStyles(colorFlash, colorBlur) {
  let sheet = document.createElement('style');
  sheet.innerHTML = `
  svg .ln {
      filter: ' feGaussianBlur in="SourceGraphic" stdDeviation="15" ';
      fill: '#ff0';
  }
  
  svg .ln0 {
      stroke: ${colorFlash};
      stroke-width: 2;
  }
  
  svg .ln0.b {
      stroke-width: 1;
  }
  
  svg .ln0.c {
      stroke-width: .5;
  }
  
  svg .ln1 {
      stroke: ${colorBlur};
      stroke-width: 10;
  }
  
  @keyframes lnanim {
      0% {
          opacity: 1;
          background: rgba(255, 255, 255, .5);
      }
      20% {
          opacity: 1;
          background: rgba(0, 0, 0, .5);
      }
      50% {
          opacity: 1;
          background: rgba(255, 255, 255, .5);
      }
      100% {
          opacity: 0;
          background: rgba(0, 0, 0, 0);
      }
  }
  
  svg.lnbox {
      position: absolute;
      top: 0;
      left: 0;
      animation: lnanim 0.5s ease 0s 1 normal both paused;
  }
  
  svg.lnbox1 {
      filter: blur(13px);
  }`;
  document.body.appendChild(sheet);
  return sheet;
}

module.exports = {
  flash,
};
