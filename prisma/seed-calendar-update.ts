import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed script to reconcile calendar events with the master dependency chart.
 *
 * Changes:
 * 1. Fixes fruit tree planting dates (Summer 24/27 → Summer 1)
 * 2. Fixes barn building chain dates (Fall 5→3, Fall 8→7, Fall 13→14)
 * 3. Fixes coop chain dates to hard deadlines (Summer 24→Fall 12, Summer 27→Fall 15, Fall 1→Fall 18)
 * 4. Fixes rabbit purchase date (Fall 3→Fall 20)
 * 5. Adds missing deadline events (Spring 28, Fall 28, Winter 28)
 * 6. Adds missing seasonal events (Fall Sandfish, Winter Fish)
 */

type EventUpdate = {
  id: string;
  newDate: string;
  newName?: string;
  newDescription?: string;
  reason: string;
};

type EventSeed = {
  date: string;
  name: string;
  description: string;
  taskIds: string[];
};

const eventUpdates: EventUpdate[] = [
  {
    id: 'cmayvt13300149ky4n3ch6xg0',
    newDate: 'Summer 1',
    newName: 'Plant Apple Tree',
    newDescription:
      'LAST DAY to plant Apple tree. Fruit trees take 28 days to mature. Plant by Summer 1 for Fall 1 harvest.',
    reason:
      'Apple tree needs 28 days. Summer 24 would not mature until Fall 24.',
  },
  {
    id: 'cmayvvw9t00159ky4khzrb1qy',
    newDate: 'Summer 1',
    newName: 'Plant Pomegranate Tree',
    newDescription:
      'LAST DAY to plant Pomegranate tree. Fruit trees take 28 days to mature. Plant by Summer 1 for Fall 1 harvest.',
    reason:
      'Pomegranate tree needs 28 days. Summer 27 would mature Fall 27, too late.',
  },
  {
    id: 'cmayr5uu6002m9kuh6vw38axu',
    newDate: 'Fall 3',
    newDescription:
      'LAST DAY to start building Barn. Takes 3 days (done Fall 6), then Big Barn upgrade can start Fall 7.',
    reason: 'Hard deadline for Barn → Big Barn → Deluxe Barn → Pig chain.',
  },
  {
    id: 'cmayr5uu5002k9kuh2uzy06oj',
    newDate: 'Fall 7',
    newDescription:
      'LAST DAY to start Big Barn upgrade. Takes 3 days (done Fall 10). Deluxe Barn can then start Fall 11.',
    reason: 'Hard deadline: Fall 8 would push Deluxe Barn start to Fall 12.',
  },
  {
    id: 'cmayr5uu5002j9kuhy0bm2opk',
    newDate: 'Fall 14',
    newDescription:
      "LAST DAY to buy Pig. Pig needs 10 days to mature, then outdoor dry days to find truffles before Winter. Marnie's is closed Mon/Tue.",
    reason: 'Hard deadline: Fall 14 (Sunday) is the last safe purchase day.',
  },
  // Coop chain: move from safely-early dates to hard deadlines
  {
    id: 'cmayvcpp800109ky4i4nxiuze',
    newDate: 'Fall 12',
    newDescription:
      'LAST DAY to start building Coop. Takes 3 days (done Fall 15), then Big Coop upgrade can start Fall 15.',
    reason:
      'Hard deadline: Fall 12 → done Fall 15 → Big Coop Fall 15 → done Fall 18 → Deluxe Coop Fall 18 → done Fall 21 → Rabbit by Fall 20.',
  },
  {
    id: 'cmayvcpp8000y9ky4rwbnzsa0',
    newDate: 'Fall 15',
    newDescription:
      'LAST DAY to start Big Coop upgrade. Takes 3 days (done Fall 18). Deluxe Coop can then start Fall 18.',
    reason: 'Hard deadline for Coop → Big Coop → Deluxe Coop → Rabbit chain.',
  },
  {
    id: 'cmayvcpp8000w9ky4njgmjwsc',
    newDate: 'Fall 18',
    newDescription:
      'LAST DAY to start Deluxe Coop upgrade. Takes 3 days (done Fall 21). Rabbit can then be purchased.',
    reason: 'Hard deadline: Deluxe Coop must finish before buying Rabbit.',
  },
  {
    id: 'cmayvcpp8000x9ky44pj7ejtq',
    newDate: 'Fall 20',
    newDescription:
      "LAST DAY to buy Rabbit. Needs 6 days to mature, then random drop cycles for Rabbit's Foot before Winter 28. Marnie's is closed Mon/Tue.",
    reason:
      "Hard deadline: Fall 20 gives enough time for Rabbit's Foot production.",
  },
];

