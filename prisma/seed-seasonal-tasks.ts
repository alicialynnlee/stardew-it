import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seasonal availability mappings for Stardew Valley tasks
 * Each task is classified by which seasons it's available
 */
const SEASONAL_AVAILABILITY: Record<string, { seasons: string; seasonNote?: string }> = {
  // SPRING FISHING
  pufferfish: { seasons: 'summer,winter', seasonNote: 'Ocean, 12pm-4pm summer; any time winter' },
  walleye: { seasons: 'fall,winter', seasonNote: 'Freshwater, rainy days' },
  sunfish: { seasons: 'spring,summer', seasonNote: 'Ocean, 6am-11am' },
  catfish: { seasons: 'spring,summer,fall', seasonNote: 'Freshwater, rainy days' },
  shad: { seasons: 'spring,summer,fall', seasonNote: 'Ocean, rainy days' },
  sandfish: { seasons: 'summer,fall', seasonNote: 'Desert, any time' },
  anchovy: { seasons: 'spring,fall', seasonNote: 'Ocean' },
  mackerel: { seasons: 'fall,winter', seasonNote: 'Ocean' },
  herring: { seasons: 'winter', seasonNote: 'Ocean' },
  halibut: { seasons: 'spring,winter', seasonNote: 'Ocean' },
  sardine: { seasons: 'spring,summer,fall,winter', seasonNote: 'Ocean, 6am-7pm' },
  salmon: { seasons: 'fall', seasonNote: 'Freshwater' },
  largemouth_bass: { seasons: 'spring,summer,fall', seasonNote: 'Freshwater' },
  smallmouth_bass: { seasons: 'spring,fall', seasonNote: 'Freshwater' },
  rainbow_trout: { seasons: 'summer', seasonNote: 'Freshwater' },
  lingcod: { seasons: 'winter', seasonNote: 'Freshwater' },
  squid: { seasons: 'summer,winter', seasonNote: 'Ocean, 6pm-2am' },
  tiger_trout: { seasons: 'fall,winter', seasonNote: 'Freshwater' },
  red_snapper: { seasons: 'summer,fall', seasonNote: 'Ocean, 12pm-4pm' },
  carp: { seasons: 'spring,summer,fall,winter', seasonNote: 'Freshwater' },
  eel: { seasons: 'spring,fall', seasonNote: 'Freshwater, rainy days' },
  tuna: { seasons: 'summer,winter', seasonNote: 'Ocean' },
  lobster: { seasons: 'summer,fall', seasonNote: 'Ocean' },
  crayfish: { seasons: 'spring,fall', seasonNote: 'Freshwater, rainy days' },
  crab: { seasons: 'summer,fall', seasonNote: 'Ocean' },
  oyster: { seasons: 'winter', seasonNote: 'Ocean' },
  clam: { seasons: 'spring,fall', seasonNote: 'Ocean' },
  
  // SPRING FORAGING
  spring_foraging: { seasons: 'spring', seasonNote: 'Spring mushrooms, parsnips, spring seeds' },
  daffodil: { seasons: 'spring', seasonNote: 'Spring flower' },
  dandelion: { seasons: 'spring', seasonNote: 'Spring flower' },
  leek: { seasons: 'spring', seasonNote: 'Spring forage' },
  parsnip: { seasons: 'spring', seasonNote: 'Spring seed crop' },
  
  // SUMMER FORAGING
  summer_foraging: { seasons: 'summer', seasonNote: 'Summer berries, flowers, seeds' },
  summer_spangle: { seasons: 'summer', seasonNote: 'Summer flower' },
  pink_cake: { seasons: 'summer', seasonNote: 'Item requires multiple summer ingredients' },
  
  // FALL FORAGING
  fall_foraging: { seasons: 'fall', seasonNote: 'Fall mushrooms, seeds, hazelnuts' },
  fall_seeds: { seasons: 'fall', seasonNote: 'Fall seed crops' },
  hazelnut: { seasons: 'fall', seasonNote: 'Fall forage' },
  common_mushroom: { seasons: 'fall', seasonNote: 'Fall mushroom' },
  chanterelle: { seasons: 'fall', seasonNote: 'Fall mushroom' },
  purple_mushroom: { seasons: 'fall', seasonNote: 'Fall mushroom' },
  
  // WINTER FORAGING
  winter_foraging: { seasons: 'winter', seasonNote: 'Winter seeds, snow yam, winter roots' },
  winter_seed: { seasons: 'winter', seasonNote: 'Winter seed crops' },
  snow_yam: { seasons: 'winter', seasonNote: 'Winter forage' },
  winter_root: { seasons: 'winter', seasonNote: 'Winter forage' },
  crystal_fruit: { seasons: 'winter', seasonNote: 'Winter forage' },
  
  // FARMING - SPRING
  spring_seed: { seasons: 'spring', seasonNote: 'Spring seed crops' },
  cauliflower: { seasons: 'spring', seasonNote: 'Spring crop' },
  potato: { seasons: 'spring', seasonNote: 'Spring crop' },
  
  // FARMING - SUMMER
  summer_seed: { seasons: 'summer', seasonNote: 'Summer seed crops' },
  melon: { seasons: 'summer', seasonNote: 'Summer crop' },
  wheat: { seasons: 'summer,fall', seasonNote: 'Summer-Fall crop' },
  
  // FARMING - FALL
  fall_seed: { seasons: 'fall', seasonNote: 'Fall seed crops' },
  pumpkin: { seasons: 'fall', seasonNote: 'Fall crop' },
  cranberry: { seasons: 'fall', seasonNote: 'Fall crop' },
  garlic: { seasons: 'fall', seasonNote: 'Fall crop' },
  yam: { seasons: 'fall', seasonNote: 'Fall crop' },
  
  // FARMING - YEAR-ROUND (via greenhouse)
  ancient_fruit: { seasons: 'year-round', seasonNote: 'Greenhouse crop' },
  starfruit: { seasons: 'summer', seasonNote: 'Summer crop or greenhouse' },
  sweet_potato: { seasons: 'fall', seasonNote: 'Fall crop or greenhouse' },
  
  // MINING - YEAR-ROUND (accessible in mines all seasons)
  copper_ore: { seasons: 'year-round', seasonNote: 'Mine level 1-40' },
  iron_ore: { seasons: 'year-round', seasonNote: 'Mine level 40+' },
  gold_ore: { seasons: 'year-round', seasonNote: 'Mine level 80+' },
  iridium_ore: { seasons: 'year-round', seasonNote: 'Skull Cavern' },
  quartz: { seasons: 'year-round', seasonNote: 'Mine' },
  stone: { seasons: 'year-round', seasonNote: 'Mine' },
  coal: { seasons: 'year-round', seasonNote: 'Mine' },
  diamond: { seasons: 'year-round', seasonNote: 'Mine level 80+' },
  ruby: { seasons: 'year-round', seasonNote: 'Mine level 40-80' },
  emerald: { seasons: 'year-round', seasonNote: 'Mine level 40-80' },
  topaz: { seasons: 'year-round', seasonNote: 'Mine level 40-80' },
  jade: { seasons: 'year-round', seasonNote: 'Mine level 40-80' },
  amethyst: { seasons: 'year-round', seasonNote: 'Mine level 1-40' },
  
  // ANIMALS - YEAR-ROUND
  egg: { seasons: 'year-round', seasonNote: 'From chickens' },
  brown_egg: { seasons: 'year-round', seasonNote: 'From chickens' },
  white_egg: { seasons: 'year-round', seasonNote: 'From chickens' },
  milk: { seasons: 'year-round', seasonNote: 'From cows' },
  wool: { seasons: 'year-round', seasonNote: 'From sheep' },
  
  // COOKING - YEAR-ROUND
  cooking: { seasons: 'year-round', seasonNote: 'Various recipes year-round' },
  recipe: { seasons: 'year-round', seasonNote: 'Learn recipes year-round' },
  
  // SOCIALIZING - YEAR-ROUND
  socializing: { seasons: 'year-round', seasonNote: 'All villagers available' },
  gift: { seasons: 'year-round', seasonNote: 'Gift giving possible all year' },
  
  // COMBAT - YEAR-ROUND
  combat: { seasons: 'year-round', seasonNote: 'Mines accessible all year' },
  dungeon: { seasons: 'year-round', seasonNote: 'Skull Cavern accessible all year' },
};

