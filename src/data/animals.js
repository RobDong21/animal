export const habitats = [
  { id: 'home', name: 'Home' },
  { id: 'farm', name: 'Farm' },
  { id: 'forest', name: 'Forest' },
  { id: 'ocean', name: 'Ocean' },
  { id: 'desert', name: 'Desert' },
  { id: 'jungle', name: 'Jungle' },
  { id: 'polar', name: 'Polar' },
  { id: 'savannah', name: 'Savannah' },
]

export const animals = [
  // Home (5)
  { id: 'dog', name: 'Dog', habitats: ['home', 'farm'], image: '/animals/dog.jpg' },
  { id: 'cat', name: 'Cat', habitats: ['home', 'farm'], image: '/animals/cat.jpg' },
  { id: 'goldfish', name: 'Goldfish', habitats: ['home'], image: '/animals/goldfish.jpg' },
  { id: 'hamster', name: 'Hamster', habitats: ['home'], image: '/animals/hamster.jpg' },
  { id: 'parrot', name: 'Parrot', habitats: ['home', 'jungle'], image: '/animals/parrot.jpg' },
  { id: 'rabbit', name: 'Rabbit', habitats: ['home', 'farm', 'forest'], image: '/animals/rabbit.jpg' },
  { id: 'mouse', name: 'Mouse', habitats: ['home', 'farm'], image: '/animals/mouse.jpg' },
  { id: 'butterfly', name: 'Butterfly', habitats: ['home', 'farm', 'forest'], image: '/animals/butterfly.jpg' },
  { id: 'ladybug', name: 'Ladybug', habitats: ['home', 'farm', 'forest'], image: '/animals/ladybug.jpg' },
  { id: 'snail', name: 'Snail', habitats: ['home', 'farm', 'forest'], image: '/animals/snail.jpg' },

  // Farm (10)
  { id: 'cow', name: 'Cow', habitats: ['farm'], image: '/animals/cow.jpg' },
  { id: 'pig', name: 'Pig', habitats: ['farm'], image: '/animals/pig.jpg' },
  { id: 'chicken', name: 'Chicken', habitats: ['farm'], image: '/animals/chicken.jpg' },
  { id: 'horse', name: 'Horse', habitats: ['farm'], image: '/animals/horse.jpg' },
  { id: 'sheep', name: 'Sheep', habitats: ['farm'], image: '/animals/sheep.jpg' },
  { id: 'goat', name: 'Goat', habitats: ['farm'], image: '/animals/goat.jpg' },
  { id: 'duck', name: 'Duck', habitats: ['farm'], image: '/animals/duck.jpg' },
  { id: 'donkey', name: 'Donkey', habitats: ['farm'], image: '/animals/donkey.jpg' },
  { id: 'rooster', name: 'Rooster', habitats: ['farm'], image: '/animals/rooster.jpg' },
  { id: 'turkey', name: 'Turkey', habitats: ['farm', 'forest'], image: '/animals/turkey.jpg' },
  { id: 'frog', name: 'Frog', habitats: ['farm', 'forest'], image: '/animals/frog.jpg' },
  { id: 'bee', name: 'Bee', habitats: ['farm', 'forest'], image: '/animals/bee.jpg' },
  { id: 'peacock', name: 'Peacock', habitats: ['farm', 'jungle'], image: '/animals/peacock.jpg' },

  // Forest (10)
  { id: 'bear', name: 'Bear', habitats: ['forest'], image: '/animals/bear.jpg' },
  { id: 'deer', name: 'Deer', habitats: ['forest'], image: '/animals/deer.jpg' },
  { id: 'fox', name: 'Fox', habitats: ['forest'], image: '/animals/fox.jpg' },
  { id: 'owl', name: 'Owl', habitats: ['forest'], image: '/animals/owl.jpg' },
  { id: 'squirrel', name: 'Squirrel', habitats: ['forest'], image: '/animals/squirrel.jpg' },
  { id: 'wolf', name: 'Wolf', habitats: ['forest'], image: '/animals/wolf.jpg' },
  { id: 'raccoon', name: 'Raccoon', habitats: ['forest'], image: '/animals/raccoon.jpg' },
  { id: 'woodpecker', name: 'Woodpecker', habitats: ['forest'], image: '/animals/woodpecker.jpg' },
  { id: 'hedgehog', name: 'Hedgehog', habitats: ['forest'], image: '/animals/hedgehog.jpg' },
  { id: 'badger', name: 'Badger', habitats: ['forest'], image: '/animals/badger.jpg' },
  { id: 'panda', name: 'Panda', habitats: ['forest', 'jungle'], image: '/animals/panda.jpg' },
  { id: 'koala', name: 'Koala', habitats: ['forest', 'jungle'], image: '/animals/koala.jpg' },
  { id: 'turtle', name: 'Turtle', habitats: ['forest', 'ocean'], image: '/animals/turtle.jpg' },

  // Ocean (10)
  { id: 'dolphin', name: 'Dolphin', habitats: ['ocean'], image: '/animals/dolphin.jpg' },
  { id: 'whale', name: 'Whale', habitats: ['ocean', 'polar'], image: '/animals/whale.jpg' },
  { id: 'shark', name: 'Shark', habitats: ['ocean'], image: '/animals/shark.jpg' },
  { id: 'octopus', name: 'Octopus', habitats: ['ocean'], image: '/animals/octopus.jpg' },
  { id: 'sea-turtle', name: 'Sea Turtle', habitats: ['ocean'], image: '/animals/sea-turtle.jpg' },
  { id: 'jellyfish', name: 'Jellyfish', habitats: ['ocean'], image: '/animals/jellyfish.jpg' },
  { id: 'clownfish', name: 'Clownfish', habitats: ['ocean'], image: '/animals/clownfish.jpg' },
  { id: 'seahorse', name: 'Seahorse', habitats: ['ocean'], image: '/animals/seahorse.jpg' },
  { id: 'starfish', name: 'Starfish', habitats: ['ocean'], image: '/animals/starfish.jpg' },
  { id: 'crab', name: 'Crab', habitats: ['ocean'], image: '/animals/crab.jpg' },
  { id: 'crocodile', name: 'Crocodile', habitats: ['jungle', 'ocean'], image: '/animals/crocodile.jpg' },
  { id: 'flamingo', name: 'Flamingo', habitats: ['savannah', 'ocean'], image: '/animals/flamingo.jpg' },

  // Desert (5)
  { id: 'camel', name: 'Camel', habitats: ['desert'], image: '/animals/camel.jpg' },
  { id: 'scorpion', name: 'Scorpion', habitats: ['desert'], image: '/animals/scorpion.jpg' },
  { id: 'tortoise', name: 'Tortoise', habitats: ['desert'], image: '/animals/tortoise.jpg' },
  { id: 'lizard', name: 'Lizard', habitats: ['desert', 'jungle'], image: '/animals/lizard.jpg' },
  { id: 'vulture', name: 'Vulture', habitats: ['desert', 'savannah'], image: '/animals/vulture.jpg' },

  // Jungle (8)
  { id: 'monkey', name: 'Monkey', habitats: ['jungle'], image: '/animals/monkey.jpg' },
  { id: 'tiger', name: 'Tiger', habitats: ['jungle', 'forest'], image: '/animals/tiger.jpg' },
  { id: 'gorilla', name: 'Gorilla', habitats: ['jungle'], image: '/animals/gorilla.jpg' },
  { id: 'sloth', name: 'Sloth', habitats: ['jungle'], image: '/animals/sloth.jpg' },
  { id: 'jaguar', name: 'Jaguar', habitats: ['jungle', 'forest'], image: '/animals/jaguar.jpg' },
  { id: 'toucan', name: 'Toucan', habitats: ['jungle'], image: '/animals/toucan.jpg' },
  { id: 'chameleon', name: 'Chameleon', habitats: ['jungle'], image: '/animals/chameleon.jpg' },
  { id: 'orangutan', name: 'Orangutan', habitats: ['jungle'], image: '/animals/orangutan.jpg' },

  // Polar (8)
  { id: 'polar-bear', name: 'Polar Bear', habitats: ['polar'], image: '/animals/polar-bear.jpg' },
  { id: 'penguin', name: 'Penguin', habitats: ['polar', 'ocean'], image: '/animals/penguin.jpg' },
  { id: 'walrus', name: 'Walrus', habitats: ['polar', 'ocean'], image: '/animals/walrus.jpg' },
  { id: 'seal', name: 'Seal', habitats: ['polar', 'ocean'], image: '/animals/seal.jpg' },
  { id: 'arctic-fox', name: 'Arctic Fox', habitats: ['polar'], image: '/animals/arctic-fox.jpg' },
  { id: 'arctic-hare', name: 'Arctic Hare', habitats: ['polar'], image: '/animals/arctic-hare.jpg' },
  { id: 'narwhal', name: 'Narwhal', habitats: ['polar', 'ocean'], image: '/animals/narwhal.jpg' },
  { id: 'musk-ox', name: 'Musk Ox', habitats: ['polar'], image: '/animals/musk-ox.jpg' },

  // Savannah (9)
  { id: 'lion', name: 'Lion', habitats: ['savannah'], image: '/animals/lion.jpg' },
  { id: 'elephant', name: 'Elephant', habitats: ['savannah', 'jungle'], image: '/animals/elephant.jpg' },
  { id: 'giraffe', name: 'Giraffe', habitats: ['savannah'], image: '/animals/giraffe.jpg' },
  { id: 'zebra', name: 'Zebra', habitats: ['savannah'], image: '/animals/zebra.jpg' },
  { id: 'cheetah', name: 'Cheetah', habitats: ['savannah', 'desert'], image: '/animals/cheetah.jpg' },
  { id: 'hippopotamus', name: 'Hippopotamus', habitats: ['savannah', 'jungle'], image: '/animals/hippopotamus.jpg' },
  { id: 'rhinoceros', name: 'Rhinoceros', habitats: ['savannah'], image: '/animals/rhinoceros.jpg' },
  { id: 'hyena', name: 'Hyena', habitats: ['savannah', 'desert'], image: '/animals/hyena.jpg' },
  { id: 'meerkat', name: 'Meerkat', habitats: ['savannah', 'desert'], image: '/animals/meerkat.jpg' },
  { id: 'kangaroo', name: 'Kangaroo', habitats: ['savannah'], image: '/animals/kangaroo.jpg' },
]

export function shuffleAnimals(list) {
  const shuffled = [...list]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const SHORT_ROUND_SIZE = 10

export function prepareRound(list, roundSize) {
  const shuffled = shuffleAnimals(list)
  return roundSize ? shuffled.slice(0, roundSize) : shuffled
}

export function getHabitatById(id) {
  return habitats.find((h) => h.id === id)
}

export function isCorrectHabitat(animal, habitatId) {
  return animal.habitats.includes(habitatId)
}

export function formatHabitatNames(habitatIds) {
  return habitatIds
    .map((id) => getHabitatById(id)?.name)
    .filter(Boolean)
    .join(' or ')
}
