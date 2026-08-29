export const habitats = [
  {
    id: 'home',
    name: 'Home/City',
    description: 'Where pets live with people in a house or city.',
    images: [
      {
        src: '/habitats/samples/habitat-sample-home.webp',
        caption: 'Pets live with people in a house or city.',
      },
      {
        src: '/habitats/samples/habitat-sample-home-care.webp',
        caption: 'People feed pets and keep them clean and safe.',
      },
    ],
  },
  {
    id: 'farm',
    name: 'Farm',
    description: 'Barns and fields with animals like chickens and horses.',
    images: [
      {
        src: '/habitats/samples/habitat-sample-farm.webp',
        caption: 'Farm animals live in barns and fields.',
      },
      {
        src: '/habitats/samples/habitat-sample-farm-care.webp',
        caption: 'People feed farm animals and take care of them.',
      },
    ],
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Lots of trees and woods.',
    images: [
      {
        src: '/habitats/samples/habitat-sample-forest.webp',
        caption: 'Forests have lots of trees and woodland animals.',
      },
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'The big sea where fish and whales swim.',
    images: [
      {
        src: '/habitats/samples/habitat-sample-ocean.webp',
        caption: 'The ocean is the big sea where fish swim.',
      },
    ],
  },
  {
    id: 'desert',
    name: 'Desert',
    description: 'Hot, dry, sandy places.',
    images: [
      {
        src: '/habitats/samples/habitat-sample-desert.webp',
        caption: 'Deserts are hot, dry, sandy places.',
      },
    ],
  },
  {
    id: 'jungle',
    name: 'Jungle',
    description: 'Rainy forests with thick green trees.',
    images: [
      {
        src: '/habitats/samples/habitat-sample-jungle.webp',
        caption: 'Jungles are rainy forests with thick green plants.',
      },
    ],
  },
  {
    id: 'polar',
    name: 'Polar',
    description: 'Very cold, icy places near the North Pole.',
    images: [
      {
        src: '/habitats/samples/habitat-sample-polar.webp',
        caption: 'Polar places are very cold with ice and snow.',
      },
    ],
  },
  {
    id: 'grassland',
    name: 'Grassland',
    description: 'Open grassy places with lions and elephants.',
    images: [
      {
        src: '/habitats/samples/habitat-sample-grassland.webp',
        caption: 'Grasslands are wide open grassy places.',
      },
    ],
  },
]

export const wildHabitat = {
  id: 'wild',
  name: 'Wild',
  description: 'Animals that live outside in nature.',
  images: [
    {
      src: '/habitats/samples/habitat-sample-wild-free.webp',
      caption: 'Wild animals live outside in nature on their own.',
    },
  ],
}

const habitatsById = Object.fromEntries(
  [...habitats, wildHabitat].map((habitat) => [habitat.id, habitat])
)

export function getHabitatHelpSlides(habitatId) {
  return getHabitatById(habitatId)?.images ?? []
}

export const animalTypes = [
  { id: 'mammal', name: 'Mammal' },
  { id: 'bird', name: 'Bird' },
  { id: 'fish', name: 'Fish' },
  { id: 'reptile', name: 'Reptile' },
  { id: 'amphibian', name: 'Amphibian' },
  { id: 'insect', name: 'Insect' },
  { id: 'other-invertebrate', name: 'Other Invertebrate' },
]

const animalTypeById = {
  dog: 'mammal',
  cat: 'mammal',
  goldfish: 'fish',
  hamster: 'mammal',
  parrot: 'bird',
  rabbit: 'mammal',
  butterfly: 'insect',
  ladybug: 'insect',
  snail: 'other-invertebrate',
  cow: 'mammal',
  pig: 'mammal',
  chicken: 'bird',
  horse: 'mammal',
  sheep: 'mammal',
  duck: 'bird',
  rooster: 'bird',
  turkey: 'bird',
  frog: 'amphibian',
  bee: 'insect',
  peacock: 'bird',
  bear: 'mammal',
  deer: 'mammal',
  fox: 'mammal',
  owl: 'bird',
  squirrel: 'mammal',
  raccoon: 'mammal',
  woodpecker: 'bird',
  panda: 'mammal',
  turtle: 'reptile',
  dolphin: 'mammal',
  whale: 'mammal',
  shark: 'fish',
  octopus: 'other-invertebrate',
  'sea-turtle': 'reptile',
  jellyfish: 'other-invertebrate',
  clownfish: 'fish',
  seahorse: 'fish',
  angelfish: 'fish',
  tuna: 'fish',
  salmon: 'fish',
  starfish: 'other-invertebrate',
  crab: 'other-invertebrate',
  squid: 'other-invertebrate',
  shrimp: 'other-invertebrate',
  'sea-urchin': 'other-invertebrate',
  crocodile: 'reptile',
  flamingo: 'bird',
  camel: 'mammal',
  scorpion: 'other-invertebrate',
  tortoise: 'reptile',
  lizard: 'reptile',
  vulture: 'bird',
  monkey: 'mammal',
  tiger: 'mammal',
  toucan: 'bird',
  chameleon: 'reptile',
  'polar-bear': 'mammal',
  penguin: 'bird',
  seal: 'mammal',
  lion: 'mammal',
  elephant: 'mammal',
  giraffe: 'mammal',
  zebra: 'mammal',
  hippopotamus: 'mammal',
  kangaroo: 'mammal',
  pigeon: 'bird',
  snake: 'reptile',
  goose: 'bird',
  moose: 'mammal',
  ant: 'insect',
  swan: 'bird',
  eagle: 'bird',
  otter: 'mammal',
  lobster: 'other-invertebrate',
  bison: 'mammal',
  gecko: 'reptile',
  iguana: 'reptile',
  alligator: 'reptile',
  newt: 'amphibian',
  'bearded-dragon': 'reptile',
  grasshopper: 'insect',
  dragonfly: 'insect',
  caterpillar: 'insect',
  beetle: 'insect',
  worm: 'other-invertebrate',
}

export const animals = [
  // Home (5)
  { id: 'dog', name: 'Dog', habitats: ['home', 'farm'], image: '/animals/dog.jpg' },
  { id: 'cat', name: 'Cat', habitats: ['home', 'farm'], image: '/animals/cat.jpg' },
  { id: 'goldfish', name: 'Goldfish', habitats: ['home'], image: '/animals/goldfish.jpg' },
  { id: 'hamster', name: 'Hamster', habitats: ['home'], image: '/animals/hamster.jpg' },
  { id: 'parrot', name: 'Parrot', habitats: ['home', 'jungle'], image: '/animals/parrot.jpg' },
  { id: 'rabbit', name: 'Rabbit', habitats: ['home', 'farm', 'forest'], image: '/animals/rabbit.jpg' },
  { id: 'butterfly', name: 'Butterfly', habitats: ['home', 'farm', 'forest'], image: '/animals/butterfly.jpg' },
  { id: 'ladybug', name: 'Ladybug', habitats: ['home', 'farm', 'forest'], image: '/animals/ladybug.jpg' },
  { id: 'snail', name: 'Snail', habitats: ['home', 'farm', 'forest'], image: '/animals/snail.jpg' },
  { id: 'pigeon', name: 'Pigeon', habitats: ['home', 'farm'], image: '/animals/pigeon.jpg' },
  { id: 'ant', name: 'Ant', habitats: ['home', 'farm', 'forest', 'grassland'], image: '/animals/ant.jpg' },
  { id: 'beetle', name: 'Beetle', habitats: ['home', 'farm', 'forest'], image: '/animals/beetle.jpg' },
  { id: 'worm', name: 'Worm', habitats: ['home', 'farm', 'forest'], image: '/animals/worm.jpg' },
  { id: 'gecko', name: 'Gecko', habitats: ['home', 'jungle', 'desert'], image: '/animals/gecko.jpg' },
  { id: 'bearded-dragon', name: 'Bearded Dragon', habitats: ['home', 'desert'], image: '/animals/bearded-dragon.jpg' },
  { id: 'newt', name: 'Newt', habitats: ['home', 'forest'], image: '/animals/newt.jpg' },

  // Farm (10)
  { id: 'cow', name: 'Cow', habitats: ['farm'], image: '/animals/cow.jpg' },
  { id: 'pig', name: 'Pig', habitats: ['farm'], image: '/animals/pig.jpg' },
  { id: 'chicken', name: 'Chicken', habitats: ['farm'], image: '/animals/chicken.jpg' },
  { id: 'horse', name: 'Horse', habitats: ['farm'], image: '/animals/horse.jpg' },
  { id: 'sheep', name: 'Sheep', habitats: ['farm'], image: '/animals/sheep.jpg' },
  { id: 'duck', name: 'Duck', habitats: ['farm'], image: '/animals/duck.jpg' },
  { id: 'rooster', name: 'Rooster', habitats: ['farm'], image: '/animals/rooster.jpg' },
  { id: 'turkey', name: 'Turkey', habitats: ['farm', 'forest'], image: '/animals/turkey.jpg' },
  { id: 'frog', name: 'Frog', habitats: ['farm', 'forest'], image: '/animals/frog.jpg' },
  { id: 'bee', name: 'Bee', habitats: ['farm', 'forest'], image: '/animals/bee.jpg' },
  { id: 'peacock', name: 'Peacock', habitats: ['farm', 'jungle'], image: '/animals/peacock.jpg' },
  { id: 'goose', name: 'Goose', habitats: ['farm'], image: '/animals/goose.jpg' },
  { id: 'swan', name: 'Swan', habitats: ['farm', 'ocean'], image: '/animals/swan.jpg' },
  { id: 'grasshopper', name: 'Grasshopper', habitats: ['farm', 'grassland', 'forest'], image: '/animals/grasshopper.jpg' },
  { id: 'dragonfly', name: 'Dragonfly', habitats: ['farm', 'forest', 'ocean'], image: '/animals/dragonfly.jpg' },
  { id: 'caterpillar', name: 'Caterpillar', habitats: ['farm', 'forest', 'jungle'], image: '/animals/caterpillar.jpg' },

  // Forest (10)
  { id: 'bear', name: 'Bear', habitats: ['forest'], image: '/animals/bear.jpg' },
  { id: 'deer', name: 'Deer', habitats: ['forest'], image: '/animals/deer.jpg' },
  { id: 'fox', name: 'Fox', habitats: ['forest'], image: '/animals/fox.jpg' },
  { id: 'owl', name: 'Owl', habitats: ['forest'], image: '/animals/owl.jpg' },
  { id: 'squirrel', name: 'Squirrel', habitats: ['forest'], image: '/animals/squirrel.jpg' },
  { id: 'raccoon', name: 'Raccoon', habitats: ['forest'], image: '/animals/raccoon.jpg' },
  { id: 'woodpecker', name: 'Woodpecker', habitats: ['forest'], image: '/animals/woodpecker.jpg' },
  { id: 'panda', name: 'Panda', habitats: ['forest', 'jungle'], image: '/animals/panda.jpg' },
  { id: 'turtle', name: 'Turtle', habitats: ['forest', 'ocean'], image: '/animals/turtle.jpg' },
  { id: 'moose', name: 'Moose', habitats: ['forest'], image: '/animals/moose.jpg' },
  { id: 'snake', name: 'Snake', habitats: ['desert', 'jungle', 'forest'], image: '/animals/snake.jpg' },
  { id: 'eagle', name: 'Eagle', habitats: ['forest', 'grassland'], image: '/animals/eagle.jpg' },
  { id: 'otter', name: 'Otter', habitats: ['ocean', 'forest'], image: '/animals/otter.jpg' },

  // Ocean (10)
  { id: 'dolphin', name: 'Dolphin', habitats: ['ocean'], image: '/animals/dolphin.jpg' },
  { id: 'whale', name: 'Whale', habitats: ['ocean', 'polar'], image: '/animals/whale.jpg' },
  { id: 'shark', name: 'Shark', habitats: ['ocean'], image: '/animals/shark.jpg' },
  { id: 'octopus', name: 'Octopus', habitats: ['ocean'], image: '/animals/octopus.jpg' },
  { id: 'sea-turtle', name: 'Sea Turtle', habitats: ['ocean'], image: '/animals/sea-turtle.jpg' },
  { id: 'jellyfish', name: 'Jellyfish', habitats: ['ocean'], image: '/animals/jellyfish.jpg' },
  { id: 'clownfish', name: 'Clownfish', habitats: ['ocean'], image: '/animals/clownfish.jpg' },
  { id: 'seahorse', name: 'Seahorse', habitats: ['ocean'], image: '/animals/seahorse.jpg' },
  { id: 'angelfish', name: 'Angelfish', habitats: ['ocean'], image: '/animals/angelfish.jpg' },
  { id: 'tuna', name: 'Tuna', habitats: ['ocean'], image: '/animals/tuna.jpg' },
  { id: 'salmon', name: 'Salmon', habitats: ['ocean'], image: '/animals/salmon.jpg' },
  { id: 'starfish', name: 'Starfish', habitats: ['ocean'], image: '/animals/starfish.jpg' },
  { id: 'crab', name: 'Crab', habitats: ['ocean'], image: '/animals/crab.jpg' },
  { id: 'squid', name: 'Squid', habitats: ['ocean'], image: '/animals/squid.jpg' },
  { id: 'shrimp', name: 'Shrimp', habitats: ['ocean'], image: '/animals/shrimp.jpg' },
  { id: 'sea-urchin', name: 'Sea Urchin', habitats: ['ocean'], image: '/animals/sea-urchin.jpg' },
  { id: 'lobster', name: 'Lobster', habitats: ['ocean'], image: '/animals/lobster.jpg' },
  { id: 'crocodile', name: 'Crocodile', habitats: ['jungle', 'ocean'], image: '/animals/crocodile.jpg' },
  { id: 'flamingo', name: 'Flamingo', habitats: ['grassland', 'ocean'], image: '/animals/flamingo.jpg' },

  // Desert (5)
  { id: 'camel', name: 'Camel', habitats: ['desert'], image: '/animals/camel.jpg' },
  { id: 'scorpion', name: 'Scorpion', habitats: ['desert'], image: '/animals/scorpion.jpg' },
  { id: 'tortoise', name: 'Tortoise', habitats: ['desert'], image: '/animals/tortoise.jpg' },
  { id: 'lizard', name: 'Lizard', habitats: ['desert', 'jungle'], image: '/animals/lizard.jpg' },
  { id: 'iguana', name: 'Iguana', habitats: ['jungle', 'desert'], image: '/animals/iguana.jpg' },
  { id: 'alligator', name: 'Alligator', habitats: ['jungle', 'ocean'], image: '/animals/alligator.jpg' },
  { id: 'vulture', name: 'Vulture', habitats: ['desert', 'grassland'], image: '/animals/vulture.jpg' },

  // Jungle (8)
  { id: 'monkey', name: 'Monkey', habitats: ['jungle'], image: '/animals/monkey.jpg' },
  { id: 'tiger', name: 'Tiger', habitats: ['jungle', 'forest'], image: '/animals/tiger.jpg' },
  { id: 'toucan', name: 'Toucan', habitats: ['jungle'], image: '/animals/toucan.jpg' },
  { id: 'chameleon', name: 'Chameleon', habitats: ['jungle'], image: '/animals/chameleon.jpg' },

  // Polar (8)
  { id: 'polar-bear', name: 'Polar Bear', habitats: ['polar'], image: '/animals/polar-bear.jpg' },
  { id: 'penguin', name: 'Penguin', habitats: ['polar', 'ocean'], image: '/animals/penguin.jpg' },
  { id: 'seal', name: 'Seal', habitats: ['polar', 'ocean'], image: '/animals/seal.jpg' },

  // Grassland (9)
  { id: 'lion', name: 'Lion', habitats: ['grassland'], image: '/animals/lion.jpg' },
  { id: 'elephant', name: 'Elephant', habitats: ['grassland', 'jungle'], image: '/animals/elephant.jpg' },
  { id: 'giraffe', name: 'Giraffe', habitats: ['grassland'], image: '/animals/giraffe.jpg' },
  { id: 'zebra', name: 'Zebra', habitats: ['grassland'], image: '/animals/zebra.jpg' },
  { id: 'hippopotamus', name: 'Hippopotamus', habitats: ['grassland', 'jungle'], image: '/animals/hippopotamus.jpg' },
  { id: 'kangaroo', name: 'Kangaroo', habitats: ['grassland'], image: '/animals/kangaroo.jpg' },
  { id: 'bison', name: 'Bison', habitats: ['grassland'], image: '/animals/bison.jpg' },
].map((animal) => ({
  ...animal,
  type: animalTypeById[animal.id],
}))

export function shuffleAnimals(list) {
  const shuffled = [...list]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const DISCOVER_ROUND_SIZE = 5

export const EXPLORER_ROUND_SIZE = 8

export const DISCOVER_TYPE_IDS = ['mammal', 'bird', 'fish', 'insect']

export const DISCOVER_EXCLUDED_ANIMAL_IDS = new Set([
  'dolphin',
  'whale',
  'seal',
  'otter',
  'penguin',
  'seahorse',
  'hippopotamus',
  'snail',
  'worm',
  'scorpion',
])

export function mapHabitatToDiscover(habitatId) {
  return habitatId === 'home' || habitatId === 'farm' ? habitatId : 'wild'
}

export function mapHabitatsToDiscover(habitatIds) {
  return [...new Set(habitatIds.map(mapHabitatToDiscover))]
}

export function getHabitatsForMode(mode) {
  if (mode === 'discover') {
    return [habitatsById.home, habitatsById.farm, wildHabitat]
  }
  return habitats
}

export function getTypesForMode(mode) {
  if (mode === 'discover') {
    return animalTypes.filter((type) => DISCOVER_TYPE_IDS.includes(type.id))
  }
  return animalTypes
}

function hashId(id) {
  return [...id].reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0, 0)
}

export function getTypeChoicesForAnimal(animal, mode) {
  const availableTypes = getTypesForMode(mode)
  if (mode === 'discover') return availableTypes

  const distractors = availableTypes
    .filter((type) => type.id !== animal.type)
    .map((type) => ({
      type,
      rank: hashId(`${animal.id}:${type.id}`),
    }))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3)
    .map(({ type }) => type)

  const choiceIds = new Set([animal.type, ...distractors.map((type) => type.id)])
  return availableTypes.filter((type) => choiceIds.has(type.id))
}

export function getAnimalsForMode(mode) {
  if (mode !== 'discover') return animals
  return animals
    .filter(
      (animal) =>
        DISCOVER_TYPE_IDS.includes(animal.type) &&
        !DISCOVER_EXCLUDED_ANIMAL_IDS.has(animal.id)
    )
    .map((animal) => ({
      ...animal,
      habitats: mapHabitatsToDiscover(animal.habitats),
    }))
}

export function prepareRound(list, roundSize) {
  const shuffled = shuffleAnimals(list)
  return roundSize ? shuffled.slice(0, roundSize) : shuffled
}

export function getHabitatById(id) {
  return habitatsById[id]
}

export function getTypeById(id) {
  return animalTypes.find((type) => type.id === id)
}

export function isCorrectHabitat(animal, habitatId) {
  return animal.habitats.includes(habitatId)
}

export function isCorrectType(animal, typeId) {
  return animal.type === typeId
}