/**
 * Keyword-to-seasonal mapping for tasks
 * If a task name contains these keywords, assign these seasons
 */
const TASK_SEASON_PATTERNS: Record<string, { seasons: string; seasonNote?: string }> = {
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
  bass: { seasons: 'spring,summer,fall', seasonNote: 'Largemouth or Smallmouth bass' },
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
  'spring foraging': { seasons: 'spring', seasonNote: 'Spring foraged items' },
  'spring mushroom': { seasons: 'spring', seasonNote: 'Spring mushroom' },
  daffodil: SEASONAL_AVAILABILITY['daffodil'],
  dandelion: SEASONAL_AVAILABILITY['dandelion'],
  leek: SEASONAL_AVAILABILITY['leek'],
  
  // Foraging patterns - Summer
  'summer foraging': { seasons: 'summer', seasonNote: 'Summer foraged items' },
  'summer berry': { seasons: 'summer', seasonNote: 'Summer berries' },
  'summer flower': { seasons: 'summer', seasonNote: 'Summer flowers' },
  
  // Foraging patterns - Fall
  'fall foraging': { seasons: 'fall', seasonNote: 'Fall foraged items' },
  'fall mushroom': { seasons: 'fall', seasonNote: 'Fall mushrooms' },
  hazelnut: SEASONAL_AVAILABILITY['hazelnut'],
  
  // Foraging patterns - Winter
  'winter foraging': { seasons: 'winter', seasonNote: 'Winter foraged items' },
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
  cook: { seasons: 'year-round', seasonNote: 'Cooking recipes available year-round' },
  recipe: { seasons: 'year-round', seasonNote: 'Learn recipes' },
  
  // Socializing - Year-round
  socializing: SEASONAL_AVAILABILITY['socializing'],
  gift: SEASONAL_AVAILABILITY['gift'],
  friendship: { seasons: 'year-round', seasonNote: 'Increase friendship year-round' },
  
  // Combat - Year-round
  combat: SEASONAL_AVAILABILITY['combat'],
  dungeon: SEASONAL_AVAILABILITY['dungeon'],
};

