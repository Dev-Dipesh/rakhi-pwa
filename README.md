# Rakhi Gift PWA

A beautiful Progressive Web App for the Rakhi (Raksha Bandhan) festival that creates a fun gift-giving experience between brothers and sisters.

## Features

- **Gift Selection Game**: Brother sets min/max amounts, sister selects from 3 surprise envelopes
- **10n+1 Pattern**: All gift amounts follow the traditional pattern (1, 11, 21, 31, etc.)
- **Realistic Envelope Design**: Beautiful animated envelopes with card slide-out effects
- **Progressive Web App**: Optimized for mobile devices with offline support
- **Professional UI**: Clean, modern design with smooth animations

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Motion** (Framer Motion successor) for animations
- **Lucide React** for professional icons

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd rakhi-pwa
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Play

### Setup Mode (Brother)
1. Enter minimum gift amount
2. Enter maximum gift amount
3. Click "Start the Game!"

### Play Mode (Sister)
1. Choose one of the three envelopes
2. Watch the envelope open to reveal your gift amount
3. Enjoy the celebration animation!
4. Click "Play Again!" for a new round

## Project Structure

```
src/
├── components/
│   ├── EnvelopeCard.tsx    # Realistic envelope with animations
│   └── Confetti.tsx        # Celebration effects
├── context/
│   └── GiftContext.tsx     # State management
├── pages/
│   ├── SetupScreen.tsx     # Brother's setup interface
│   └── PlayScreen.tsx      # Sister's game interface
├── utils/
│   ├── generateValidGifts.ts # 10n+1 pattern logic
│   └── cn.ts               # Utility functions
└── App.tsx                 # Main application
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## PWA Features

- Responsive design optimized for mobile
- Fast loading with Vite's optimization
- Clean, professional interface
- Smooth animations and transitions

## Gift Amount Logic

The app generates gift amounts following the 10n+1 pattern:
- Valid amounts: 1, 11, 21, 31, 41, 51, etc.
- System selects 3 random valid amounts within the specified range
- Each envelope contains a different amount

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for Raksha Bandhan celebrations