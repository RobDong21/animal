import { useState } from 'react'
import Home from '@/pages/Home'
import Game from '@/pages/Game'
import AnimalList from '@/pages/AnimalList'
import StartersWordList from '@/pages/StartersWordList'
import StartersWords from '@/pages/StartersWords'
import packageJson from '../package.json'

export default function App() {
  const [view, setView] = useState('home')
  const [gameConfig, setGameConfig] = useState(null)

  let content = (
    <Home
      onPlay={(config) => {
        setGameConfig(config)
        setView('game')
      }}
      onOpenStarters={() => setView('starters')}
      onOpenAnimalList={() => setView('animal-list')}
      onOpenWordList={() => setView('word-list')}
    />
  )

  if (view === 'game' && gameConfig) {
    content = (
      <Game
        mode={gameConfig.mode}
        roundSize={gameConfig.roundSize}
        onBack={() => {
          setView('home')
          setGameConfig(null)
        }}
      />
    )
  } else if (view === 'starters') {
    content = <StartersWords onBack={() => setView('home')} />
  } else if (view === 'animal-list') {
    content = <AnimalList onBack={() => setView('home')} />
  } else if (view === 'word-list') {
    content = <StartersWordList onBack={() => setView('home')} />
  }

  return (
    <>
      {content}
      <span className="pointer-events-none fixed right-2 bottom-[max(0.25rem,env(safe-area-inset-bottom))] z-10 text-xs font-medium text-muted-foreground/60">
        v{packageJson.version}
      </span>
    </>
  )
}
