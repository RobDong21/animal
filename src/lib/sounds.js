let audioCtx = null

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function playTone(frequency, duration = 0.15, type = 'sine', volume = 0.2) {
  const ctx = getAudioContext()
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.value = frequency
  gain.gain.value = volume

  oscillator.connect(gain)
  gain.connect(ctx.destination)

  oscillator.start()
  oscillator.stop(ctx.currentTime + duration)
}

export function playCorrectSound() {
  playTone(523, 0.12)
  setTimeout(() => playTone(659, 0.12), 100)
  setTimeout(() => playTone(784, 0.18), 200)
}

export function playWrongSound() {
  playTone(220, 0.25, 'triangle', 0.15)
}

export function speakText(text) {
  if (!window.speechSynthesis) return

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 0.85
  utterance.pitch = 1.05
  window.speechSynthesis.speak(utterance)
}

export function speakHabitatName(name) {
  speakText(name)
}

export function speakTypeName(name) {
  speakText(name)
}
