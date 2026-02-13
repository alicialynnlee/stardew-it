import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed script to populate remaining calendar events for Year 1 Community Center completion.
 *
 * Covers all tasks that previously had no calendar events:
 * - Fish Tank: River Fish, Lake Fish, Ocean Fish, Night Fishing, Specialty Fish, Crab Pot
 * - Boiler Room: Blacksmith's, Geologist's, Adventurer's
 * - Crafts Room: Construction, remaining Exotic Foraging
 * - Bulletin Board: Fiddlehead Fern, Sea Urchin, Aquamarine, Chub, Frozen Geode, Hay,
 *                   Red Mushroom (Dye), Purple Mushroom (Field Research)
 */

type EventSeed = {
  date: string;
  name: string;
  description: string;
  taskIds: string[];
};

const newEvents: EventSeed[] = [
  // ===== SPRING (seasonal) =====
  {
    date: 'Spring',
    name: 'Gather Resources',
    description:
      "Chop trees and break rocks to collect Wood (198) and Stone (99). Upgrade to a Steel Axe at Clint's to access the Secret Woods for Hardwood (10).",
    taskIds: [
      'cm9g5le3s000b9kykw5738zzl', // Wood (99)
      'cm9g5le3s000c9kykum3d62zz', // Wood (99)
      'cm9g5le3s000d9kykdtsbvs08', // Stone (99)
      'cm9g5le3t000e9kyk9phv2ivr', // Hardwood (10)
    ],
  },
  {
    date: 'Spring',
    name: 'Mine',
    description:
      'Progress through the Mines (floors 1-120). Smelt ores into bars at a Furnace. Collect gems and combat drops for the Boiler Room. Floors 1-39: Copper Ore, Earth Crystal. Floors 40-79: Iron Ore, Frozen Tear, Frozen Geode. Floors 80-120: Gold Ore, Fire Quartz, Solar Essence, Void Essence. Pick up Quartz and Cave Carrot throughout.',
    taskIds: [
      // Blacksmith's Bundle
      'cmakqv9of001k9kuhga863qn9', // Copper Bar
      'cmakqv9of001l9kuhnn1gck0w', // Iron Bar
      'cmakqv9og001m9kuhh44uf1j5', // Gold Bar
      // Geologist's Bundle
      'cmakqvxt6001n9kuhxqhyy6eg', // Quartz
      'cmakqvxt7001o9kuh2awpz221', // Earth Crystal
      'cmakqvxt7001p9kuhjw06lwc3', // Frozen Tear
      'cmakqvxt7001q9kuhga98dzfz', // Fire Quartz
      // Adventurer's Bundle
      'cmakqx54q001r9kuhehjfnuek', // Slime (99)
      'cmakqx54q001s9kuhs2dza3p0', // Bat Wing (10)
      'cmakqx54q001t9kuhtkpslo7h', // Solar Essence
      'cmakqx54r001u9kuhcozh46ng', // Void Essence
      // Exotic Foraging
      'cm9g5ncux000i9kykdb57yat3', // Cave Carrot
      // Bulletin Board
      'cmaysj9zj000l9ky46fp0z27i', // Frozen Geode (Field Research)
      'cmaysgfvd000e9ky49jsh3nbt', // Aquamarine (Dye)
    ],
  },
  {
    date: 'Spring',
    name: 'River Fish',
    description:
      'Catch river fish for the River Fish Bundle. Catfish: rain only, 6am-12am. Shad: 9am-2am. Sunfish: 6am-7pm. Also catch Chub (anytime) for the Field Research Bundle.',
    taskIds: [
      'cmakqguzc000b9kuhotbvo19a', // Sunfish
      'cmakqguzc000c9kuhuk97affr', // Catfish
      'cmakqguzc000d9kuhdiebdzko', // Shad
      'cmaysj9zj000k9ky41kpc7nh0', // Chub (Field Research)
    ],
  },
  {
    date: 'Spring',
    name: 'Ocean Fish',
    description:
      'Catch ocean fish. Sardine: 6am-7pm. Eel: rain only, 4pm-2am (also available in Fall).',
    taskIds: [
      'cmakqmog0000v9kuhadvxo5uk', // Sardine
      'cmakqo4kf00119kuhubs7vi2l', // Eel
    ],
  },
  {
    date: 'Spring',
    name: 'Lake Fish',
    description:
      'Catch fish in the mountain lake. Largemouth Bass: 6am-7pm. Carp: anytime. Bullhead: anytime.',
    taskIds: [
      'cmakqke01000f9kuh1feu5arq', // Largemouth Bass
      'cmakqke01000g9kuhqhmg005h', // Carp
      'cmakqke01000h9kuhjp84bnzw', // Bullhead
    ],
  },
  {
    date: 'Spring',
    name: 'Night Fish',
    description: 'Catch Bream in the river between 6pm-2am.',
    taskIds: [
      'cmakqo4kf00109kuhcavxe0sh', // Bream
    ],
  },
  {
    date: 'Spring',
    name: 'Crab Pots',
    description:
      'Place crab pots in the ocean and fresh water. Buy from Willy (1,500g each) or craft at Fishing Level 3. Check and rebait daily. Ocean: Lobster, Crab, Cockle, Mussel, Shrimp, Oyster, Clam. Fresh water: Crayfish, Snail, Periwinkle.',
    taskIds: [
      'cmakqrpk900129kuhfb9xtood', // Lobster
      'cmakqrpk900139kuhpg1bywu5', // Crayfish
      'cmakqrpk900149kuh9flh47c8', // Crab
      'cmakqrpka00159kuhlnmkkage', // Cockle
      'cmakqrpka00169kuhwruai5wu', // Mussel
      'cmakqrpka00179kuhnbuzanjy', // Shrimp
      'cmakqrpka00189kuhs62eqxjx', // Snail
      'cmakqrpka00199kuh89p54d9s', // Periwinkle
      'cmakqrpka001a9kuh0g69tzwp', // Oyster
      'cmakqrpka001b9kuharnlb3qf', // Clam
    ],
  },
  {
    date: 'Spring',
    name: 'Specialty Fish',
    description:
      'Catch Ghostfish in the Mines (levels 20-60, anytime). Catch Woodskip in the Secret Woods pond (requires Steel Axe to enter).',
    taskIds: [
      'cmakqsm5o001d9kuhxawprs75', // Ghostfish
      'cmakqsm5p001f9kuhs87s115z', // Woodskip
    ],
  },

  // ===== SUMMER (seasonal) =====
  {
    date: 'Summer',
    name: 'Ocean Fish',
    description:
      'IMPORTANT: Catch Pufferfish - only available in Summer (sunny weather, 12pm-4pm)! Also catch Tuna (6am-7pm), Red Snapper (rain only, 6am-7pm), and Tilapia (6am-2pm).',
    taskIds: [
      'cmakqsm5o001c9kuhknl4m55u', // Pufferfish
      'cmakqn2fx000w9kuh0wyfwftt', // Tuna
      'cmakqng86000x9kuh044pi606', // Red Snapper
      'cmakqnln9000y9kuhbq94dn12', // Tilapia
    ],
  },
  {
    date: 'Summer',
    name: 'Lake Fish',
    description:
      'Catch Sturgeon (6am-7pm) in the mountain lake. Also available in Winter.',
    taskIds: [
      'cmakqke02000i9kuh8ttixbyw', // Sturgeon
    ],
  },
  {
    date: 'Summer',
    name: 'Fiddlehead Fern',
    description:
      'Forage Fiddlehead Fern in the Secret Woods. Only available in Summer. Requires Steel Axe to enter.',
    taskIds: [
      'cmaysc1zp00039ky48qu7r00c', // Fiddlehead Fern (Chef's)
    ],
  },
  {
    date: 'Summer',
    name: 'Beach Forage',
    description:
      'Forage Sea Urchin on the beach in the tide pool area. Repair the bridge with 300 Wood if not yet done.',
    taskIds: [
      'cmaysgfvc000b9ky40udhq2xs', // Sea Urchin (Dye)
    ],
  },
  {
    date: 'Summer',
    name: 'Mushroom Cave',
    description:
      'If you chose the Mushroom Cave (from Demetrius), collect Red Mushroom, Purple Mushroom, and Morel. Check every 2 days. These count for the Exotic Foraging, Dye, and Field Research bundles.',
    taskIds: [
      'cm9g5ncux000j9kykfuf8tqpk', // Red Mushroom (Exotic Foraging)
      'cm9g5ofjb000o9kyktyna52m7', // Purple Mushroom (Exotic Foraging)
      'cm9g5ofja000k9kyk3gl5dsr6', // Morel (Exotic Foraging)
      'cmaysgfvc000a9ky4n1fbtox7', // Red Mushroom (Dye)
      'cmaysj9zi000i9ky4sxxuaecg', // Purple Mushroom (Field Research)
    ],
  },

  // ===== FALL (seasonal) =====
  {
    date: 'Fall',
    name: 'River Fish',
    description:
      'IMPORTANT: Catch Walleye - only available in Fall (rain only, 12pm-2am)! Also catch Tiger Trout (6am-7pm, also available in Winter).',
    taskIds: [
      'cmakqo4kf000z9kuheqjpbnn0', // Walleye
      'cmakqguzd000e9kuh0mdcmw6n', // Tiger Trout
    ],
  },
  {
    date: 'Fall',
    name: 'Buy Hay',
    description:
      "Buy Hay from Marnie's Ranch (50g each) or cut grass with a Scythe when you have a Silo built. Need 10 for the Fodder Bundle.",
    taskIds: [
      'cmayslvuy000o9ky4rx4ea53p', // Hay (10)
    ],
  },

  // ===== WINTER (seasonal) =====
  {
    date: 'Winter',
    name: 'Desert',
    description:
      'After completing the Vault bundles, ride the bus to Calico Desert. Forage Coconut (from palm trees) and Cactus Fruit (from cacti). Catch Sandfish (6am-8pm) in the desert pond.',
    taskIds: [
      'cm9g5ncuw000g9kykdekw7fyn', // Coconut
      'cm9g5ncux000h9kykkhdgmaon', // Cactus Fruit
      'cmakqsm5o001e9kuhwi32sczr', // Sandfish
    ],
  },
];

