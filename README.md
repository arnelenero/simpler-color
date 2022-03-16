# Simpler Color

Create your own complete color system fast and easy!

Color is at the heart of every UI design system. A cohesive **color system** enables your application to:

- **consistently** express brand identity and style
- **effectively** communicate intent and meaning

Simpler Color makes it super easy to implement your own color system, no matter what platform, framework, or UI library you are using. It comes as a JavaScript/TypeScript library that works on both browser and Node.

## Easy as 1-2-3!

**Step 1:** Install simpler-color

```
npm install simpler-color
```

**Step 2:** Define your color palettes and their corresponding base colors

```js
const baseColors = {
  primary: '#336669',
  secondary: '#57614E',
  neutral: '#5E5F5A',
}
```

**Step 3:** Create your color scheme(s) by mapping UI roles to specific colors from your palettes

```js
import { colorScheme } from 'simpler-color'

const lightScheme = colorScheme(baseColors, colors => ({
  primaryButton: colors.primary(40),
  primaryButtonText: colors.primary(95),
  surface: colors.neutral(98),
  text: colors.neutral(10),
}))
```

If some of those terms sound alien to you, read on...

## Key Concepts

We're not gonna discuss Color Theory here, but let's talk a bit about what a proper color system comprises.

### Color Palette

Creating your color system begins with building your _color palettes_. Each palette consists of a group of related colors, generated from one _base color_.

You decide what sort of relationship should be between colors in the palette. The most common type is the _tonal palette_ (also called _monochromatic_), which is made up of various "tones" of the same general hue. For example, various shades of blue is a tonal palette.

[Illustration: shades of blue with varying lightness]

### Color Set

The _color set_ is simply the collective term for all the color palettes you've built.

Typically a color set would have a _primary_ palette. This represents the main "brand" color of your app. This is the most prominent hue across your UI.

Common additional palettes can be any of (but not limited to) these:

- _secondary_: less prominent, usually more muted
- _accent_: usually complementary (opposite) to primary, to provide contrast
- _neutral_: typically shades of gray or similar neutral tones
