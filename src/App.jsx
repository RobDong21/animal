import { useState } from 'react'
import Home from '@/pages/Home'
import Game from '@/pages/Game'

export default function App() {
  const [view, setView] = useState('home')
  const [gameConfig, setGameConfig] = useState(null)

  if (view === 'game' && gameConfig) {
    return (
      <Game
        roundSize={gameConfig.roundSize}
        onBack={() => {
          setView('home')
          setGameConfig(null)
        }}
      />
    )
  }

  return (
    <Home
      onPlay={(config) => {
        setGameConfig(config)
        setView('game')
      }}
    />
  )
}
