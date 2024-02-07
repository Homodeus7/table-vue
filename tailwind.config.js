module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'tory-blue': '#1253a2',
        'dodger-blue': '#2f8cff',
        'pigeon-post': '#a6b7d4',
        'pale-grey': '#eeeff1',
        'catskill-white': '#FBFCFD'
      },
      spacing: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      dropShadow: {
        main: '3px 2px 2px rgba(0, 0, 0, 0.2)'
      }
    }
  },
  plugins: []
}
