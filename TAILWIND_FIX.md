# Fix Tailwind CSS v4 Error

## Current Error
```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
```

## Solution Steps

### Step 1: Install the Package
Open a terminal in `frontend/frontend` directory and run:

```bash
npm install @tailwindcss/postcss --save-dev
```

### Step 2: Verify PostCSS Config
The `postcss.config.js` should look like this:

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Step 3: Verify CSS Import
The `src/index.css` should start with:

```css
@import "tailwindcss";
```

### Step 4: Restart Dev Server
1. Stop the current dev server (Ctrl+C)
2. Restart it: `npm run dev`

## Alternative Solution: Downgrade to Tailwind v3

If the above doesn't work, you can downgrade to Tailwind CSS v3:

```bash
npm uninstall tailwindcss @tailwindcss/postcss
npm install tailwindcss@^3.4.0 --save-dev
```

Then change `postcss.config.js` to:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

And change `src/index.css` to:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