async function main() {
  console.log('Starting seasonal task classification...');

  const tasks = await prisma.task.findMany();

  if (tasks.length === 0) {
    console.log('No tasks found in database.');
    process.exit(0);
  }

  let updated = 0;

  for (const task of tasks) {
    // If task already has seasons other than default, skip
    if (task.seasons && task.seasons !== 'year-round') {
      continue;
    }

    const taskNameLower = task.name.toLowerCase();
    let assignedSeasons = 'year-round';
    let assignedNote: string | undefined;

    // Find matching seasons based on task name patterns
    for (const [pattern, seasonData] of Object.entries(TASK_SEASON_PATTERNS)) {
      if (taskNameLower.includes(pattern.toLowerCase())) {
        assignedSeasons = seasonData.seasons;
        assignedNote = seasonData.seasonNote;
        break;
      }
    }

    // Update the task with seasonal data
    if (assignedSeasons !== task.seasons || assignedNote !== task.seasonNote) {
      await prisma.task.update({
        where: { id: task.id },
        data: {
          seasons: assignedSeasons,
          seasonNote: assignedNote,
        },
      });

      console.log(
        `Updated task "${task.name}" → seasons: ${assignedSeasons}${assignedNote ? ` (${assignedNote})` : ''}`
      );
      updated++;
    }
  }

  console.log(`\nDone! Updated ${updated} tasks with seasonal data.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
