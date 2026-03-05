'use client';

import { Card } from '@/components';
import { Box, Flex, Text, Heading } from '@radix-ui/themes';
import { mainDarkText, pumpkinCream, pumpkinRust } from '@/styles/colors';

// Tips for the dashboard
const TIPS = [
  {
    title: 'Choose the fruit bat cave.',
    description:
      'It drops forageable fruits you need for bundles — the mushroom cave is tempting but harder to replace.',
  },
  {
    title: 'Check the Traveling Cart every Friday & Saturday.',
    description:
      'She stocks rare items like Red Cabbage seeds that can save your Year 1 run.',
  },
  {
    title: 'Pick the Year 1 Completable option for Red Cabbage.',
    description:
      'In the remixed bundles setting, this guarantees Red Cabbage is obtainable without relying on luck.',
  },
  {
    title: 'Save one of everything.',
    description:
      'Fish, crops, foraged items — if it looks unique, stash it in a chest. Future-you will be grateful.',
  },
  {
    title: 'Plan your rainy days.',
    description:
      'Rain means free watering, so use those days to mine, fish, or forage instead. Every energy point counts in Year 1.',
  },
];

export default function TipsSection() {
  return (
    <section id="tips">
      <Card>
        <Flex direction="row" gap="1" align="center" mb="4">
          <Heading weight="bold" size="3" style={{ color: mainDarkText }}>
            Year 1 Survival Tips
          </Heading>
        </Flex>
        <Flex direction="column" gap="4">
          {TIPS.map((tip, idx) => (
            <Flex direction="row" gap="2" align="center" key={idx}>
              <Box
                m="2"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: pumpkinCream,
                  flexShrink: '0',
                  height: '18px',
                  width: '18px',
                }}
              >
                <Text weight="bold" size="1" style={{ color: pumpkinRust }}>
                  {idx}
                </Text>
              </Box>
              <Text size="1" style={{ color: mainDarkText }}>
                <strong>{tip.title}</strong>
                <br /> {tip.description}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Card>
    </section>
  );
}
