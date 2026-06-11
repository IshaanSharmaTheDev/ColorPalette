# ColorPalette

A color palette generator and explorer. Enter a hex code, upload an image, or just browse — it generates harmonious palettes and gives you the values in every format you need.

I made this because I'm always going between hex, RGB, and HSL when building UIs and I wanted one place to do all of it without 5 different browser tabs open.

## What it does

- Enter any hex code → generates complementary, analogous, triadic, and split-complementary palettes
- Upload an image → extracts the dominant colors from it (useful for matching a brand or photo)
- Click any color → copies it to clipboard in hex, RGB, or HSL depending on what you selected
- Color blindness simulator — preview your palette as someone with deuteranopia/protanopia would see it
- Contrast checker — tells you if text on a background passes WCAG AA/AAA
- Gradient generator between any two colors in the palette

## How to run

```
git clone https://github.com/AadhhyaSharma/ColorPalette
cd ColorPalette
# open index.html
```

No backend, no API calls. The image color extraction uses the Canvas API to read pixel data locally — your images don't go anywhere.

## The image extraction

The dominant color algorithm works by downscaling the image to a small thumbnail via canvas, then running k-means clustering on the pixel colors. It's not perfect — very complex images with gradients sometimes give weird results — but for most photos and logos it's pretty good.

## Tech

Vanilla JS + Canvas API. No npm, no build step.

---

This has saved me a lot of time when working on frontend stuff. 
