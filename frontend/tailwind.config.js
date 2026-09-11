export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gov-navy': '#0F172A',
        'gov-teal': '#0D9488',
        'gov-tealHover': '#0F766E',
        'gov-blue': '#2563EB',
        'gov-bg': '#F8FAFC',
        'gov-card': '#FFFFFF',
        'gov-border': '#E2E8F0',
        'text-main': '#1E293B',
        'text-muted': '#64748B',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0,0,0,0.05)',
        'premium': '0 10px 40px -5px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}