const newEvents: EventSeed[] = [
  {
    date: 'Spring 28',
    name: 'Last Day: Spring Forage',
    description:
      'Final day to collect Spring forage items. Wild Horseradish, Daffodil, Leek, and Dandelion do not spawn after Spring.',
    taskIds: [
      'cm9g55fa600029konodfj3ctq', // Wild Horseradish
      'cm9g56fcg00039konirosgoev', // Daffodil
      'cm9g56s2200049konjda4bxsy', // Leek
      'cm9g58ik300059konqiz48mg4', // Dandelion
    ],
  },
  {
    date: 'Fall',
    name: 'Sandfish (Desert)',
    description:
      'If the Vault/bus is repaired, catch Sandfish in the desert pond (6am-8pm). Can also be caught in Summer.',
    taskIds: [
      'cmakqsm5o001e9kuhwi32sczr', // Sandfish
    ],
  },
  {
    date: 'Fall 28',
    name: 'Last Day: Rain Fish',
    description:
      'Final fallback for rain-dependent fish. Walleye (Fall only, rain, 12pm-2am), Catfish (rain, 6am-12am), Eel (rain, 4pm-2am). Use a Rain Totem if needed.',
    taskIds: [
      'cmakqo4kf000z9kuheqjpbnn0', // Walleye
      'cmakqguzc000c9kuhuk97affr', // Catfish
      'cmakqo4kf00119kuhubs7vi2l', // Eel
    ],
  },
  {
    date: 'Winter',
    name: 'Winter Fish',
    description:
      'Catch remaining fish available in Winter. Tiger Trout (river, 6am-7pm). Sturgeon (mountain lake, 6am-7pm). Sardine (ocean, 6am-7pm).',
    taskIds: [
      'cmakqguzd000e9kuh0mdcmw6n', // Tiger Trout
      'cmakqke02000i9kuh8ttixbyw', // Sturgeon
      'cmakqmog0000v9kuhadvxo5uk', // Sardine
    ],
  },
  {
    date: 'Winter 28',
    name: 'Last Day: Year 1 Completion',
    description:
      "Final day to turn in all Community Center bundles for Year 1 completion. Verify: Nautilus Shell foraged, Tiger Trout caught, Rabbit's Foot obtained, all Vault payments made.",
    taskIds: [
      'cmaysj9zi000j9ky4hon2qdlp', // Nautilus Shell
      'cmakqguzd000e9kuh0mdcmw6n', // Tiger Trout
      'cmayso3e7000u9ky4i3ordx3v', // Rabbit's Foot
      'cmayx4jz4001j9ky43aok9ehj', // 2,500
      'cmayx4jz4001k9ky4zwq4vtjy', // 5,000
      'cmayx4jz5001l9ky41nsjag1v', // 10,000
      'cmayx4jz5001m9ky4okcay0of', // 25,000
    ],
  },
];

async function main() {
  console.log('Starting calendar event reconciliation...\n');

  // Phase 1: Validate all task IDs
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
    console.error('Aborting. Please verify task IDs match your database.');
    process.exit(1);
  }

  console.log(`Verified ${uniqueTaskIds.length} task IDs exist.\n`);

  // Phase 2: Update existing calendar events
  console.log('--- Updating existing events ---');
  let updated = 0;
  let skippedUpdates = 0;

  for (const update of eventUpdates) {
    const existing = await prisma.calendarEvent.findUnique({
      where: { id: update.id },
    });

    if (!existing) {
      console.warn(`  WARNING: Event ${update.id} not found, skipping.`);
      skippedUpdates++;
      continue;
    }

    if (
      existing.date === update.newDate &&
      (!update.newName || existing.name === update.newName)
    ) {
      console.log(
        `  Skipped (already correct): ${existing.date} - ${existing.name}`
      );
      skippedUpdates++;
      continue;
    }

    await prisma.calendarEvent.update({
      where: { id: update.id },
      data: {
        date: update.newDate,
        ...(update.newName ? { name: update.newName } : {}),
        ...(update.newDescription ? { description: update.newDescription } : {}),
      },
    });

    console.log(
      `  Updated: "${existing.date} - ${existing.name}" → "${update.newDate} - ${update.newName || existing.name}" (${update.reason})`
    );
    updated++;
  }

  console.log(`\nUpdated ${updated}, skipped ${skippedUpdates}.\n`);

  // Phase 3: Create new calendar events
  console.log('--- Creating new events ---');
  let created = 0;
  let skippedCreates = 0;

  for (const event of newEvents) {
    const existing = await prisma.calendarEvent.findFirst({
      where: { date: event.date, name: event.name },
    });

    if (existing) {
      console.log(`  Skipped (already exists): ${event.date} - ${event.name}`);
      skippedCreates++;
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

  console.log(`\nCreated ${created}, skipped ${skippedCreates}.\n`);
  console.log('Reconciliation complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
