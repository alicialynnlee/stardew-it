import { Box, Flex, Text } from '@radix-ui/themes';

export default function ProgressBar({ width }: { width: number }) {
  return (
    <Flex direction="row" align="center" gap="2">
      <Box
        my="1"
        width="100%"
        height="8px"
        style={{
          backgroundColor: 'var(--gray-a3)',
          borderRadius: 'var(--radius-3)',
        }}
      >
        <Box
          width={width > 100 ? `100%` : `${width}%`}
          height="100%"
          style={{
            backgroundColor: 'var(--accent-9)',
            borderRadius: 'var(--radius-3)',
          }}
        />
      </Box>
      <Text wrap="nowrap">
        {width > 100 ? 'Completed!' : `Progress: ${width}%`}
      </Text>
    </Flex>
  );
}
