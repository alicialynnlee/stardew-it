import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seasonal availability mappings for Stardew Valley tasks
 * Each task is classified by which seasons it's available
 */
const SEASONAL_AVAILABILITY: Record<string, { description?: string }> = {
  // SPRING FISHING
  pufferfish: { description: 'Ocean, 12pm-4pm summer; any time winter' },
  walleye: { description: 'Freshwater, rainy days' },
  sunfish: { description: 'Ocean, 6am-11am' },
  catfish: { description: 'Freshwater, rainy days' },
  shad: { description: 'Ocean, rainy days' },
  sandfish: { description: 'Desert, any time' },
  anchovy: { description: 'Ocean' },
  mackerel: { description: 'Ocean' },
  herring: { description: 'Ocean' },
  halibut: { description: 'Ocean' },
  sardine: { description: 'Ocean, 6am-7pm' },
  salmon: { description: 'Freshwater' },
  largemouth_bass: { description: 'Freshwater' },
  smallmouth_bass: { description: 'Freshwater' },
  rainbow_trout: { description: 'Freshwater' },
  lingcod: { description: 'Freshwater' },
  squid: { description: 'Ocean, 6pm-2am' },
  tiger_trout: { description: 'Freshwater' },
  red_snapper: { description: 'Ocean, 12pm-4pm' },
  carp: { description: 'Freshwater' },
  eel: { description: 'Freshwater, rainy days' },
  tuna: { description: 'Ocean' },
  lobster: { description: 'Ocean' },
  crayfish: { description: 'Freshwater, rainy days' },
  crab: { description: 'Ocean' },
  oyster: { description: 'Ocean' },
  clam: { description: 'Ocean' },

  // SPRING FORAGING
  spring_foraging: { description: 'Spring mushrooms, parsnips, spring seeds' },
  daffodil: { description: 'Spring flower' },
  dandelion: { description: 'Spring flower' },
  leek: { description: 'Spring forage' },
  parsnip: { description: 'Spring seed crop' },

  // SUMMER FORAGING
  summer_foraging: { description: 'Summer berries, flowers, seeds' },
  summer_spangle: { description: 'Summer flower' },
  pink_cake: { description: 'Item requires multiple summer ingredients' },

  // FALL FORAGING
  fall_foraging: { description: 'Fall mushrooms, seeds, hazelnuts' },
  fall_seeds: { description: 'Fall seed crops' },
  hazelnut: { description: 'Fall forage' },
  common_mushroom: { description: 'Fall mushroom' },
  chanterelle: { description: 'Fall mushroom' },
  purple_mushroom: { description: 'Fall mushroom' },

  // WINTER FORAGING
  winter_foraging: { description: 'Winter seeds, snow yam, winter roots' },
  winter_seed: { description: 'Winter seed crops' },
  snow_yam: { description: 'Winter forage' },
  winter_root: { description: 'Winter forage' },
  crystal_fruit: { description: 'Winter forage' },

  // FARMING - SPRING
  spring_seed: { description: 'Spring seed crops' },
  cauliflower: { description: 'Spring crop' },
  potato: { description: 'Spring crop' },

  // FARMING - SUMMER
  summer_seed: { description: 'Summer seed crops' },
  melon: { description: 'Summer crop' },
  wheat: { description: 'Summer-Fall crop' },

  // FARMING - FALL
  fall_seed: { description: 'Fall seed crops' },
  pumpkin: { description: 'Fall crop' },
  cranberry: { description: 'Fall crop' },
  garlic: { description: 'Fall crop' },
  yam: { description: 'Fall crop' },

  // FARMING - YEAR-ROUND (via greenhouse)
  ancient_fruit: { description: 'Greenhouse crop' },
  starfruit: { description: 'Summer crop or greenhouse' },
  sweet_potato: { description: 'Fall crop or greenhouse' },

  // MINING - YEAR-ROUND (accessible in mines all seasons)
  copper_ore: { description: 'Mine level 1-40' },
  iron_ore: { description: 'Mine level 40+' },
  gold_ore: { description: 'Mine level 80+' },
  iridium_ore: { description: 'Skull Cavern' },
  quartz: { description: 'Mine' },
  stone: { description: 'Mine' },
  coal: { description: 'Mine' },
  diamond: { description: 'Mine level 80+' },
  ruby: { description: 'Mine level 40-80' },
  emerald: { description: 'Mine level 40-80' },
  topaz: { description: 'Mine level 40-80' },
  jade: { description: 'Mine level 40-80' },
  amethyst: { description: 'Mine level 1-40' },

  // ANIMALS - YEAR-ROUND
  egg: { description: 'From chickens' },
  brown_egg: { description: 'From chickens' },
  white_egg: { description: 'From chickens' },
  milk: { description: 'From cows' },
  wool: { description: 'From sheep' },

  // COOKING - YEAR-ROUND
  cooking: { description: 'Various recipes year-round' },
  recipe: { description: 'Learn recipes year-round' },

  // CALENDAR - YEAR-ROUND
  calendar: { description: 'Festivals and social events year-round' },
  gift: { description: 'Gift giving possible all year' },

  // COMBAT - YEAR-ROUND
  combat: { description: 'Mines accessible all year' },
  dungeon: { description: 'Skull Cavern accessible all year' },
};

