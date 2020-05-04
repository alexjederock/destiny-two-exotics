import { schedulingPolicy } from "cluster";

const hunters = {
  hunters: [
    {
      tag: 'hunterdude',
      subclass: 'Gunslinger',
      grenades: 'Tripmine Grenade',
      tree: 'Way of the Sharpshooter'
      exotic: 'Wormhusk Crown'
    },
    {
      tag: 'zettlechips',
      subclass: 'Arcstrider',
      grenades: 'Skipbolt',
      tree: 'Way of the Wind',
      exotic: 'Young Ahamkaras Spine'
    } ],

  class: [ {
    subclass: 'Arcstrider',
    grenades: [ 'Flux Grenade', 'Arcbolt Grenade', 'Skipbolt' ],
    tree: [ 'Way of The Wind', 'Way of the Current', 'Way of the Warrior' ]
  }, {
    subclass: 'Gunslinger',
    grenades: [ 'Incendiary Grenade', 'Swarm Grenade', 'Tripmine Grenade' ],
    tree: [ 'Way of the Outlaw', 'Way of a Thousand Cuts', 'Way of the Sharpshooter' ]
  }, {
    subclass: 'Nighstalker',
    grenades: [ 'Vortex Grenade', 'Spike Grenade', 'Voidwall Grenade' ],
    tree: [ 'Way of the Trapper', 'Way of the Wraith', 'Way of the Pathfinder' ]
  } ],
  exotics: [ {
    name: 'Knucklehead Radar',
    type: 'Helmet',
    perk: 'Upgraded Sensor Pack; Provides radar while your aiming, enhanced radar while crouching.',
    slug: 'knucklehead-radar'
  }, {
    name: 'Celestial Nighthawk',
    type: 'Helmet',
    perk: 'Hawkeye Hack; Golden Gun fires one high-damage shot.'
  }, {
    name: 'Wormhusk Crown',
    type: 'Helmet',
    perk: 'Burning Souls; Dodging gives a small health and shield bump.'
  }, {
    name: 'Young Ahamkaras Spine',
    type: 'Gauntlets',
    perk: 'Wish-Dragon Teeth; Ability damage grants enhanced Tripmines.'
  }, {
    name: 'Shards of Galanor',
    type: 'Gauntlets',
    perk: 'Sharp Edges; Get Super energy for Blade Barrage hits and kills.'
  }, {
    name: 'Liars Handshake',
    type: 'Gauntlets',
    perk: 'Cross-Counter; Cross Counter regenerates health and deals etra damage.'
  }, {
    name: 'Ophidia Spathe',
    type: 'Chest-Armor',
    perk: 'Scissor-fingers; Grants two knives per charge.'
  }, {
    name: 'Gwisin Vest',
    type: 'Chest-Armor',
    perk: 'Roving Assassin; Vanish after Spectral Blades kills for more Super Energy.'
  }, {
    name: 'The Sixth Coyote',
    type: 'Chest-Armor',
    perk: 'Double Dodge; Gain a second didge charge.'
  }, {
    name: 'Stomp-EE5',
    type: 'Leg-Armor',
    perk: 'Hydraulic Boosters; Buffs sprint, slide, and jumping.'
  }, {
    name: 'Orpheus Rig',
    type: 'Leg-Armor',
    perk: 'Uncanny Arrows; Grants Deadfall and Moebius Quiver energy.'
  }, {
    name: 'Lucky Pants',
    type: 'Leg-Armor',
    perk: 'Illegally Modded Holster; Precision hits load a round to stowed Hand Cannons'
  } ]
}