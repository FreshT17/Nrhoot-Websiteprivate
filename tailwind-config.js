// Shared Tailwind config for every page. Load right after the Tailwind CDN script.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        nrhoot: {
          green:     '#20C897',
          'green-dk':'#249689',
          mint:      '#A8E6CF',
          accent:    '#19DB8A',
          bg:        '#E7F7F4',
          surface:   '#BBEFE1',
          border:    '#E5E5EA',
          gold:      '#FFD700',
          ink:       '#000000',
          'ink-2':   '#3C3C43',
          'ink-3':   '#8E8E93',
        },
      },
      fontFamily: {
        sans:    ['-apple-system','BlinkMacSystemFont','"SF Pro Display"','"Segoe UI"','Helvetica','Arial','sans-serif'],
        display: ['"Fraunces"','Georgia','serif'],
      },
    },
  },
};
