const ColorEngine = (() => {
  function hexToRgb(hex) {
    hex = hex.replace('#','');
    if (hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
    const n = parseInt(hex, 16);
    return { r: (n>>16)&255, g: (n>>8)&255, b: n&255 };
  }
  function rgbToHex({r,g,b}) { return '#' + [r,g,b].map(v=>v.toString(16).padStart(2,'0')).join(''); }
  function rgbToHsl({r,g,b}) {
    r/=255; g/=255; b/=255;
    const max=Math.max(r,g,b), min=Math.min(r,g,b);
    let h,s,l=(max+min)/2;
    if (max===min) { h=s=0; } else {
      const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min);
      switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4;}
      h/=6;
    }
    return { h:Math.round(h*360), s:Math.round(s*100), l:Math.round(l*100) };
  }
  function hslToRgb({h,s,l}) {
    s/=100; l/=100;
    const c=(1-Math.abs(2*l-1))*s, x=c*(1-Math.abs((h/60)%2-1)), m=l-c/2;
    let r=0,g=0,b=0;
    if(h<60){r=c;g=x;}else if(h<120){r=x;g=c;}else if(h<180){g=c;b=x;}else if(h<240){g=x;b=c;}else if(h<300){r=x;b=c;}else{r=c;b=x;}
    return {r:Math.round((r+m)*255),g:Math.round((g+m)*255),b:Math.round((b+m)*255)};
  }
  function getLuminance({r,g,b}) {
    const toLinear = c => { c/=255; return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4); };
    return 0.2126*toLinear(r)+0.7152*toLinear(g)+0.0722*toLinear(b);
  }
  function getContrastRatio(c1,c2) {
    const l1=getLuminance(c1), l2=getLuminance(c2);
    const [lighter,darker] = l1>l2?[l1,l2]:[l2,l1];
    return ((lighter+0.05)/(darker+0.05)).toFixed(2);
  }
  function complementary(hex) {
    const hsl = rgbToHsl(hexToRgb(hex));
    return rgbToHex(hslToRgb({...hsl, h:(hsl.h+180)%360}));
  }
  function triadic(hex) {
    const hsl = rgbToHsl(hexToRgb(hex));
    return [120,240].map(d => rgbToHex(hslToRgb({...hsl, h:(hsl.h+d)%360})));
  }
  function analogous(hex) {
    const hsl = rgbToHsl(hexToRgb(hex));
    return [-30,30].map(d => rgbToHex(hslToRgb({...hsl, h:((hsl.h+d)%360+360)%360})));
  }
  function shades(hex, n=7) {
    const hsl = rgbToHsl(hexToRgb(hex));
    return Array.from({length:n},(_,i)=>rgbToHex(hslToRgb({...hsl,l:Math.round((i/(n-1))*90+5)})));
  }
  function isLight(hex) { return getLuminance(hexToRgb(hex)) > 0.4; }
  return { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, getLuminance, getContrastRatio, complementary, triadic, analogous, shades, isLight };
})();