/**
 * Keyword-to-description mapping for tasks
 * If a task name contains these keywords, assign these descriptions
 */
const TASK_SEASON_PATTERNS: Record<string, { description?: string }> = {
  // Fishing patterns
  pufferfish: SEASONAL_AVAILABILITY['pufferfish'],
  walleye: SEASONAL_AVAILABILITY['walleye'],
  sunfish: SEASONAL_AVAILABILITY['sunfish'],
  catfish: SEASONAL_AVAILABILITY['catfish'],
  shad: SEASONAL_AVAILABILITY['shad'],
  sandfish: SEASONAL_AVAILABILITY['sandfish'],
  anchovy: SEASONAL_AVAILABILITY['anchovy'],
  mackerel: SEASONAL_AVAILABILITY['mackerel'],
  herring: SEASONAL_AVAILABILITY['herring'],
  halibut: SEASONAL_AVAILABILITY['halibut'],
  sardine: SEASONAL_AVAILABILITY['sardine'],
  salmon: SEASONAL_AVAILABILITY['salmon'],
  bass: { description: 'Largemouth or Smallmouth bass' },
  rainbow_trout: SEASONAL_AVAILABILITY['rainbow_trout'],
  lingcod: SEASONAL_AVAILABILITY['lingcod'],
  squid: SEASONAL_AVAILABILITY['squid'],
  tiger_trout: SEASONAL_AVAILABILITY['tiger_trout'],
  snapper: SEASONAL_AVAILABILITY['red_snapper'],
  carp: SEASONAL_AVAILABILITY['carp'],
  eel: SEASONAL_AVAILABILITY['eel'],
  tuna: SEASONAL_AVAILABILITY['tuna'],
  lobster: SEASONAL_AVAILABILITY['lobster'],
  crayfish: SEASONAL_AVAILABILITY['crayfish'],
  crab: SEASONAL_AVAILABILITY['crab'],
  oyster: SEASONAL_AVAILABILITY['oyster'],
  clam: SEASONAL_AVAILABILITY['clam'],

  // Foraging patterns - Spring
  'spring foraging': { description: 'Spring foraged items' },
  'spring mushroom': { description: 'Spring mushroom' },
  daffodil: SEASONAL_AVAILABILITY['daffodil'],
  dandelion: SEASONAL_AVAILABILITY['dandelion'],
  leek: SEASONAL_AVAILABILITY['leek'],

  // Foraging patterns - Summer
  'summer foraging': { description: 'Summer foraged items' },
  'summer berry': { description: 'Summer berries' },
  'summer flower': { description: 'Summer flowers' },

  // Foraging patterns - Fall
  'fall foraging': { description: 'Fall foraged items' },
  'fall mushroom': { description: 'Fall mushrooms' },
  hazelnut: SEASONAL_AVAILABILITY['hazelnut'],

  // Foraging patterns - Winter
  'winter foraging': { description: 'Winter foraged items' },
  'winter seed': SEASONAL_AVAILABILITY['winter_seed'],
  'snow yam': SEASONAL_AVAILABILITY['snow_yam'],

  // Farming - Spring
  'spring seed': SEASONAL_AVAILABILITY['spring_seed'],
  cauliflower: SEASONAL_AVAILABILITY['cauliflower'],
  potato: SEASONAL_AVAILABILITY['potato'],
  parsnip: SEASONAL_AVAILABILITY['parsnip'],

  // Farming - Summer
  'summer seed': SEASONAL_AVAILABILITY['summer_seed'],
  melon: SEASONAL_AVAILABILITY['melon'],
  wheat: SEASONAL_AVAILABILITY['wheat'],

  // Farming - Fall
  'fall seed': SEASONAL_AVAILABILITY['fall_seed'],
  pumpkin: SEASONAL_AVAILABILITY['pumpkin'],
  cranberry: SEASONAL_AVAILABILITY['cranberry'],
  garlic: SEASONAL_AVAILABILITY['garlic'],
  yam: SEASONAL_AVAILABILITY['yam'],

  // Farming - Year-round
  'ancient fruit': SEASONAL_AVAILABILITY['ancient_fruit'],
  starfruit: SEASONAL_AVAILABILITY['starfruit'],
  'sweet potato': SEASONAL_AVAILABILITY['sweet_potato'],

  // Mining - Year-round
  'copper ore': SEASONAL_AVAILABILITY['copper_ore'],
  'iron ore': SEASONAL_AVAILABILITY['iron_ore'],
  'gold ore': SEASONAL_AVAILABILITY['gold_ore'],
  'iridium ore': SEASONAL_AVAILABILITY['iridium_ore'],
  quartz: SEASONAL_AVAILABILITY['quartz'],
  coal: SEASONAL_AVAILABILITY['coal'],
  diamond: SEASONAL_AVAILABILITY['diamond'],
  ruby: SEASONAL_AVAILABILITY['ruby'],
  emerald: SEASONAL_AVAILABILITY['emerald'],
  topaz: SEASONAL_AVAILABILITY['topaz'],
  jade: SEASONAL_AVAILABILITY['jade'],
  amethyst: SEASONAL_AVAILABILITY['amethyst'],

  // Animals - Year-round
  egg: SEASONAL_AVAILABILITY['egg'],
  milk: SEASONAL_AVAILABILITY['milk'],
  wool: SEASONAL_AVAILABILITY['wool'],

  // Cooking - Year-round
  cook: { description: 'Cooking recipes available year-round' },
  recipe: { description: 'Learn recipes' },

  // Socializing - Year-round
  calendar: SEASONAL_AVAILABILITY['calendar'],
  gift: SEASONAL_AVAILABILITY['gift'],
  friendship: { description: 'Increase friendship year-round' },

  // Combat - Year-round
  combat: SEASONAL_AVAILABILITY['combat'],
  dungeon: SEASONAL_AVAILABILITY['dungeon'],
};

async function main() {
  console.log('Starting task description seeding...');

  const tasks = await prisma.task.findMany();

  if (tasks.length === 0) {
    console.log('No tasks found in database.');
    process.exit(0);
  }

  let updated = 0;

  for (const task of tasks) {
    // If task already has a description, skip
    if (task.description) {
      continue;
    }

    const taskNameLower = task.name.toLowerCase();
    let assignedDescription: string | undefined;

    // Find matching description based on task name patterns
    for (const [pattern, data] of Object.entries(TASK_SEASON_PATTERNS)) {
      if (taskNameLower.includes(pattern.toLowerCase())) {
        assignedDescription = data.description;
        break;
      }
    }

    if (assignedDescription) {
      await prisma.task.update({
        where: { id: task.id },
        data: { description: assignedDescription },
      });

      console.log(`Updated task "${task.name}" → ${assignedDescription}`);
      updated++;
    }
  }

  console.log(`\nDone! Updated ${updated} tasks with descriptions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
