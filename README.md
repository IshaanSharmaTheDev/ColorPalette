# ColorPalette

A color tool with harmony generation, shade builder, contrast checker, and saved swatches.

## Features
- **Color picker** — native color input + manual hex entry
- **Complementary, Triadic, Analogous** — harmony palettes auto-generated
- **Shades** — 7-step light-to-dark gradient for any color
- **Contrast ratio** — WCAG AA check against white
- **Save colors** — build a personal palette saved to localStorage
- **Random color** — generate random hex with one click
- **Copy on double-click** — any swatch copies its hex to clipboard

## Structure
```
src/color.js   # hexToRgb, rgbToHsl, hslToRgb, complementary, triadic, analogous, shades, contrast
src/app.js     # UI, picker, harmony rendering, saved swatches
```

## License
MIT
