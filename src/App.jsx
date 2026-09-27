import { useState } from 'react'
import Home from '@/pages/Home'
import Game from '@/pages/Game'
import AnimalList from '@/pages/AnimalList'
import BuildTheWord from '@/pages/BuildTheWord'
import ListenAndChoose from '@/pages/ListenAndChoose'
import MissingLetter from '@/pages/MissingLetter'
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
      onOpenMissingLetter={() => setView('missing-letter')}
      onOpenBuildTheWord={() => setView('build-the-word')}
      onOpenListenAndChoose={() => setView('listen-and-choose')}
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
  } else if (view === 'missing-letter') {
    content = <MissingLetter onBack={() => setView('home')} />
  } else if (view === 'build-the-word') {
    content = <BuildTheWord onBack={() => setView('home')} />
  } else if (view === 'listen-and-choose') {
    content = <ListenAndChoose onBack={() => setView('home')} />
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
