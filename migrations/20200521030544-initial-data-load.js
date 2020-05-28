module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('exotics', [{
      name: 'Wormhusk-Crown',
      type: 'Helmet',
      perk: 'Burning Souls; Dodging gives a small health and shield bump.',
      slug: 'wormhusk-crown'
    }, {
      name: 'Ophidia-Spathe',
      type: 'Chest-Armor',
      perk: 'Scissor-fingers; Grants two knives per charge.',
      slug: 'ophidia-spathe'
    }, {
      name: 'Gwisin-Vest',
      type: 'Chest-Armor',
      perk: 'Roving Assassin; Vanish after Spectral Blades kills for more Super Energy.',
      slug: 'gwisin-vest'
    }, {
      name: 'The-Sixth-Coyote',
      type: 'Chest-Armor',
      perk: 'Double Dodge; Gain a second didge charge.',
      slug: 'the-sixth-coyote'
    }, {
      name: 'Stomp-EE5',
      type: 'Leg-Armor',
      perk: 'Hydraulic Boosters; Buffs sprint, slide, and jumping.',
      slug: 'stomp-ee5'
    }, {
      name: 'Orpheus-Rig',
      type: 'Leg-Armor',
      perk: 'Uncanny Arrows; Grants Deadfall and Moebius Quiver energy.',
      slug: 'orpheus-rig'
    }, {
      name: 'Lucky-Pants',
      type: 'Leg-Armor',
      perk: 'Illegally Modded Holster; Precision hits load a round to stowed Hand Cannons',
      slug: 'lucky-pants'
    }
    ])

    return queryInterface.bulkInsert('hunters', [{
      tag: 'hunterdude',
      subclass: 'Gunslinger',
      grenades: 'Tripmine Grenade',
      tree: 'Way of the Sharpshooter',
      exoticName: 'Wormhusk-Crown',
    },
    {
      tag: 'ilurvdestiny',
      subclass: 'Arcstrider',
      grenades: 'Flux Grenade',
      tree: 'Way of the Current',
      exoticName: 'Stomp-EE5',
    },
    {
      tag: 'bobsaget',
      subclass: 'Gunslinger',
      grenades: 'Incendiary Grenade',
      tree: 'Way of a Thousand Cuts',
      exoticName: 'The-Sixth-Coyote',
    },
    {
      tag: 'jonikbo',
      subclass: 'Nightstalker',
      grenades: 'Vortex Grenade',
      tree: 'Way of the Wraith',
      exoticName: 'Ophidia-Spathe',
    },
    {
      tag: 'zettlechips',
      subclass: 'Arcstrider',
      grenades: 'Skipbolt',
      tree: 'Way of the Wind',
      exoticName: 'Lucky-Pants'
    },
    {
      tag: 'bungterzzz',
      subclass: 'Gunslinger',
      grenades: 'Swarm Grenade',
      tree: 'Way of the Outlaw',
      exoticName: 'Gwisin-Vest',
    }
    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('hunters')

    return queryInterface.bulkDelete('exotics')
  }
}