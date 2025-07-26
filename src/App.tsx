import { GiftProvider, useGift } from './context/GiftContext';
import SetupScreen from './pages/SetupScreen';
import PlayScreen from './pages/PlayScreen';

function AppContent() {
  const { mode } = useGift();
  
  return (
    <div className="font-sans antialiased">
      {mode === 'setup' ? <SetupScreen /> : <PlayScreen />}
    </div>
  );
}

function App() {
  return (
    <GiftProvider>
      <AppContent />
    </GiftProvider>
  );
}

export default App;
