'use client';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Box, Callout } from '@radix-ui/themes';

export default function WarningBanner({
  content,
}: {
  content: React.ReactNode;
}) {
  return (
    <Box py="3">
      <Callout.Root color="orange">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>{content}</Callout.Text>
      </Callout.Root>
    </Box>
  );
}
