import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed script for Year 1 Stardew Valley calendar events:
 * all 8 main festivals + 3 Night Market days.
 *
 * These are informational events (no task links) with type: 'calendar'.
 * Run with: npm run seed:festivals
 */

type EventSeed = {
  date: string;
  name: string;
  description: string;
  taskIds: string[];
};

const festivalEvents: EventSeed[] = [
  // ===== SPRING =====
  {
    date: 'Spring 13',
    name: 'Egg Festival',
    description:
      "Shops closed until 5pm. Gather in the town square from 9am–2pm. Participate in the Egg Hunt: find 9+ colored eggs before Abigail to win a Straw Hat. Festival shop sells seasonal decorative items.",
    taskIds: [],
  },
  {
    date: 'Spring 24',
    name: 'Flower Dance',
    description:
      "Shops closed until 5pm. Attend the dance in Cindersap Forest from 9am–2pm. Ask a villager with 4+ hearts to dance the day before. Festival shop sells the Tub o' Flowers recipe and seasonal decorations.",
    taskIds: [],
  },

  // ===== SUMMER =====
  {
    date: 'Summer 11',
    name: 'Luau',
    description:
      "Shops closed until 5pm. Join the potluck on the beach from 9am–2pm. Add one high-quality item to the communal soup — impresses the Governor and raises friendship with all villagers. Festival shop sells the Red Plate.",
    taskIds: [],
  },
  {
    date: 'Summer 28',
    name: 'Dance of the Moonlight Jellies',
    description:
      "Shops closed until 11:30pm. Stand on the beach at 10pm for an automated cutscene as magical jellies float downstream. No participation needed. Festival shop sells the Tropical Curry recipe.",
    taskIds: [],
  },

  // ===== FALL =====
  {
    date: 'Fall 16',
    name: 'Stardew Valley Fair',
    description:
      "Shops closed until 10pm. Visit the fairgrounds in the town square from 9am–3pm. Enter up to 9 items in the Grange Display (judged on quality and category variety) to earn star tokens. Highlights: Stardrop (2,000 tokens) and Rarecrow #6 at the shop.",
    taskIds: [],
  },
  {
    date: 'Fall 27',
    name: "Spirit's Eve",
    description:
      "Shops closed until 11:30pm. Navigate the haunted maze in the town square from 10pm–11:30pm to claim a Golden Pumpkin. Festival shop sells Jack-o'-Lantern, Rarecrow #7, and the Witch's Hat.",
    taskIds: [],
  },

  // ===== WINTER =====
  {
    date: 'Winter 8',
    name: 'Festival of Ice',
    description:
      "Shops closed until 5pm. Attend the ice fishing contest at the mountain lake from 9am–2pm. Catch the most fish by 2pm to win a Sailor's Cap. Festival shop sells winter decorations.",
    taskIds: [],
  },
  {
    date: 'Winter 15',
    name: 'Night Market (Day 1)',
    description:
      "Beach docks open 5pm–2am for three nights. Tonight: Magic Shop Boat sells rare items; Rarecrow #4 available. Submarine Fishing gives access to deep-sea fish (Blobfish, Sea Cucumber, Spook Fish). Sandy's Oasis unavailable while the market runs.",
    taskIds: [],
  },
  {
    date: 'Winter 16',
    name: 'Night Market (Day 2)',
    description:
      "Beach docks open 5pm–2am. Mermaid Show boat with a hidden shell puzzle. Mermaid Boots available for purchase. Submarine Fishing continues.",
    taskIds: [],
  },
  {
    date: 'Winter 17',
    name: 'Night Market (Day 3)',
    description:
      "Beach docks open 5pm–2am. Final night — last chance for all Night Market exclusive items. Submarine Fishing last day.",
    taskIds: [],
  },
  {
    date: 'Winter 25',
    name: 'Feast of the Winter Star',
    description:
      "Shops closed until 5pm. Attend the feast in the town square from 9am–2pm. Check your mail on Winter 18 for your secret gift assignment — bring a loved or liked gift for the best relationship boost. You will also receive a gift. Festival shop sells festive decorations.",
    taskIds: [],
  },
];

async function main() {
  console.log('Starting festival events seed...');

  let created = 0;
  let skipped = 0;

  for (const event of festivalEvents) {
    // Idempotency check: skip if date + name already exists
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
        type: 'calendar',
        tasks: {
          connect: event.taskIds.map((id) => ({ id })),
        },
      },
    });

    console.log(`  Created: ${event.date} - ${event.name}`);
    created++;
  }

  console.log(
    `\nDone! Created ${created} festival events, skipped ${skipped} (already existed).`
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
