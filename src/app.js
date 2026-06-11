(function(){
  'use strict';
  let saved = JSON.parse(localStorage.getItem('cp_saved') || '[]');

  function showColor(hex) {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return;
    const rgb = ColorEngine.hexToRgb(hex);
    const hsl = ColorEngine.rgbToHsl(rgb);
    document.getElementById('color-picker').value = hex;
    document.getElementById('hex-input').value = hex;
    document.getElementById('rgb-display').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('hsl-display').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    const contrast = ColorEngine.getContrastRatio(rgb, {r:255,g:255,b:255});
    document.getElementById('contrast-display').textContent = `Contrast vs white: ${contrast}:1 ${parseFloat(contrast)>=4.5?'✓ AA':'✗ AA'}`;
    document.getElementById('color-swatch').style.background = hex;
    document.getElementById('color-swatch').style.color = ColorEngine.isLight(hex) ? '#111' : '#fff';

    const comp = ColorEngine.complementary(hex);
    const [tri1,tri2] = ColorEngine.triadic(hex);
    const [an1,an2] = ColorEngine.analogous(hex);
    renderPaletteRow('Complementary', [hex, comp]);
    renderPaletteRow('Triadic', [hex, tri1, tri2]);
    renderPaletteRow('Analogous', [an1, hex, an2]);
    renderPaletteRow('Shades', ColorEngine.shades(hex));
  }

  function renderPaletteRow(label, colors) {
    const map = {'Complementary':'comp-row','Triadic':'tri-row','Analogous':'an-row','Shades':'shades-row'};
    const row = document.getElementById(map[label]);
    row.innerHTML = colors.map(c =>
      `<div class="swatch-cell" style="background:${c};color:${ColorEngine.isLight(c)?'#111':'#fff'}" title="${c}" data-hex="${c}">
        <span class="swatch-hex">${c}</span>
      </div>`
    ).join('');
    row.querySelectorAll('.swatch-cell').forEach(s => {
      s.addEventListener('click', () => { showColor(s.dataset.hex); document.getElementById('hex-input').value = s.dataset.hex; });
      s.addEventListener('dblclick', () => navigator.clipboard.writeText(s.dataset.hex));
    });
  }

  function init() {
    const picker = document.getElementById('color-picker');
    const hexIn = document.getElementById('hex-input');
    picker.addEventListener('input', () => showColor(picker.value));
    hexIn.addEventListener('input', () => { if (/^#[0-9a-f]{6}$/i.test(hexIn.value)) { picker.value = hexIn.value; showColor(hexIn.value); } });
    document.getElementById('btn-save').addEventListener('click', () => {
      const hex = document.getElementById('hex-input').value;
      if (!saved.includes(hex)) { saved.push(hex); localStorage.setItem('cp_saved',JSON.stringify(saved)); renderSaved(); }
    });
    document.getElementById('btn-random').addEventListener('click', () => {
      const hex = '#' + Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0');
      document.getElementById('color-picker').value = hex;
      document.getElementById('hex-input').value = hex;
      showColor(hex);
    });
    renderSaved();
    showColor('#4a90d9');
  }

  function renderSaved() {
    const list = document.getElementById('saved-list');
    list.innerHTML = saved.map(c =>
      `<div class="saved-swatch" style="background:${c}" title="${c}" data-hex="${c}"></div>`
    ).join('') || '<span style="color:#555;font-size:12px">No saved colors</span>';
    list.querySelectorAll('.saved-swatch').forEach(s => s.addEventListener('click', ()=>showColor(s.dataset.hex)));
  }

  document.addEventListener('DOMContentLoaded', init);
})();
