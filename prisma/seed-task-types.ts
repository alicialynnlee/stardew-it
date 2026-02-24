import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Task type mappings based on task name patterns
 * This seeds the task type field to categorize tasks
 */
const TASK_TYPE_KEYWORDS: Record<string, string[]> = {
  foraging: [
    'forage',
    'foraging',
    'mushroom',
    'cactus fruit',
    'coconut',
    'berry',
    'flower',
    'herb',
    'wild seeds',
    'artifact',
    'geode',
    'crystal',
  ],
  farming: [
    'plant',
    'crop',
    'spring seed',
    'summer seed',
    'fall seed',
    'winter seed',
    'ancient fruit',
    'starfruit',
    'sweet potato',
    'cauliflower',
    'parsnip',
    'wheat',
  ],
  fishing: [
    'fish',
    'fishing',
    'catch',
    'sunfish',
    'catfish',
    'bass',
    'carp',
    'squid',
    'sardine',
    'salmon',
    'eel',
    'tuna',
    'pufferfish',
    'lobster',
    'crayfish',
    'crab',
    'oyster',
    'clam',
  ],
  mining: [
    'ore',
    'mine',
    'mining',
    'copper',
    'iron',
    'gold',
    'quartz',
    'stone',
    'coal',
    'diamond',
    'ruby',
    'emerald',
    'topaz',
    'jade',
    'amethyst',
    'bar',
    'smelting',
  ],
  animals: [
    'animal',
    'egg',
    'milk',
    'chicken',
    'cow',
    'goat',
    'sheep',
    'pig',
    'horse',
    'rabbit',
    'dinosaur',
    'slime',
    'bat',
    'essence',
  ],
  cooking: [
    'cook',
    'cooking',
    'recipe',
    'meal',
    'bread',
    'sauce',
    'pie',
    'soup',
    'juice',
    'preserve',
  ],
  socializing: [
    'socializing',
    'friendship',
    'love',
    'wedding',
    'birthday',
    'gift',
    'heart',
  ],
  combat: [
    'combat',
    'dungeon',
    'monster',
    'adventurer',
    'weapon',
    'ring',
    'skull',
  ],
};

async function main() {
  console.log('The task type field has been removed. This seed is no longer applicable.');
  void TASK_TYPE_KEYWORDS; // suppress unused variable warning
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
