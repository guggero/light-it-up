
"use strict";

function flash(o) {

  let e2 = o.element;
  let w = parseInt(e2.clientWidth,10);
  let h = parseInt(e2.clientHeight,10);
  let e = document.createElement('div');
  e2.insertBefore(e, e2.firstChild);
  //e.style.height='0px';
  e.style.zOrder = '1000';
  //    e2.appendChild(e);
  zflash(o);
  //        setInterval(()=>{zflash(o);},1000);

  function zflash(o) {
    console.log(`flash ${w}x${h}`);
    let fl = 0;

    //    console.log(e);

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
    function d() {
      let b = '';
      if (dist > 1)
        b = ' b';
      if (dist > 2)
        b = ' c';
      if (coords) {
        svgs[2] += `<path  class='ln ln2${b}' d="m ${coords}" fill="none"/>`;
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
    d();

    let lagom = mm2 / 20;
    let px, py;
    let dir = 0;
    function newp() {
      dir = 2 * Math.PI * Math.random();
      dir = 0.5 * Math.PI * (Math.random() - .5);
      px = Math.sin(dir) * lagom * .5;
      py = Math.cos(dir) * lagom * .5;
      x = Math.sin(dir) * -mm2b + w2;
      y = Math.cos(dir) * -mm2b + h2;
      //px=py=0;
    }
    newp();
    let s = [];
    let lx = x;
    let ly = y;
    let ll = 0;
    for (let i = 0; i < 200; i++) {
      xy(x, y);
      //if (Math.random() < 0.01)
      if (ll == 10) {
        dist++;
        s.push([dist, dir, lx, ly, x, y]);
      }
      lx = x;
      ly = y;
      dir += 0.75 * 2 * Math.PI * (Math.random() - .5);
      x += Math.sin(dir) * lagom * 0.75 + px;
      y += Math.cos(dir) * lagom * 0.75 + py;
      if (ll > 3 && Math.random() < 0.01 && s.length > 0) {
        d();
        [dist,dir,lx,ly,x,y] = // s.splice(Math.random() * s.length, 1)[0];
          s[Math.floor(Math.random() * s.length)];
        xy(lx, ly);
        xy(x, y);
        ll = 0;
      }
      ll++;
    }
    d();

    let svg0 = '';

    svg0 += `<svg class="lnbox lnbox0" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;

    svg0 += `

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
`;

    svg0 += svgs[0];
    svg0 += `</svg>`;

    let svg1 = '';

    svg1 += `<svg class="lnbox lnbox1" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;

    svg1 += `

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
`;

    svg1 += svgs[1];
    svg1 += `</svg>`;

    //    console.log(svg);
    e.innerHTML = `${svg1}${svg0}`;

  }
}


window['flash']=flash;


function myreload(event)
{
  if(event) event.preventDefault();
  let    e=document.getElementById('postreload');
  e.submit();
}

function togglemenu(event)
{
  if(event) event.preventDefault();
  let e=    document.getElementById('mainmenu');
  e.classList.toggle("selected");

}

function flipvis(event,x)
{
  if(event) event.preventDefault();
  for(let i of x)
  {
    let e=document.getElementById(i);
    if(e)
    {
//        console.log(e.style);
      if(e.style.display=='none')  e.style.display='';
      else
        e.style.display='none';
    }
  }
}

function hid()
{
  if(!document.body.classList.contains("paid"))
  {
    document.body.classList.add('loading');
    document.body.classList.remove('ready');
  }
}

window.addEventListener("beforeunload", hid);
window.addEventListener("unload", hid);
window.addEventListener("pagehide",  hid);


