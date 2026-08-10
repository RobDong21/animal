export const habitats = [
  {
    id: 'home',
    name: 'Home',
    description: 'Where pets live with people in a cozy house.',
    images: [
      { src: '/habitats/home-living-room.jpg', caption: 'A cozy living room at home' },
      { src: '/habitats/home-pet.jpg', caption: 'A happy pet indoors' },
      { src: '/habitats/home-fish-tank.jpg', caption: 'A fish tank at home' },
    ],
  },
  {
    id: 'farm',
    name: 'Farm',
    description: 'Barns and fields with animals like chickens and horses.',
    images: [
      { src: '/habitats/farm-barn.jpg', caption: 'A red barn on the farm' },
      { src: '/habitats/farm-chicken.jpg', caption: 'Chickens on the farm' },
      { src: '/habitats/farm-horse.jpg', caption: 'Horses by the stable' },
    ],
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Lots of trees and woods.',
    images: [
      { src: '/habitats/forest.jpg', caption: 'A green forest full of trees' },
      { src: '/habitats/forest-trees.jpg', caption: 'Tall trees in the woods' },
      { src: '/habitats/forest-path.jpg', caption: 'A path through the forest' },
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'The big sea where fish and whales swim.',
    images: [
      { src: '/habitats/ocean.jpg', caption: 'Colorful coral under the sea' },
      { src: '/habitats/ocean-waves.jpg', caption: 'Waves at the beach' },
      { src: '/habitats/ocean-fish.jpg', caption: 'Fish swimming in the ocean' },
    ],
  },
  {
    id: 'desert',
    name: 'Desert',
    description: 'Hot, dry, sandy places.',
    images: [
      { src: '/habitats/desert.jpg', caption: 'A hot sandy desert' },
      { src: '/habitats/desert-dunes.jpg', caption: 'Rolling sand dunes' },
      { src: '/habitats/desert-cactus.jpg', caption: 'Cacti in the desert' },
    ],
  },
  {
    id: 'jungle',
    name: 'Jungle',
    description: 'Rainy forests with thick green trees.',
    images: [
      { src: '/habitats/jungle.jpg', caption: 'A lush green jungle' },
      { src: '/habitats/jungle-plants.jpg', caption: 'Thick tropical plants' },
      { src: '/habitats/jungle-trees.jpg', caption: 'Animals in the jungle' },
    ],
  },
  {
    id: 'polar',
    name: 'Polar',
    description: 'Very cold, icy places near the North Pole.',
    images: [
      { src: '/habitats/polar.jpg', caption: 'Frozen ice and snow' },
      { src: '/habitats/polar-penguins.jpg', caption: 'Penguins on the ice' },
      { src: '/habitats/polar-iceberg.jpg', caption: 'Big icy icebergs' },
    ],
  },
  {
    id: 'grassland',
    name: 'Grassland',
    description: 'Open grassy places with lions and elephants.',
    images: [
      { src: '/habitats/grassland.jpg', caption: 'Wide open grassland' },
      { src: '/habitats/grassland-grass.jpg', caption: 'Lions on the grassland' },
      { src: '/habitats/grassland-elephants.jpg', caption: 'Elephants in the grassland' },
    ],
  },
]

export const HABITAT_HELP_VIDEO_ID = '6GtnSNSP8oE'

export const habitatVideoStartSeconds = {
  grassland: 34,
  polar: 162,
  desert: 380,
  forest: 502,
  ocean: 772,
  jungle: 866,
}

export function hasHabitatVideo(habitatId) {
  return habitatId in habitatVideoStartSeconds
}

export function getHabitatVideoStart(habitatId) {
  return habitatVideoStartSeconds[habitatId] ?? 0
}

export const animalTypes = [
  { id: 'mammal', name: 'Mammal' },
  { id: 'bird', name: 'Bird' },
  { id: 'fish', name: 'Fish' },
  { id: 'bug', name: 'Bug' },
  { id: 'reptile', name: 'Reptile' },
  { id: 'sea-creature', name: 'Sea Creature' },
]

const animalTypeById = {
  dog: 'mammal',
  cat: 'mammal',
  goldfish: 'fish',
  hamster: 'mammal',
  parrot: 'bird',
  rabbit: 'mammal',
  mouse: 'mammal',
  butterfly: 'bug',
  ladybug: 'bug',
  snail: 'bug',
  cow: 'mammal',
  pig: 'mammal',
  chicken: 'bird',
  horse: 'mammal',
  sheep: 'mammal',
  goat: 'mammal',
  duck: 'bird',
  donkey: 'mammal',
  rooster: 'bird',
  turkey: 'bird',
  frog: 'reptile',
  bee: 'bug',
  peacock: 'bird',
  bear: 'mammal',
  deer: 'mammal',
  fox: 'mammal',
  owl: 'bird',
  squirrel: 'mammal',
  wolf: 'mammal',
  raccoon: 'mammal',
  woodpecker: 'bird',
  hedgehog: 'mammal',
  badger: 'mammal',
  panda: 'mammal',
  koala: 'mammal',
  turtle: 'reptile',
  dolphin: 'mammal',
  whale: 'mammal',
  shark: 'fish',
  octopus: 'sea-creature',
  'sea-turtle': 'reptile',
  jellyfish: 'sea-creature',
  clownfish: 'fish',
  seahorse: 'fish',
  starfish: 'sea-creature',
  crab: 'sea-creature',
  crocodile: 'reptile',
  flamingo: 'bird',
  camel: 'mammal',
  scorpion: 'bug',
  tortoise: 'reptile',
  lizard: 'reptile',
  vulture: 'bird',
  monkey: 'mammal',
  tiger: 'mammal',
  gorilla: 'mammal',
  sloth: 'mammal',
  jaguar: 'mammal',
  toucan: 'bird',
  chameleon: 'reptile',
  orangutan: 'mammal',
  'polar-bear': 'mammal',
  penguin: 'bird',
  walrus: 'mammal',
  seal: 'mammal',
  'arctic-fox': 'mammal',
  'arctic-hare': 'mammal',
  narwhal: 'mammal',
  'musk-ox': 'mammal',
  lion: 'mammal',
  elephant: 'mammal',
  giraffe: 'mammal',
  zebra: 'mammal',
  cheetah: 'mammal',
  hippopotamus: 'mammal',
  rhinoceros: 'mammal',
  hyena: 'mammal',
  meerkat: 'mammal',
  kangaroo: 'mammal',
}

export function getHabitatImages(habitat) {
  return habitat?.images ?? []
}

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
  { id: 'flamingo', name: 'Flamingo', habitats: ['grassland', 'ocean'], image: '/animals/flamingo.jpg' },

  // Desert (5)
  { id: 'camel', name: 'Camel', habitats: ['desert'], image: '/animals/camel.jpg' },
  { id: 'scorpion', name: 'Scorpion', habitats: ['desert'], image: '/animals/scorpion.jpg' },
  { id: 'tortoise', name: 'Tortoise', habitats: ['desert'], image: '/animals/tortoise.jpg' },
  { id: 'lizard', name: 'Lizard', habitats: ['desert', 'jungle'], image: '/animals/lizard.jpg' },
  { id: 'vulture', name: 'Vulture', habitats: ['desert', 'grassland'], image: '/animals/vulture.jpg' },

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

  // Grassland (9)
  { id: 'lion', name: 'Lion', habitats: ['grassland'], image: '/animals/lion.jpg' },
  { id: 'elephant', name: 'Elephant', habitats: ['grassland', 'jungle'], image: '/animals/elephant.jpg' },
  { id: 'giraffe', name: 'Giraffe', habitats: ['grassland'], image: '/animals/giraffe.jpg' },
  { id: 'zebra', name: 'Zebra', habitats: ['grassland'], image: '/animals/zebra.jpg' },
  { id: 'cheetah', name: 'Cheetah', habitats: ['grassland', 'desert'], image: '/animals/cheetah.jpg' },
  { id: 'hippopotamus', name: 'Hippopotamus', habitats: ['grassland', 'jungle'], image: '/animals/hippopotamus.jpg' },
  { id: 'rhinoceros', name: 'Rhinoceros', habitats: ['grassland'], image: '/animals/rhinoceros.jpg' },
  { id: 'hyena', name: 'Hyena', habitats: ['grassland', 'desert'], image: '/animals/hyena.jpg' },
  { id: 'meerkat', name: 'Meerkat', habitats: ['grassland', 'desert'], image: '/animals/meerkat.jpg' },
  { id: 'kangaroo', name: 'Kangaroo', habitats: ['grassland'], image: '/animals/kangaroo.jpg' },
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

export const SHORT_ROUND_SIZE = 10

export function prepareRound(list, roundSize) {
  const shuffled = shuffleAnimals(list)
  return roundSize ? shuffled.slice(0, roundSize) : shuffled
}

export function getHabitatById(id) {
  return habitats.find((h) => h.id === id)
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

export function formatHabitatNames(habitatIds) {
  return habitatIds
    .map((id) => getHabitatById(id)?.name)
    .filter(Boolean)
    .join(' or ')
}
