module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('exotics', [{
      name: 'Wormhusk-Crown',
      type: 'Helmet',
      perk: 'Burning Souls; Dodging gives a small health and shield bump.',
      slug: 'wormhusk-crown'
    }


    ])

    return queryInterface.bulkInsert('hunters', [{
      tag: 'hunterdude',
      subclass: 'Gunslinger',
      grenades: 'Tripmine-Grenade',
      tree: 'Way of the Sharpshooter',
      exoticName: 'Wormhusk-Crown',
    }

    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('hunters')

    return queryInterface.bulkDelete('exotics')
  }
}
