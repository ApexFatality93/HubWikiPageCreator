import type { CreatureData } from "../types/objects";

/**
 * @fileoverview Provides data for creatures which is not intended to be put into a datalist. This data is needed in multiple files, so it was broken into its own file.
 */
const creatureData: CreatureData = {
	ecosystems: {
		Ground: {
			Anastomus: {
				commonName: 'Striders',
				produces: ['Tall Eggs']
			},
			Anomalous: {
				commonName: 'Exotic Biome Creatures',
				produces: ['', 'Fiendish Roe', 'Hexaberry', 'Latticed Sinew']
			},
			Bos: {
				commonName: 'Beetles',
				produces: ["Crab 'Apple'"]
			},
			Bosoptera: {
				commonName: 'Flying Beetles',
				produces: ['Craw Milk']
			},
			Felidae: {
				commonName: 'Cats',
				produces: ['Leopard-Fruit']
			},
			Felihex: {
				commonName: 'Sixlegged Cats',
				produces: ['Leopard-Fruit']
			},
			Hexungulatis: {
				commonName: 'Sixlegged Cows',
				produces: ['Fresh Milk']
			},
			Lok: {
				commonName: 'Blobs',
				produces: ["Sticky 'Honey'"]
			},
			Mechanoceris: {
				commonName: 'Robots',
				produces: ['Chewy Wires']
			},
			Mogara: {
				commonName: 'Proto-Gek',
				produces: ['Warm Proto-Milk']
			},
			Osteofelidae: {
				commonName: 'Bonecat',
				produces: ['Bone Nuggets']
			},
			Prionterrae: {
				commonName: 'Ploughs',
				produces: ['']
			},
			Procavya: {
				commonName: 'Rodents',
				produces: ['Wild Milk']
			},
			Protosphaeridae: {
				commonName: 'Protoroller',
				produces: ['Bone Nuggets']
			},
			Prototerrae: {
				commonName: 'Protodiggers',
				produces: ['Dirty Meat']
			},
			Rangifae: {
				commonName: 'Diplos',
				produces: ['Giant Egg']
			},
			Reococcyx: {
				commonName: 'Bipedal Antelopes',
				produces: ['Wild Milk']
			},
			Spiralis: {
				commonName: 'Drills',
				produces: ['Latticed Sinew']
			},
			Talpidae: {
				commonName: 'Moles',
				produces: ['Foraged Mushrooms']
			},
			Tetraceris: {
				commonName: 'Antelopes',
				produces: ['Wild Milk']
			},
			Theroma: {
				commonName: 'Triceratops',
				produces: ['Creature Egg']
			},
			Tyranocae: {
				commonName: 'Tyrannosaurus',
				produces: ['Regis Grease']
			},
			Ungulatis: {
				commonName: 'Cow',
				produces: ['Fresh Milk']
			}
		},
		Flying: {
			Agnelis: {
				commonName: 'Birds',
				produces: ['', 'Craw Milk']
			},
			Cycromys: {
				commonName: 'Dragons',
				produces: ['Craw Milk']
			},
			Oxyacta: {
				commonName: 'Flying Snakes',
				produces: ['Craw Milk']
			},
			Protocaeli: {
				commonName: 'Protoflyers',
				produces: ['Craw Milk']
			},
			Rhopalocera: {
				commonName: 'Butterflies',
				produces: ['', 'Craw Milk']
			}
		},
		Underwater: {
			Procavaquatica: {
				commonName: 'Swimming Rodents',
				produces: ['Wild Milk']
			},
			Bosaquatica: {
				commonName: 'Underwater Crabs',
				produces: ["Crab 'Apple'"]
			},
			Chrysaora: {
				commonName: 'Jellyfish',
				produces: ['Wild Milk']
			},
			Ictaloris: {
				commonName: 'Fish',
				produces: ['']
			},
			Prionace: {
				commonName: 'Sharks',
				produces: ['', 'Wild Milk']
			},
			Prionacefda: {
				commonName: 'Swimming cows',
				produces: ['Wild Milk']
			}
		},
		Underground: {
			Bos: {
				commonName: 'Beetles',
				produces: ["Crab 'Apple'"]
			},
			Lok: {
				commonName: 'Blobs',
				produces: ["Sticky 'Honey'"]
			},
			Procavya: {
				commonName: 'Rodents',
				produces: ['Wild Milk']
			},
			Prototerrae: {
				commonName: 'Protodiggers',
				produces: ['']
			}
		}
	},
	catalogs: {
		Ground: ['', 'Diplo', 'Mushroom Beetle', 'Mechanoceris', 'Common Fauna', 'Rare Fauna'],
		Flying: ['', 'Common Fauna', 'Rare Fauna'],
		Underwater: ['', 'Common Fauna', 'Rare Fauna'],
		Underground: ['', 'Mushroom Beetle', 'Common Fauna', 'Rare Fauna']
	}
}

export default creatureData;