async function main() {
  console.log('Starting calendar seed...');

  // Verify task IDs exist before creating events
  const allTaskIds = newEvents.flatMap((e) => e.taskIds);
  const uniqueTaskIds = [...new Set(allTaskIds)];

  const existingTasks = await prisma.task.findMany({
    where: { id: { in: uniqueTaskIds } },
    select: { id: true, name: true },
  });

  const existingTaskIdSet = new Set(existingTasks.map((t) => t.id));
  const missingIds = uniqueTaskIds.filter((id) => !existingTaskIdSet.has(id));

  if (missingIds.length > 0) {
    console.error(
      'ERROR: The following task IDs do not exist in the database:'
    );
    missingIds.forEach((id) => console.error(`  - ${id}`));
    console.error('Aborting seed. Please verify task IDs match your database.');
    process.exit(1);
  }

  console.log(`Verified ${uniqueTaskIds.length} task IDs exist.`);

  let created = 0;
  let skipped = 0;

  for (const event of newEvents) {
    // Check if an event with same date + name already exists (idempotency)
    const existing = await prisma.calendarEvent.findFirst({
      where: { date: event.date, name: event.name },
    });

    if (existing) {
      console.log(`  Skipped (already exists): ${event.date} - ${event.name}`);
      skipped++;
      continue;
    }

    await prisma.calendarEvent.create({
      data: {
        date: event.date,
        name: event.name,
        description: event.description,
        tasks: {
          connect: event.taskIds.map((id) => ({ id })),
        },
      },
    });

    console.log(
      `  Created: ${event.date} - ${event.name} (${event.taskIds.length} tasks)`
    );
    created++;
  }

  console.log(
    `\nDone! Created ${created} events, skipped ${skipped} (already existed).`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
