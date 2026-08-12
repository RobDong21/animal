import { useState } from 'react'
import Home from '@/pages/Home'
import Game from '@/pages/Game'
import packageJson from '../package.json'

export default function App() {
  const [view, setView] = useState('home')
  const [gameConfig, setGameConfig] = useState(null)

  const content =
    view === 'game' && gameConfig ? (
      <Game
        roundSize={gameConfig.roundSize}
        onBack={() => {
          setView('home')
          setGameConfig(null)
        }}
      />
    ) : (
      <Home
        onPlay={(config) => {
          setGameConfig(config)
          setView('game')
        }}
      />
    )

  return (
    <>
      {content}
      <span className="pointer-events-none fixed right-2 bottom-[max(0.25rem,env(safe-area-inset-bottom))] z-10 text-xs font-medium text-muted-foreground/60">
        v{packageJson.version}
      </span>
    </>
  )
}
