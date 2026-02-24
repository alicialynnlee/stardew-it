import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * CalendarEvent type classification based on event name.
 * Maps event names to one of: farming, foraging, fishing, mining, other
 *
 * Idempotent: skips events that already have a non-"other" type.
 */
function classifyEvent(name: string): string {
  const lower = name.toLowerCase();

  // Farming: planting crops and fruit trees
  if (lower.startsWith('plant')) return 'farming';

  // Foraging
  if (
    lower === 'forage' ||
    lower === 'spring forage' ||
    lower === 'beach forage' ||
    lower === 'fiddlehead fern' ||
    lower === 'mushroom cave' ||
    lower === 'gather resources' ||
    lower === 'last day: spring forage'
  )
    return 'foraging';

  // Fishing
  if (
    lower.includes('fish') || // River Fish, Lake Fish, Ocean Fish, Night Fish, Winter Fish, Specialty Fish, Sandfish, Last Day: Rain Fish
    lower === 'crab pots'
  )
    return 'fishing';

  // Mining
  if (lower === 'mine') return 'mining';

  // Everything else: Build/Upgrade/Buy/Tap/Bee House/Make/Purchase/Desert/etc.
  return 'other';
}

async function main() {
  console.log('Starting calendar event type seeding...\n');

  const events = await prisma.calendarEvent.findMany({
    orderBy: { date: 'asc' },
  });

  if (events.length === 0) {
    console.log('No calendar events found in database.');
    process.exit(0);
  }

  let updated = 0;
  let skipped = 0;

  for (const event of events) {
    // Skip if already has a type other than 'other'
    if (event.type && event.type !== 'other') {
      skipped++;
      continue;
    }

    const newType = classifyEvent(event.name);

    if (newType !== event.type) {
      await prisma.calendarEvent.update({
        where: { id: event.id },
        data: { type: newType },
      });
      console.log(
        `  ${event.date.padEnd(12)} ${event.name.padEnd(30)} → ${newType}`
      );
      updated++;
    }
  }

  console.log(
    `\nDone! Updated ${updated} events, skipped ${skipped} (already classified).`
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
